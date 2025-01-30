import InputField from "../../../components/InputField";
import Button from "../../../components/Button";
import { useState } from "react";
import StaffService from "../../../services/StaffService";
import ImageUploadService from "../../../services/ImageUploadService";

const CreateStaffPage = () => {

    const [image, setImage] = useState(null);

    const [newStaff, setNewStaff] = useState({
        name: "",
        role: "",
        email: "",
        phoneNumber: "",
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
        const isValid = newStaff.name && newStaff.role && newStaff.email && newStaff.phoneNumber
        if (!isValid) {
            setFeedback({
                message: "Failed to create staff: All fields are required",
                type: "error"
            });
            return;
        }

        if (image != null) {
            try {
                const response = await ImageUploadService.uploadImage(image);
                const staff = {
                    ...newStaff, imageUrl: response.data.fileName
                }
                await StaffService.createStaff(staff);
                setFeedback({
                    message: "Staff successfully created",
                    type: "success"
                });
                setNewStaff({
                    name: "",
                    role: "",
                    email: "",
                    phoneNumber: "",
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
                await StaffService.createStaff(newStaff);
                setFeedback({
                    message: "Staff successfully created",
                    type: "success"
                });
                setNewStaff({
                    name: "",
                    role: "",
                    email: "",
                    phoneNumber: "",
                    imageUrl: ""
                });
            } catch (error) {
                console.error("Error occured while creating a new staff member:", error);
                setFeedback({
                    message: "Failed to create staff: Please try again",
                    type: "error"
                });
            }
        }
    }

    return (
        <div className="p-10">
            <form className="flex flex-col">
                <h1 className="font-bold text-2xl">Add new staff member</h1>
                <InputField value={newStaff.name} type="text" onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })} title="Enter staff name: " placeholder={"Enter Name"}></InputField>
                <InputField value={newStaff.role} type="text" onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })} title="Enter staff role: " placeholder={"Enter Role"}></InputField>
                <InputField value={newStaff.email} type="email" onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })} title="Enter staff email: " placeholder={"Enter Email"}></InputField>
                <InputField value={newStaff.phoneNumber} type="text" onChange={(e) => setNewStaff({ ...newStaff, phoneNumber: e.target.value })} title="Enter staff phone number: " placeholder={"Enter Phone number"}></InputField>
                <InputField type="file" onChange={handleImageInput} title="Enter staff image url: " placeholder={"Enter Image url"}></InputField>
                <Button className="mt-5" type="submit" onClick={handleSubmit} text="Submit"></Button>
            </form>
            {/* Source: https://stackoverflow.com/questions/30533171/conditionally-applying-class-attributes-in-react*/}
            <p className={(feedback.type === "error" ? "text-red-500" : "text-green-500")}>{feedback.message}</p>
        </div>
    )
}
export default CreateStaffPage;