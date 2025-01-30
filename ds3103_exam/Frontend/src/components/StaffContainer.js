import { Link } from "react-router-dom";

const staffEndpoint = "http://localhost:5016";

const StaffContainer = ({ staff, canEdit }) => {

    return (
        <div className="flex flex-col items-center column-12 column-sm-6 column-lg-4 column-xl-3 border rounded p-2 shadow-2xl py-10 bg-white drop-shadow-sm w-64">
            {staff.imageUrl && <img className="w-52 h-52 object-cover" src={`${staffEndpoint}/images/${staff.imageUrl}`} alt={`Image of ${staff.name}`}></img>}
            <p className="font-semibold text-xl">{staff.name}</p>
            <p>{staff.role}</p>
            <p>{staff.email}</p>
            <p>{staff.phoneNumber}</p>
            {canEdit && <Link to={`edit/${staff.id}`} className="font-bold bg-blue-500 hover:bg-blue-400 py-2 px-3 rounded mt-4 cursor-pointer">Edit</Link>}
        </div>
    )
}

export default StaffContainer;