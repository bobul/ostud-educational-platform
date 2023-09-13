import {gql} from "@apollo/client";

export const USER_REGISTRATION = gql`
    mutation userRegister($input: CreateUserInput!) {
        userRegister(input: $input) {
            tokens {
                accessToken
                refreshToken
            }
            user {
                id
                role
                email
                firstName
                lastName
                password
                image
                rd
                dob
                activationLink
                isActivate
            }
        }
    }
`