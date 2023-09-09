import {gql} from "@apollo/client";

export const GET_USER_BY_ID = gql`
    query getUserById($id: String!) {
        getUserById(id: $id) {
            id
            role
            email
            firstName
            lastName
            password
            image
            rd
            dob
        }
    }
`