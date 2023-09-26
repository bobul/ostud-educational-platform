import {gql} from "@apollo/client";

export const CREATE_COURSE = gql`
    mutation CreateCourse($input: CreateCourseInput!) {
        createCourse(input: $input) {
            _id
            title
            description
            class_id
        }
    }
`