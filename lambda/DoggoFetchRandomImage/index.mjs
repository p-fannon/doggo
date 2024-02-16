import fetch from 'node-fetch';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { createWriteStream } from 'node:fs';
import { randomUUID } from 'node:crypto';

const client = new S3Client({});

const getBreedName = (message) => {
    let breed = '';
    const imageUrlSplit = message.split('/');
    if (imageUrlSplit.length > 5) {
        if (imageUrlSplit[4] == 'mix') {
            breed = imageUrlSplit[5].split('.')[0].concat(' (Mix)');
        } else {
            const breedCandidate = imageUrlSplit[4];
            const breedCandidateSplit = breedCandidate.split('-');
            if (breedCandidateSplit.length == 1) {
                breed = `${breedCandidateSplit[0].charAt(0).toUpperCase()}${breedCandidateSplit[0].substring(1, breedCandidateSplit[0].length)}`;
            } else {
                breed = breedCandidateSplit.map((input) => `${input.charAt(0).toUpperCase()}${input.substring(1, input.length)}`).join('-');
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
        const bucketName = event.bucketName;
        if (!bucketName) throw new Error(`event passed unexpected bucketname ${bucketName}`);
        const randomFilename = randomUUID().toString();

        await fetch('https://dog.ceo/api/breeds/image/random').then((res) => {
            if (!res.ok) throw new Error('Dog.CEO could not fetch URL for random dog image');

            return res.json();
        }).then(async (imageJson) => {
            const response = await fetch(imageJson.message);

            if (!response.ok) throw new Error(`Dog.CEO did not return JPEG file from URL ${imageJson.message} due to ${response.statusText}`);

            breed = getBreedName(imageJson.message);

            const file = createWriteStream(`${randomFilename}.jpg`);
            const dogBuffer = await response.arrayBuffer().then((buffer) => buffer);
            file.end(dogBuffer);

            const params = {
                Bucket: bucketName,
                Key: `${randomFilename}.jpg`,
                Body: file,
                ContentType: response.headers['content-type'],
                ContentLength: response.headers['content-length']
            };

            const command = new PutObjectCommand(params);

            const uploadPromise = await client.send(command);

            lambdaResponse = {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ breed, randomDogUrl: `${uploadPromise.Location}` }),
                isBase64Encoded: false,
            };
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