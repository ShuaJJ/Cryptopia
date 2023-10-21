import { Web3Storage } from 'web3.storage';
import { UserInfo } from './types';
import { ipfsDomain } from './constants';

export default async function getPostContent(web3Token: string, cid: string): Promise<UserInfo|null> {
    const client = new Web3Storage({ token:web3Token })
    const res = await client.get(cid);
    if (!res.ok) {
        return null;
    }
    const files = await res.files();
    try {
        const res = await fetch(`https://${cid}.${ipfsDomain}/${files[1].name}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        })
        const postContent = await res.json();
        return {
            ...postContent, 
            image: `https://${cid}.${ipfsDomain}/${files[0].name}`
        };
    } catch(e) {
        return null;
    }
}