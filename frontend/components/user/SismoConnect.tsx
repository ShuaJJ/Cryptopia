"use client";

import {
  SismoConnectButton,
  AuthType,
} from "@sismo-core/sismo-connect-react";

export default function SismoConnect({callback}: {callback: (response: string) => void}) {
  return (
    <SismoConnectButton
      config={{
        appId: "0x5dc7f3d6e3a6bd3ae49fcfc876ecf217", // replace with your appId
      }}
      auths={[{ authType: AuthType.GITHUB }]}
      claims={[
        // Starred repo 
        { groupId: "0xfd931046287010533fccee33b62514a4" }, 
      ]} 
      signature={{ message: "I starred the project repo" }}
      onResponseBytes={async (response: string) => {
        callback(response);
      }}
    />
  );
}