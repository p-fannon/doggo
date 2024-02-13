import fetch from 'node-fetch';

export const handler = async (event) => {
    try {
        const { message, status } = await fetch('https://dog.ceo/api/breeds/image/random');
        if (status == 'success') {
            const imageUrl = message;
            const response = await fetch(imageUrl);
            const imageBuffer = await response.arrayBuffer();
            const imageUrlSplit = imageUrl.split('/');
            let breed = '';
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
    
            const lambdaResponse = {
                statusCode: 200,
                headers: {
                    'Content-Type': 'image/jpeg'
                },
                body: imageBuffer.toString('base64'),
                isBase64Encoded: true,
                breed,
            };
    
            return lambdaResponse;
        } else {
            throw new Error('Dog.CEO could not fetch a random image');
        }
        
    } catch (error) {
        console.error('Error fetching image:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error'}),
        };
    }
}