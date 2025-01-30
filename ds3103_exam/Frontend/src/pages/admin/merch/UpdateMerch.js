import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import MerchService from "../../../services/MerchService";
import InputField from "../../../components/InputField";
import Button from "../../../components/Button";
import ImageUploadService from "../../../services/ImageUploadService";

const UpdateMerchPage = () => {

    const { id } = useParams();

    const [merch, setMerch] = useState({
        name: "",
        description: "",
        price: "",
        stockQuantity: "",
        imageUrl: ""
    });

    const [image, setImage] = useState(null);

    const [feedback, setFeedback] = useState({
        message: "",
        type: ""
    });

    useEffect(() => {
        const fetchMerch = async () => {
            try {
                const merch = await MerchService.getMerchById(id)
                setMerch(merch);
            } catch(error) {
                console.error("Failed to fetch merch data: ", error);
                setFeedback({
                    message: "Failed to load merch data. Please try again later.",
                    type: "error"
                });
            }
        };
        fetchMerch();
    }, [id]);

    const handleImageInput = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let updatedMerch = { ...merch };

            if (image) {
                const response = await ImageUploadService.uploadImage(image);
                updatedMerch.imageUrl = response.data.fileName;
            }
            await MerchService.updateMerch(id, updatedMerch);
            setFeedback({
                message: "Merch successfully updated",
                type: "success"
            });
        } catch (error) {
            console.error("Error occured while updating merch item:", error);
            setFeedback({
                message: "Failed to update merch item: Please try again.",
                type: "error"
            });
        }
    }

    const handleDeleteMerchById = async (e) => {
        e.preventDefault();
        try {
            await MerchService.deleteMerch(id);
            setFeedback({
                message: "Merch successfully deleted",
                type: "success"
            });
            setMerch({
                name: "",
                description: "",
                price: "",
                stockQuantity: "",
                imageUrl: ""
            });
        } catch (error) {
            console.error("Error occured while deleting merch item:", error);
            setFeedback({
                message: "Failed to delete merch: Please try again.",
                type: "error"
            });
        }
    }

    return (
        <div className="p-10">
            <form className="flex flex-col">
                <h1 className="font-bold text-2xl">Edit merch item</h1>
                <InputField value={merch.name} type="text" onChange={(e) => setMerch({ ...merch, name: e.target.value })} title="Choose a name: " placeholder={"Enter Name"}></InputField>
                <InputField value={merch.description} type="text" onChange={(e) => setMerch({ ...merch, description: e.target.value })} title="Enter a description: " placeholder={"Enter Description"}></InputField>
                <InputField value={merch.price} type="text" onChange={(e) => setMerch({ ...merch, price: e.target.value })} title="Choose a price: " placeholder={"Enter price"}></InputField>
                <InputField value={merch.stockQuantity} type="text" onChange={(e) => setMerch({ ...merch, stockQuantity: e.target.value })} title="Enter stock quantity: " placeholder={"Enter Stock quantity"}></InputField>
                <InputField type="file" onChange={handleImageInput} title="Enter your image url: " placeholder={"Enter Image url"}></InputField>
                <Button className="mt-5" type="submit" onClick={handleSubmit} text="Save changes"></Button>
                <br></br>
                <Button variant="Danger" type="submit" onClick={handleDeleteMerchById} text="Delete merch item"></Button>
            </form>
            {/* Source: https://stackoverflow.com/questions/30533171/conditionally-applying-class-attributes-in-react*/}
            <p className={(feedback.type === "error" ? "text-red-500" : "text-green-500")}>{feedback.message}</p>
        </div>
    )
}
export default UpdateMerchPage;