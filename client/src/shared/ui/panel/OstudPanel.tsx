import { Card, Pagination, Stack, Typography } from "@mui/material";
import { OstudButton } from "../button";
import { OstudDialogPanel } from "./dialog";
import React, { useState } from "react";
import { IOstudDialogProps } from "./dialog";
import { Flex, Table } from "@radix-ui/themes";
import { Add } from "@mui/icons-material";
import { OstudPagination } from "../pagination";

interface IOstudPanelProps {
    title: string;
    renderedItems: React.ReactNode[];
    dialogConfig: IOstudDialogProps;
    cells: string[];
}

const itemsPerPage = 3;

export function OstudPanel({title, renderedItems, dialogConfig, cells}: IOstudPanelProps) {
    const [page, setPage] = useState<number>(1);

    const slicedItems = renderedItems.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <Card sx={{padding: 2, margin: 2, position: 'relative', backgroundColor: "#FFFDDF"}}>
            <Flex style={{flexDirection: "column", alignItems: "flex-start"}}>
                <Typography variant="h5"
                            sx={{alignSelf: 'center'}}>{title}</Typography>
                {slicedItems.length === 0 ? (
                    <Typography variant="body2">Нічого не знайдено.</Typography>
                ) : (
                    <div>
                        <Table.Root variant="surface"
                                    style={{margin: '1rem', width: '700px'}}>
                            <Table.Header style={{backgroundColor: '#ffd500'}}>
                                <Table.Row>
                                    {cells.map((cell, index) => (
                                        <Table.ColumnHeaderCell key={index}>{cell}</Table.ColumnHeaderCell>
                                    ))}
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {slicedItems}
                            </Table.Body>
                        </Table.Root>
                        <OstudPagination itemsPerPage={itemsPerPage}
                                         itemsLength={renderedItems.length}
                                         page={page}
                                         setPage={setPage}
                        />
                    </div>
                )}
                <OstudDialogPanel {...dialogConfig}>
                    <OstudButton
                        variant="contained"
                        style={{alignSelf: 'flex-end'}}
                    >
                        <Add/>
                    </OstudButton>
                </OstudDialogPanel>
            </Flex>
        </Card>
    );
}
