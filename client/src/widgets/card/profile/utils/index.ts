import {IUser} from "../../../../entities";
import {$api} from "../../../../shared";

export function calculateAge(dateOfBirth: string) {
    const parts = dateOfBirth.split(".");
    if (parts.length !== 3) {
        return "Invalid date format";
    }

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);

    const today = new Date();
    const birthDate = new Date(year, month, day);

    if (isNaN(birthDate.getTime())) {
        return "Invalid date";
    }

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

export const getProfileFields = (user: IUser) => [
    {
        label: "Ім'я",
        defaultValue: user.firstName,
        placeholder: "Введіть ваше ім'я",
    },
    {
        label: "Прізвище",
        defaultValue: user.lastName,
        placeholder: "Введіть ваше прізвище",
    },
    {
        label: "Електронна пошта",
        defaultValue: user.email,
        placeholder: "Введіть вашу електронну пошту",
    },
    {
        label: "Пароль",
        defaultValue: "",
        placeholder: "Введіть ваш новий пароль",
    },
];


export const handleSaveButtonClickAsync = async (selectedImage: File | null) => {
    try {
        if (selectedImage) {
            const formData = new FormData();
            formData.append('image', selectedImage);

            const response = await $api.post('/api/uploadAvatar', formData);

            console.log('Image uploaded successfully:', response);
        } else {
            console.warn('No image selected.');
        }
    } catch (error) {
        console.error('Error uploading image:', error);
    }
};

