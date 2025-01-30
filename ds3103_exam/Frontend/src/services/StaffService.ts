import axios from "axios";

const StaffService = (() => {

    const staffEndpoint = "http://localhost:5016/staff";

    // Typescript source: https://react.dev/learn/typescript

    type Staff = {
        id?: number;
        name: string;
        role: string;
        email: string;
        phoneNumber: string;
        imageUrl?: string;
    }

    const createStaff = async (newStaff: Staff) => {
        try {
            const response = await axios.post(staffEndpoint, newStaff);
            return response.data;
        } catch (error) {
            console.error("Error occured while creating a new staff member: ", error);
        }
    }

    const getAllStaff = async () => {
        try {
            const response = await axios.get(staffEndpoint);
            return response.data;
        } catch (error) {
            console.error("Error occurred while fetching all staff members:", error);
        }
    }

    const getStaffById = async (id: number) => {
        try {
            const response = await axios.get(staffEndpoint + `/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error occurred while fetching staff with ID ${id}:`, error);
        }
    }

    const getStaffByName = async (name: string) => {
        try {
            const response = await axios.get(staffEndpoint + `/name/${name}`);
            return response.data;
        } catch (error) {
            console.error(`Error occured while fetching staff with name ${name}:`, error);
        }
    }

    const updateStaff = async (id: number, editedStaff: Staff) => {
        console.log(editedStaff);
        
        try {
            const response = await axios.put(staffEndpoint + `/${id}`, editedStaff);
            return response.data;
        } catch (error) {
            console.error(`Error occurred while updating staff with ID ${id}:`, error);
        }
    }

    const deleteStaff = async (id: number) => {
        try {
            const response = await axios.delete(staffEndpoint + `/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error occured while deleting staff with ID ${id}:`, error);
        }
    }

    return {
        createStaff,
        getAllStaff,
        getStaffById,
        getStaffByName,
        updateStaff,
        deleteStaff
    }
})();

export default StaffService;