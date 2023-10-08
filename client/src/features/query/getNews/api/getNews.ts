import { gql } from "@apollo/client";

export const GET_NEWS = gql`
    query GetNews {
        getNews {
            _id
            title
            description
            teacher_id
        }
    }
`