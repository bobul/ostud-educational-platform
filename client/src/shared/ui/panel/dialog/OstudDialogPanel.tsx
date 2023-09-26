import {Dialog, Flex, Text, TextField} from "@radix-ui/themes";
import {OstudButton} from "../../button";
import React, {useState} from "react";

interface IOstudDialogFieldsState {
    [name: string]: string
}

interface IOstudDialogPropsFields {
    name: string;
    label: string;
    placeholder: string;
}

export interface IOstudDialogProps {
    children?: React.ReactNode;
    title: string;
    subtitle: string;
    fields?: IOstudDialogPropsFields[];
    submitText: string;
    cancelText: string;
    cells: string[];
    action(values: any): Promise<void>;
}

export function OstudDialogPanel({
                                     children,
                                     title,
                                     subtitle,
                                     fields,
                                     submitText,
                                     cancelText,
                                     action
                                 }: IOstudDialogProps) {
    const [fieldsState, setFieldsState] = useState<IOstudDialogFieldsState>({})

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                {children}
            </Dialog.Trigger>

            <Dialog.Content style={{maxWidth: 450}}>
                <Dialog.Title>{title}</Dialog.Title>
                <Dialog.Description size="2"
                                    mb="4">
                    {subtitle}
                </Dialog.Description>

                <Flex direction="column"
                      gap="3">
                    {fields ?
                        fields.map((field) => (
                            <label key={field.label}>
                                <Text as="div"
                                      size="2"
                                      mb="1"
                                      weight="bold">
                                    {field.label}
                                </Text>
                                <TextField.Input
                                    value={fieldsState[field.name]}
                                    onChange={(e) => setFieldsState({
                                        ...fieldsState,
                                        [field.name]: e.target.value
                                    })}
                                    placeholder={field.placeholder}
                                />
                            </label>
                        ))
                        : null}
                </Flex>

                <Flex gap="3"
                      mt="4"
                      justify="end">
                    <Dialog.Close>
                        <OstudButton variant="contained"
                                     custombackgroundcolor={"lightgray"}>
                            {cancelText}
                        </OstudButton>
                    </Dialog.Close>
                    <Dialog.Close>
                        <OstudButton variant="contained"
                                     custombackgroundcolor={"#3D9A50"}
                                     onClick={() => action(fieldsState)}>
                            {submitText}
                        </OstudButton>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    )
}
