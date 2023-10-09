import { gql } from "@apollo/client";

export const GET_NEWS_BY_TEACHER_ID = gql`
    query GetNewsByTeacherId($id: ID!) {
        getNewsByTeacherId(id: $id) {
            _id
            title
            description
            teacher_id
        }
    }
`