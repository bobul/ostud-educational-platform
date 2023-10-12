import { gql } from "@apollo/client";

export const GET_NEWS = gql`
    query GetNews {
        getNews {
            _id
            title
            description
            image
            teacher_id
            teacher_name
            teacher_surname
            dateOfCreation
        }
    }
`