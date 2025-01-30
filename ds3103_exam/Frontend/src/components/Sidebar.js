import { NavLink, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useState } from "react";

function Sidebar() {
    const [visible, setVisible] = useState(true)

    const navigate = useNavigate();

    const handleExitAdminPage = () => {
        navigate("/");
    }
    return (
        <div className="flex flex-col md:flex-row h-full">
            <div className={`flex flex-col bg-gray-800 text-white w-full md:w-2/5 xl:w-1/5 p-5 h-full space-y-5  ${!visible ? "hidden" : ""}`}>
                <h3 className="self-center font-bold text-2xl">Admin page</h3>
                <h4 className="pt-10">STAFF</h4>
                <li><NavLink end to="staff/create" className={({ isActive }) => isActive ? "text-white" : "cursor-pointer text-gray-400"}>Add staff member</NavLink></li>
                <li><NavLink end to="staff" className={({ isActive }) => isActive ? "text-white" : "cursor-pointer text-gray-400"}>See and edit staff members</NavLink></li>
                <h4 className="pt-10">MERCH</h4>
                <li><NavLink end to="merch/create" className={({ isActive }) => isActive ? "text-white" : "cursor-pointer text-gray-400"}>Add new merch</NavLink></li>
                <li><NavLink end to="merch/" className={({ isActive }) => isActive ? "text-white" : "cursor-pointer text-gray-400"}>See and edit merch items</NavLink></li>
                <Button variant="Danger" type="submit" onClick={handleExitAdminPage} text="Exit Admin Page"></Button>
            </div>
            <div className="w-full overflow-y-scroll relative">
                <button className="absolute top-0 left-0" onClick={() => setVisible(!visible)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>

                </button>
                {/* Source: https://medium.com/@ravipatel.it/building-a-layout-with-react-router-v6-step-by-step-guide-75b9637f1fbe */}
                <Outlet />
            </div>
        </div>
    )
}

export default Sidebar;