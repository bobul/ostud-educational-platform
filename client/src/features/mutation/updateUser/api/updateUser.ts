import {gql} from "@apollo/client";

export const UPDATE_USER = gql`
    mutation updateUser($input: UpdateUserInput!) {
        updateUser(input: $input) {
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
`