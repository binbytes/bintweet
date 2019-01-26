import gql from 'graphql-tag'

export const INSERT_POST = gql`
  mutation($userId: Int, $content: String) {
    insert_posts(objects: [{ user_id: $userId, content: $content }]) {
      affected_rows
    }
  }
`

export const GET_POST = gql`
  query($userIds: [Int], $limit: Int, $offset: Int) {
    posts(
      where: { user_id: { _in: $userIds } }
      order_by: [{ created: desc }]
      limit: $limit
      offset: $offset
    ) {
      id
      content
      user {
        name
        picture
      }
      like: likes_aggregate {
        total: aggregate {
          count
        }
        userIds: nodes {
          id: user_id
        }
      }
    }
  }
`

export const LIKE_POST = gql`
  mutation($postId: Int, $userId: Int) {
    like: insert_like(objects: [{ post_id: $postId, user_id: $userId }]) {
      row: affected_rows
    }
  }
`

export const UNLIKE_POST = gql`
  mutation($postId: Int, $userId: Int) {
    like: delete_like(
      where: { post_id: { _eq: $postId }, user_id: { _eq: $userId } }
    ) {
      row: affected_rows
    }
  }
`
