/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        forceSwcTransforms: true
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: `${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.amazonaws.com`
            }
        ]
    }
};

export default nextConfig;
