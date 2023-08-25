import {gql} from "@apollo/client";

export const USER_REGISTRATION = gql`
    mutation userRegister($input: CreateUserInput!) {
        userRegister(input: $input) {
            accessToken,
            refreshToken
        }
    }
`