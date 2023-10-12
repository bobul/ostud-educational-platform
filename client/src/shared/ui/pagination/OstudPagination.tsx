import React from "react";
import { Pagination, Stack } from "@mui/material";

export interface IOstudPaginationProps {
    itemsPerPage: number,
    itemsLength: number,
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
}
export function OstudPagination ({itemsLength, page, setPage, itemsPerPage}: IOstudPaginationProps) {
    return (
        <div>
            <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                style={{marginTop: '20px'}}
            >
                <Pagination
                    count={Math.ceil(itemsLength / itemsPerPage)}
                    page={page}
                    onChange={(_, num) => setPage(num)}
                    showFirstButton
                    showLastButton
                />
            </Stack>
        </div>
    );
};