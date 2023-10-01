import {gql} from "@apollo/client";

export const DELETE_CLASS = gql`
    mutation DeleteClass($id: ID!) {
        deleteClass(id: $id) {
            _id,
            number
            letter
            students
            teachers
        }
    }
`