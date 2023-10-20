import { gql, useQuery } from "@apollo/client";

export default function FollowList() {

    const GET_FOLLOWS = gql`
        query GetFollows {
            follows(first: 32, follow=) {
                follow
            }
        }
    `;

    const { loading, error, data } = useQuery(GET_FOLLOWS);
    const follows = data?.follows ?? []

    return (
        <div>
            
        </div>
    )
}