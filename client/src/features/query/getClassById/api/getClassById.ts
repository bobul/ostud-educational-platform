import {gql} from "@apollo/client";

export const GET_CLASS_BY_ID = gql`
    query GetClassById($id: ID!) {
        getClassById(id: $id) {
            _id,
            number,
            letter,
            students,
            teachers
        }
    }
`