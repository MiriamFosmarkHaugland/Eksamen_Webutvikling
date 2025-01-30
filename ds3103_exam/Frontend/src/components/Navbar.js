import { NavLink, Outlet } from 'react-router-dom';

function Navbar() {

    return (
        <div className='w-full'>
            <nav className='flex items-center space-x-4 bg-gray-800 h-16 pl-5'>
            <h1 className='font-bold text-2xl text-white'>President</h1>
                <NavLink to="/" className={({isActive}) => isActive ? "text-white" : "cursor-pointer text-gray-400"} >Staff</NavLink>
                <NavLink to="/merch" className={({isActive}) => isActive ? "text-white" : "cursor-pointer text-gray-400"}>Merch</NavLink>
                <NavLink to="/cart" className={({isActive}) => isActive ? "text-white" : "cursor-pointer text-gray-400"}>Cart</NavLink>
                <NavLink to="/admin/staff/create" className={({isActive}) => isActive ? "text-white" : "cursor-pointer text-gray-400"}>Admin</NavLink>
            </nav>
            <div className="w-full overflow-y-scroll">
                {/* Source: https://medium.com/@ravipatel.it/building-a-layout-with-react-router-v6-step-by-step-guide-75b9637f1fbe */}
                <Outlet />
            </div>
        </div>
    )
}

export default Navbar;