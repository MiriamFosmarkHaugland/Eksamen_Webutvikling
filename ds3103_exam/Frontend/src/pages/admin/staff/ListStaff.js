import { useEffect } from "react";
import { useState } from "react";
import StaffService from "../../../services/StaffService";
import StaffContainer from "../../../components/StaffContainer";
import InputField from "../../../components/InputField";
import Button from "../../../components/Button";

const ListStaffPage = ({ canEdit }) => {
    const [staffList, setStaffList] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        fetchAllStaff();
    }, []);

    const fetchAllStaff = async () => {
        try {
            const allStaff = await StaffService.getAllStaff();
            setStaffList(allStaff);
        } catch (error) {
            console.error("Failed to fetch staff data: ", error);
        }
    };

    const handleSearchByName = async (e) => {
        e.preventDefault();

        if (searchValue == "") {
            await fetchAllStaff()
        } else {
            try {
                const allStaffByName = await StaffService.getStaffByName(searchValue.toLowerCase());
                console.log(allStaffByName);
                setStaffList(allStaffByName || []);
            } catch (error) {
                console.error("Failed to fetch staff data: ", error);
                setStaffList([]);
            }
        }

    }

    return (
        <div className="p-10">
            <p className="font-bold text-2xl pb-10">All staff members</p>
            <form className="flex flex-col mb-7" onSubmit={handleSearchByName}>
                <InputField value={searchValue} type="text" onChange={(e) => setSearchValue(e.target.value)} title="Find staff members by name: " placeholder={"Search..."}></InputField>
                <Button className="mt-5" type="submit" text="Search"></Button>
            </form>
            {staffList?.length > 0 ? (
            <div className="grid-layout gap-10">
                {staffList.map((staff) => (
                    <StaffContainer key={staff.id} canEdit={canEdit} staff={staff}></StaffContainer>
                ))}
            </div>
            ) : (
                <p className="text-red-500">No staff members found.</p>
            )}
        </div>
    )
}
export default ListStaffPage;