import {gql} from "@apollo/client";

export const USER_LOGIN = gql`
    mutation userLogin($email: String!, $password: String!) {
        userLogin(email: $email, password:$password){
            tokens {
                accessToken
                refreshToken
            }
            user {
                id
                role
                firstName
                lastName
                password
                image
                rd
                dob
            }
        }
    }
`