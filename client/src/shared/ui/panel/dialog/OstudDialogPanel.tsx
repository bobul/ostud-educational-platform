import { Dialog, Flex, Text, TextArea, TextField } from "@radix-ui/themes";
import { OstudButton } from "../../button";
import React, { useRef, useState } from "react";
import { uploadImage } from "../../../utils";
import ReactQuill  from 'react-quill';
import 'react-quill/dist/quill.snow.css';


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
    fields: IOstudDialogPropsFields[];
    submitText: string;
    cancelText: string;
    uploadImageFlag: boolean;
    variant: string;
    _id?: string;

    action(values: any): Promise<any>;
}

export function OstudDialogPanel({
                                     children,
                                     title,
                                     subtitle,
                                     fields,
                                     submitText,
                                     cancelText,
                                     uploadImageFlag,
                                     action,
                                     variant,
                                     _id,
                                 }: IOstudDialogProps) {
    const [fieldsState, setFieldsState] = useState<IOstudDialogFieldsState>({})
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const quillRef = useRef<ReactQuill | null>(null);
    return (
        <Dialog.Root>
            <Dialog.Trigger>
                {children}
            </Dialog.Trigger>

            <Dialog.Content style={{ maxWidth: variant === 'news' ? 650 : 450 }}>
                <Dialog.Title>{title}</Dialog.Title>
                <Dialog.Description size="2"
                                    mb="4">
                    {subtitle}
                </Dialog.Description>

                {
                    uploadImageFlag ?
                        <label>
                            <Flex style={{justifyContent: "space-between", alignItems: "center"}}>
                                <Text as="div"
                                      size="2"
                                      mb="1"
                                      weight="bold">
                                    Аватар
                                </Text>
                                <OstudButton variant="contained"
                                             component="label"
                                             size="small">{selectedImage ? (selectedImage.name.length > 8 ? `${selectedImage.name.substring(0, 8)}...` : selectedImage.name) : "Завантажити"}
                                    <input type="file"
                                           accept="image/*"
                                           onChange={(e: any) => setSelectedImage(e.target.files[0])}
                                           hidden/>
                                </OstudButton>
                            </Flex>
                        </label>
                        : null
                }

                <Flex direction="column"
                      gap="3">
                    {fields
                        ? fields.map((field) => (
                            <label key={field.label}>
                                <Text as="div"
                                      size="2"
                                      mb="1"
                                      weight="bold">
                                    {field.label}
                                </Text>
                              {variant === 'news' && field.name === 'title'? (
                                  <div>
                                    <TextArea
                                      value={fieldsState[field.name]}
                                      onChange={(e) =>
                                        setFieldsState({
                                          ...fieldsState,
                                          [field.name]: e.target.value,
                                        })
                                      }
                                      placeholder={field.placeholder}
                                    />
                                  </div>
                                ) :
                                variant === 'news' ? (
                                    <div>
                                        <ReactQuill
                                            ref={quillRef}
                                            theme="snow"
                                            value={fieldsState[field.name]}
                                            onChange={(value) => {
                                                console.log(fieldsState);
                                                setFieldsState({
                                                    ...fieldsState,
                                                    [field.name]: value,
                                                })
                                            }}
                                            placeholder={field.placeholder}
                                        />
                                    </div>
                                ) : (
                                    <TextField.Input
                                        value={fieldsState[field.name]}
                                        onChange={(e) =>
                                            setFieldsState({
                                                ...fieldsState,
                                                [field.name]: e.target.value,
                                            })
                                        }
                                        placeholder={field.placeholder}
                                    />
                                )}
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
                    {variant === 'create' ? (
                            <Dialog.Close>
                                <OstudButton
                                    variant="contained"
                                    custombackgroundcolor={"#3D9A50"}
                                    onClick={() => action(fieldsState)
                                    }
                                >
                                    {submitText}
                                </OstudButton>
                            </Dialog.Close>
                        ) :
                        variant === 'news' ? (
                                <Dialog.Close>
                                    <OstudButton
                                        variant="contained"
                                        custombackgroundcolor={"#3D9A50"}
                                        onClick={async () => {
                                            const editorContent = quillRef?.current?.getEditor().getContents();
                                            await action({...fieldsState, description: JSON.stringify(editorContent)});
                                        }
                                        }
                                    >
                                        {submitText}
                                    </OstudButton>
                                </Dialog.Close>
                            ) :
                            variant === 'update' ? (
                                <Dialog.Close>
                                    <OstudButton
                                        variant="contained"
                                        custombackgroundcolor={"#3D9A50"}
                                        onClick={() => {
                                            action({...fieldsState, _id});
                                        }}
                                    >
                                        {submitText}
                                    </OstudButton>
                                </Dialog.Close>
                            ) : null}
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    )
}
