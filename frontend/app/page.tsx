import WithUserConnect from "@/components/user/WithUserConnect";
import WhiteBox from '@/components/layout/WhiteBox'
import PostButton from '@/components/button/PostButton'
import { AccessTokenProps } from "@/utils/types";
import PostList from "@/components/post/PostList";
import GraphProvider from "@/components/GraphProvider";
import ChatList from "@/components/push/ChatList";
import FollowList from "@/components/user/FollowList";

export default function Home() {

  const accessTokens: AccessTokenProps = {
    web3StorageAccessToken: process.env.WEB3_STORAGE ?? ''
  }

  return (
    <WithUserConnect>
      <GraphProvider>
      <div className="min-h-screen max-w-screen-xl relative mx-auto grid grid-cols-[1fr_2fr_1fr] pt-24 gap-6">
            <div>
              <WhiteBox>
                <FollowList { ...accessTokens } />
              </WhiteBox>
            </div>
            <PostList { ...accessTokens } />
            <div>
              <WhiteBox>
                <PostButton { ...accessTokens } />
              </WhiteBox>
              <WhiteBox>
                <ChatList />
              </WhiteBox>
            </div>
        </div>
        </GraphProvider>
    </WithUserConnect>
  )
}
