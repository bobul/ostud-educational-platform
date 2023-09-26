import {gql} from "@apollo/client";

export const GET_COURSES_BY_CLASS_ID = gql`
    query GetCoursesByClassId($id: ID!) {
        getCoursesByClassId(id: $id) {
            _id,
            title,
            description,
            class_id
        }
    }
`