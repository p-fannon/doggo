import axios, { AxiosInstance } from "axios";

const client: AxiosInstance = axios.create({
    baseURL: `https://${process.env.NEXT_PUBLIC_API_GATEWAY_DOMAIN}/FetchRandomDog`,
    params: {
        bucketName: process.env.NEXT_PUBLIC_S3_BUCKET_NAME
    },
    headers: {
        'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`
    }
});

const useClient = (): AxiosInstance => client;

export default useClient;