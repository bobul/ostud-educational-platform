import {Dialog, Flex, TextField, Text, Button} from "@radix-ui/themes";
import {OstudButton} from "../../button";
import {IValuesCreateClass} from "../../../models";
import {FetchResult} from "@apollo/client";
import {ICreateClassResponse} from "../../../../entities";
import {useState} from "react";
import {useAppSelector} from "../../../hooks";

interface IOstudDialogProps {
    type: string;
    action: (letter: string, number: number, teacher_id: string) => Promise<void>;
    children: React.ReactNode;
}

export function OstudDialogPanel({type, children, action}: IOstudDialogProps) {
    const [letter, setLetter] = useState<string>('');
    const [number, setNumber] = useState<string>('');
    const {user} = useAppSelector(state => state.userReducer);

    return (
        type === 'class' ? (
            <Dialog.Root>
                <Dialog.Trigger>
                    {children}
                </Dialog.Trigger>

                <Dialog.Content style={{maxWidth: 450}}>
                    <Dialog.Title>Створити новий клас.</Dialog.Title>
                    <Dialog.Description size="2"
                                        mb="4">
                        Заповніть необхідні поля для створення нового класу.
                    </Dialog.Description>

                    <Flex direction="column"
                          gap="3">
                        <label>
                            <Text as="div"
                                  size="2"
                                  mb="1"
                                  weight="bold">
                                Номер класу
                            </Text>
                            <TextField.Input
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                placeholder="Введіть порядковий номер вашого класу"
                            />
                        </label>
                        <label>
                            <Text as="div"
                                  size="2"
                                  mb="1"
                                  weight="bold">
                                Літера класу
                            </Text>
                            <TextField.Input
                                value={letter}
                                onChange={(e) => setLetter(e.target.value)}
                                placeholder="Введіть літеру вашого класу"
                            />
                        </label>
                    </Flex>

                    <Flex gap="3"
                          mt="4"
                          justify="end">
                        <Dialog.Close>
                            <OstudButton variant="contained"
                                         custombackgroundcolor={"lightgray"}>
                                Відмінити
                            </OstudButton>
                        </Dialog.Close>
                        <Dialog.Close>
                            <OstudButton variant="contained"
                                         custombackgroundcolor={"#3D9A50"}
                                         onClick={() => action(letter, parseInt(number), user.id)}>
                                Зберегти
                            </OstudButton>
                        </Dialog.Close>
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>
        ) : (
            <Dialog.Root>
                <Dialog.Trigger>
                    {children}
                </Dialog.Trigger>

                <Dialog.Content style={{maxWidth: 450}}>
                    <Dialog.Title>Створити новий курс.</Dialog.Title>
                    <Dialog.Description size="2"
                                        mb="4">
                        Заповніть необхідні поля для створення нового курсу.
                    </Dialog.Description>

                    <Flex direction="column"
                          gap="3">
                        <label>
                            <Text as="div"
                                  size="2"
                                  mb="1"
                                  weight="bold">
                                Назва курсу
                            </Text>
                            <TextField.Input
                                placeholder="Введіть назву вашого курсу"
                            />
                        </label>
                        <label>
                            <Text as="div"
                                  size="2"
                                  mb="1"
                                  weight="bold">
                                Короткий опис курсу
                            </Text>
                            <TextField.Input
                                placeholder="Зробіть опис вашого курсу"
                            />
                        </label>
                    </Flex>

                    <Flex gap="3"
                          mt="4"
                          justify="end">
                        <Dialog.Close>
                            <OstudButton variant="contained"
                                         custombackgroundcolor={"lightgray"}>
                                Відмінити
                            </OstudButton>
                        </Dialog.Close>
                        <Dialog.Close>
                            <OstudButton variant="contained"
                                         custombackgroundcolor={"#3D9A50"}>
                                Зберегти
                            </OstudButton>
                        </Dialog.Close>
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>
        )
    );
}
