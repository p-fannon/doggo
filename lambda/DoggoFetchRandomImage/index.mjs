import fetch from 'node-fetch';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { randomUUID } from 'node:crypto';
import { fileTypeFromBuffer } from 'file-type';
import credentials from "./credentials.json" with { type: "json" };

const client = new S3Client({
    region: 'us-east-1',
    credentials: credentials
});

const getBreedName = (message) => {
    let breed = '';
    const imageUrlSplit = message.split('/');
    if (imageUrlSplit.length > 5) {
        if (imageUrlSplit[4] == 'mix') {
            breed = 'Mix';
        } else {
            const breedCandidate = imageUrlSplit[4];
            const breedCandidateSplit = breedCandidate.split('-');
            if (breedCandidateSplit.length == 1) {
                breed = `${breedCandidateSplit[0].charAt(0).toUpperCase()}${breedCandidateSplit[0].substring(1, breedCandidateSplit[0].length)}`;
            } else {
                breed = breedCandidateSplit.map((input) => `${input.charAt(0).toUpperCase()}${input.substring(1, input.length)}`).reverse().join('-');
            }
        }
    } else {
        breed = 'Random Dog'
    }

    return breed;
}

export const handler = async (event) => {
    try {
        let lambdaResponse = {};
        let breed = '';
        const bucketName = event['queryStringParameters']['bucketName'];
        if (!bucketName) throw new Error(`event passed unexpected bucket name ${bucketName}`);
        const randomFilename = randomUUID().toString();

        await fetch('https://dog.ceo/api/breeds/image/random').then((res) => {
            if (!res.ok) throw new Error('Dog.CEO could not fetch URL for random dog image');

            return res.json();
        }).then(async (imageJson) => {
            const response = await fetch(imageJson.message);

            if (!response.ok) throw new Error(`Dog.CEO did not return JPEG file from URL ${imageJson.message} due to ${response.statusText}`);

            breed = getBreedName(imageJson.message);

            const dogBuffer = await response.arrayBuffer().then((buffer) => {
                const data = Buffer.from(buffer);
                return data;
            });
            const fileType = await fileTypeFromBuffer(dogBuffer);
            if (fileType.ext) {
                const imageKey = `${breed}/${randomFilename}.${fileType.ext}`;

                const params = {
                    Bucket: bucketName,
                    Key: imageKey,
                    Body: dogBuffer,
                    ContentType: response.headers['content-type'],
                    ContentLength: response.headers['content-length']
                };
    
                const command = new PutObjectCommand(params);
    
                await client.send(command);

                lambdaResponse = {
                    statusCode: 200,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': "*"
                    },
                    body: JSON.stringify({ breed, randomDogUrl: `https://${bucketName}.s3.amazonaws.com/${imageKey}` }),
                    isBase64Encoded: false,
                };
            } else {
                throw new Error('Could not determine an appropriate file type')
            }
        });

        return lambdaResponse;
    } catch (error) {
        console.error('Error fetching image:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error'}),
        };
    }
}