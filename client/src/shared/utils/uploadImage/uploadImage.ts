import {$api} from "../../http";

export const uploadImage = async (selectedImage: File | null):Promise<string | undefined> => {
    try {
        if (selectedImage) {
            const formData = new FormData();
            formData.append('image', selectedImage);

            const response = await $api.post('/api/uploadImage', formData);
            return response.data.filename
        } else {
            console.warn('No image selected.');
        }
    } catch (error) {
        throw new Error(`Error uploading image: ${error}`)
    }
};
