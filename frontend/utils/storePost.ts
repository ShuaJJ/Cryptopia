import { Web3Storage } from 'web3.storage';

export const storePost = async (
    accessToken: string,
    files: File[],
) => {
    const client = new Web3Storage({ token: accessToken });
    const cid = await client.put(files)
    return cid
}