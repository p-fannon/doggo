import fetch from 'node-fetch';

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
        let responseUrl = '';
        await fetch('https://dog.ceo/api/breeds/image/random').then(async (res) => {
            if (res.status == 200) {
                return res.json();
            }  else {
                throw new Error('Dog.CEO could not fetch URL for random dog image');
            }
        }).then(async (dogJson) => {
            responseUrl = dogJson.message;
            return dogJson.message;
        }).then(async (imageUrl) => {
            await fetch(imageUrl).then(async (apiRes) => {
                if (apiRes.status == 200) {
                    breed = getBreedName(responseUrl);

                    await apiRes.arrayBuffer().then((buffer) => {
                        lambdaResponse = {
                            statusCode: 200,
                            headers: {
                                'Content-Type': 'image/jpeg'
                            },
                            body: buffer.toString('base64'),
                            isBase64Encoded: true,
                            breed,
                        };
                    });
                } else {
                    throw new Error(`Dog.CEO did not return JPEG file from URL ${imageUrl}`);
                }
            });
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