import {useState} from "react";
import {IUser} from "../../../entities";
import {theme} from "../../../app/providers";
import {OstudButton} from "../../../shared";
import {calculateAge, getProfileFields, handleSaveButtonClickAsync} from "./utils";
import {Avatar, Box, Card, IconButton, ThemeProvider} from "@mui/material";
import {Blockquote, Dialog, Flex, Heading, Text, TextField} from "@radix-ui/themes";
import {CalendarIcon, EnvelopeClosedIcon} from "@radix-ui/react-icons"

interface IProfileCardProps {
    user: IUser
}

export function ProfileCard({user}: IProfileCardProps) {
    const fields = getProfileFields(user);
    const [selectedUser, setSelectedUser] = useState<IUser>({...user});
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [selectedPassword, setSelectedPassword] = useState<string>('');

    const getFieldValue = (label: string): string => {
        switch (label) {
            case "Ім'я":
                return selectedUser.firstName;
            case "Прізвище":
                return selectedUser.lastName;
            case "Електронна пошта":
                return selectedUser.email;
            case "Пароль":
                return selectedPassword;
            default:
                return '';
        }
    };

    const handleFieldChange = (label: string, value: string) => {
        switch (label) {
            case "Ім'я":
                setSelectedUser({...selectedUser, firstName: value});
                break;
            case "Прізвище":
                setSelectedUser({...selectedUser, lastName: value});
                break;
            case "Електронна пошта":
                setSelectedUser({...selectedUser, email: value});
                break;
            case "Пароль":
                setSelectedPassword(selectedPassword);
                break;
            default:
                break;
        }
    };


    const handleSaveButtonClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        await handleSaveButtonClickAsync(selectedImage);
    };

    return (
        <ThemeProvider theme={theme}>
            <Card sx={{maxWidth: 'fit-content', padding: 5, margin: 2}}>
                <Flex style={{flexDirection: "column", alignItems: "center", justifyContent: "center", gap: ".5rem"}}>
                    <IconButton size="large">
                        <Avatar alt={user.firstName}
                                sx={{width: '100px', height: '100px'}}
                                src="/static/images/avatar/2.jpg"/>
                    </IconButton>
                    <Box>
                        <Flex style={{flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                            <Heading>{user.lastName}, {user.firstName}</Heading>
                            {user.role === 'teacher' ? <Text color='ruby'
                                                             style={{alignSelf: "center"}}>{user.role}</Text> :
                                <Text color='jade'
                                      style={{alignSelf: "center"}}>{user.role}</Text>}
                            <Flex style={{flexDirection: "column"}}
                                  mt="2">
                                <Flex style={{alignItems: "center", gap: "1rem"}}>
                                    <CalendarIcon/>
                                    <Text>{user.dob}</Text>
                                    <Text>({calculateAge(user.dob)} р.)</Text>
                                </Flex>
                                <Flex style={{alignItems: "center", gap: "1rem"}}>
                                    <EnvelopeClosedIcon/>
                                    <Text style={{fontWeight: "bold"}}>{user.email}</Text>
                                </Flex>
                            </Flex>
                            <Flex style={{alignSelf: "start", gap: "1rem"}}
                                  mt="2"
                                  mb="2">
                                <Blockquote color="yellow">&nbsp;</Blockquote>
                                <Text color="gray">На сайті з {user.rd}</Text>
                            </Flex>
                            <Dialog.Root>
                                <Dialog.Trigger>
                                    <OstudButton variant='contained'>
                                        Редагувати
                                    </OstudButton>
                                </Dialog.Trigger>
                                <Dialog.Content style={{maxWidth: 450}}>
                                    <Dialog.Title>Внесіть зміни у ваш профіль.</Dialog.Title>
                                    <Dialog.Description size="2"
                                                        mb="4">
                                        Змініть ім'я, пошту, пароль або ваше фото профілю.
                                    </Dialog.Description>
                                    <Flex direction="column"
                                          gap="3">
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
                                                             size="small">Завантажити
                                                    <input type="file"
                                                           onChange={(e: any) => setSelectedImage(e.target.files[0])}
                                                           hidden/>
                                                </OstudButton>
                                            </Flex>
                                        </label>
                                        {fields.map((field, index) => (
                                            <label key={index}>
                                                <Text as="div" size="2" mb="1" weight="bold">
                                                    {field.label}
                                                </Text>
                                                <TextField.Input
                                                    defaultValue={field.defaultValue}
                                                    placeholder={field.placeholder}
                                                    value={getFieldValue(field.label)}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                        handleFieldChange(field.label, e.target.value)
                                                    }
                                                />
                                            </label>
                                        ))}
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
                                                         onClick={handleSaveButtonClick}>Зберегти</OstudButton>
                                        </Dialog.Close>
                                    </Flex>
                                </Dialog.Content>
                            </Dialog.Root>
                        </Flex>
                    </Box>
                </Flex>
            </Card>
        </ThemeProvider>
    );
}