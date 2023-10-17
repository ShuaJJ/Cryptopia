import WithUserConnect from "@/components/user/WithUserConnect";
import WhiteBox from '@/components/layout/WhiteBox'
import PostButton from '@/components/button/PostButton'
import { AccessTokenProps } from "@/utils/types";

export default function Home() {

  const accessTokens: AccessTokenProps = {
    web3StorageAccessToken: process.env.WEB3_STORAGE ?? ''
  }

  return (
    <WithUserConnect>
      <div className="min-h-screen max-w-screen-xl relative mx-auto grid grid-cols-[1fr_2fr_1fr] pt-24">
            <div>
              <WhiteBox>AAA</WhiteBox>
              <WhiteBox>BBB</WhiteBox>
              <WhiteBox>CCC</WhiteBox>
            </div>
            <div>Hello</div>
            <div>
              <WhiteBox>
                <PostButton { ...accessTokens } />
              </WhiteBox>
            </div>
        </div>
    </WithUserConnect>
  )
}
