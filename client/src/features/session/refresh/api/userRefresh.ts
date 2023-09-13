import {gql} from "@apollo/client";

export const USER_REFRESH = gql`
    mutation Refresh {
        refresh {
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