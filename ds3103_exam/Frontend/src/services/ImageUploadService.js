import axios from "axios";

const ImageUploadService = (() => {
    const imageUploadEndpoint = "http://localhost:5016/uploadImage";
    const uploadImage = async (image) => {
        const formData = new FormData();
        formData.append("file", image);

        const result = await axios({
            url: imageUploadEndpoint,
            method: "POST",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" }
        });
        formData.delete("file");
        return result;
    }
    return {
        uploadImage
    }
})();

export default ImageUploadService;