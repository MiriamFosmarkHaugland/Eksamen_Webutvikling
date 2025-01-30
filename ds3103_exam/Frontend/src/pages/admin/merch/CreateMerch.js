import ImageUploadService from "../../../services/ImageUploadService";
import { useState } from "react";
import MerchService from "../../../services/MerchService";
import InputField from "../../../components/InputField";
import Button from "../../../components/Button";

const CreateMerchPage = () => {

    const [image, setImage] = useState(null);

    const [newMerch, setNewMerch] = useState({
        name: "",
        description: "",
        price: "",
        stockQuantity: "",
        imageUrl: ""
    });

    const [feedback, setFeedback] = useState({
        message: "",
        type: ""
    });

    const handleImageInput = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = newMerch.name && newMerch.description && newMerch.price && newMerch.stockQuantity
        if (!isValid) {
            setFeedback({
                message: "Failed to create merch: All fields are required",
                type: "error"
            });
            return;
        }

        if (image != null) {
            try {
                const response = await ImageUploadService.uploadImage(image);
                const merch = {
                    ...newMerch, imageUrl: response.data.fileName
                }
                await MerchService.createMerch(merch);
                setFeedback({
                    message: "Merch successfully created",
                    type: "success"
                });
                setNewMerch({
                    name: "",
                    description: "",
                    price: "",
                    stockQuantity: "",
                    imageUrl: ""
                });
            } catch (error) {
                console.error(error)
                setFeedback({
                    message: "Failed to upload image",
                    type: "error"
                });
                return
            }
        } else if (image === null) {
            try {
                await MerchService.createMerch(newMerch);
                setFeedback({
                    message: "Merch successfully created",
                    type: "success"
                });
                setNewMerch({
                    name: "",
                    description: "",
                    price: "",
                    stockQuantity: "",
                    imageUrl: ""
                });
            } catch (error) {
                console.error("Error occured while creating a new merch item:", error);
                setFeedback({
                    message: "Failed to create merch item: Please try again",
                    type: "error"
                });
            }
        }
    }
    return (
        <div className="p-10">
            <form className="flex flex-col">
                <h1 className="font-bold text-2xl">Add new merch item</h1>
                <InputField value={newMerch.name} type="text" onChange={(e) => setNewMerch({ ...newMerch, name: e.target.value })} title="Choose a name: " placeholder={"Enter Name"}></InputField>
                <InputField value={newMerch.description} type="text" onChange={(e) => setNewMerch({ ...newMerch, description: e.target.value })} title="Enter a description: " placeholder={"Enter Description"}></InputField>
                <InputField value={newMerch.price} type="text" onChange={(e) => setNewMerch({ ...newMerch, price: e.target.value })} title="Choose a price: " placeholder={"Enter price"}></InputField>
                <InputField value={newMerch.stockQuantity} type="text" onChange={(e) => setNewMerch({ ...newMerch, stockQuantity: e.target.value })} title="Enter stock quantity: " placeholder={"Enter Stock quantity"}></InputField>
                <InputField type="file" onChange={handleImageInput} title="Enter your image url: " placeholder={"Enter Image url"}></InputField>
                <Button className="mt-5" type="submit" onClick={handleSubmit} text="Submit"></Button>
            </form>
            {/* Source: https://stackoverflow.com/questions/30533171/conditionally-applying-class-attributes-in-react*/} 
            <p className={(feedback.type === "error" ? "text-red-500" : "text-green-500")}>{feedback.message}</p>
        </div>
    )
}

export default CreateMerchPage;