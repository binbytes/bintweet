import gql from 'graphql-tag'

export const INSERT_USER = gql`
  mutation(
    $name: String
    $email: String
    $picture: String
    $socialId: String
    $status: String
  ) {
    insert_users(
      objects: [
        {
          name: $name
          email: $email
          picture: $picture
          social_id: $socialId
          status: $status
        }
      ]
    ) {
      affected_rows
    }
  }
`

export const GET_USER_BY_SOCIAL_ID = gql`
  query($socialId: Int) {
    users(where: { social_id: { _eq: $socialId } }) {
      id
      name
      email
      picture
      status
      following {
        follow_id
      }
    }
  }
`
