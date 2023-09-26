import {gql} from "@apollo/client";

export const GET_CLASSES_BY_TEACHER_ID = gql`
    query GetClassesByTeacherId($id: ID!) {
        getClassesByTeacherId(id: $id) {
            _id
            number
            letter
            students
            teachers
        }
    }
`