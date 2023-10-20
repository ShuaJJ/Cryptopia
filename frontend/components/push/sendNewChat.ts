import { Address, WalletClient } from "viem";
import { PushAPI, viemSignerType } from '@pushprotocol/restapi';
import { ENV } from "@pushprotocol/restapi/src/lib/constants";

export default async function sendNewChat(
    walletClient: WalletClient,
    recipient: Address,
    msg: string,
) {
    try {
        const me = await PushAPI.initialize(walletClient as viemSignerType, { env: ENV.STAGING });
        const msgObj = await me.chat.send(recipient, {
            content: msg
        });
        return msgObj;
    } catch(e) {
        console.log('Send msg error', e)
        return null;
    }
}