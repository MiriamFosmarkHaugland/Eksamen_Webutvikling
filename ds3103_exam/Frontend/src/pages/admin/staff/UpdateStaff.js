import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import StaffService from "../../../services/StaffService";
import InputField from "../../../components/InputField";
import Button from "../../../components/Button";
import ImageUploadService from "../../../services/ImageUploadService";

const UpdateStaffPage = () => {
    const { id } = useParams();
    const [staff, setStaff] = useState({
        name: "",
        role: "",
        email: "",
        phoneNumber: "",
        imageUrl: ""
    });

    const [image, setImage] = useState(null);

    const [feedback, setFeedback] = useState({
        message: "",
        type: ""
    });

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const staff = await StaffService.getStaffById(id)
                setStaff(staff);
            } catch (error) {
                console.error("Failed to fetch staff data: ", error);
                setFeedback({
                    message: "Failed to load staff data. Please try again later.",
                    type: "error"
                });
            }
        };
        fetchStaff();
    }, [id]);

    const handleImageInput = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let updatedStaff = { ...staff };
            if (image) {
                const response = await ImageUploadService.uploadImage(image);
                updatedStaff.imageUrl = response.data.fileName;
            }
            await StaffService.updateStaff(id, updatedStaff);
            setFeedback({
                message: "Staff successfully updated",
                type: "success"
            });
        } catch (error) {
            console.error("Error occured while updating staff member:", error);
            setFeedback({
                message: "Failed to update staff: Please try again.",
                type: "error"
            });
        }
    }

    const handleDeleteStaffById = async (e) => {
        e.preventDefault();
        try {
            await StaffService.deleteStaff(id);
            setFeedback({
                message: "Staff successfully deleted",
                type: "success"
            });
            setStaff({
                name: "",
                role: "",
                email: "",
                phoneNumber: "",
                imageUrl: ""
            });
        } catch (error) {
            console.error("Error occured while deleting staff member:", error);
            setFeedback({
                message: "Failed to delete staff: Please try again.",
                type: "error"
            });
        }
    }

    return (
        <div className="p-10">
            <form className="flex flex-col">
                <h1 className="font-bold text-2xl pb-10">Edit staff member</h1>
                <InputField value={staff.name} type="text" onChange={(e) => setStaff({ ...staff, name: e.target.value })} title="Enter your name: " placeholder={"Enter Name"}></InputField>
                <InputField value={staff.role} type="text" onChange={(e) => setStaff({ ...staff, role: e.target.value })} title="Enter your role: " placeholder={"Enter Role"}></InputField>
                <InputField value={staff.email} type="email" onChange={(e) => setStaff({ ...staff, email: e.target.value })} title="Enter your email: " placeholder={"Enter Email"}></InputField>
                <InputField value={staff.phoneNumber} type="text" onChange={(e) => setStaff({ ...staff, phoneNumber: e.target.value })} title="Enter your phone number: " placeholder={"Enter Phone number"}></InputField>
                <InputField type="file" onChange={handleImageInput} title="Enter your image url: " placeholder={"Enter Image url"}></InputField>
                <Button className="mt-5" type="submit" onClick={handleSubmit} text="Save changes"></Button>
                <br></br>
                <Button variant="Danger" type="submit" onClick={handleDeleteStaffById} text="Delete staff member"></Button>
            </form>
            {/* Source: https://stackoverflow.com/questions/30533171/conditionally-applying-class-attributes-in-react*/}
            <p className={(feedback.type === "error" ? "text-red-500" : "text-green-500")}>{feedback.message}</p>
        </div>
    )
}
export default UpdateStaffPage;