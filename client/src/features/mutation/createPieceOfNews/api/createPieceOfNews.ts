import { gql } from "@apollo/client";

export const CREATE_PIECE_OF_NEWS = gql`
    mutation createPieceOfNews($input: CreatePieceOfNewsInput!) {
        createPieceOfNews(input: $input) {
            _id
            title
            description
            teacher_id
        }
    }
`