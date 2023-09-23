import {gql} from "@apollo/client";

export const CREATE_CLASS = gql`
    mutation createClass($input: CreateClassInput!) {
        createClass(input: $input) {
            _id
            number
            letter
            students
            teachers
        }
    }
`