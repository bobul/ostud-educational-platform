import { gql } from "@apollo/client";

export const GET_PIECE_OF_NEWS_BY_ID = gql`
    query GetPieceOfNewsById($id: ID!) {
        getPieceOfNewsById(id: $id){
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