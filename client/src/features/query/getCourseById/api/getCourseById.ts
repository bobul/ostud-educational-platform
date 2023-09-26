import {gql} from "@apollo/client";

export const GET_COURSE_BY_ID = gql`
    query GetCourseById($id: ID!) {
        getCourseById(id: $id) {
            _id,
            title,
            description,
            class_id
        }
    }
`