import {gql} from "@apollo/client";

export const GET_CLASSES_BY_ID = gql`
    query GetClassesById($id: ID!) {
        getClassesById(id: $id) {
            _id
            number
            letter
            students
            teachers
        }
    }
`