import {gql} from "@apollo/client";

export const UPDATE_CLASS = gql`
    mutation UpdateClass($input: UpdateClassInput!) {
        updateClass(input: $input) {
            _id,
            number,
            letter,
            teachers,
            students
        }
    }
`