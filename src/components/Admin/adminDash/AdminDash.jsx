import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { removeadmin } from '../../../redux/adminSlice';
import { HiMenuAlt3 } from 'react-icons/hi';
import { MdOutlinePlace } from "react-icons/md";
import { MdOutlineDashboard } from 'react-icons/md';
import { IoMdLogOut } from "react-icons/io";
import { AiOutlineUser } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegListAlt } from "react-icons/fa";
import AdminChart from './AdminChart';

export default function AdminDash() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleLogout = () => {
        dispatch(removeadmin());
        localStorage.clear();
        navigate("/admin/login");
    };
      
    const menus = [
        { name: "Dashboard", link: "/admin", icon: MdOutlineDashboard },
        { name: "Users", link: "/admin/users", icon: AiOutlineUser },
        { name: "States", link: "/admin/statesdistrict", icon: MdOutlinePlace },
        { name: "Destinations", link: "/admin/finddestination", icon: MdOutlinePlace },
        { name: "Bookings", link: "/admin/bookingview", icon: FaRegListAlt },
        { name: "Logout", link: "#", icon: IoMdLogOut, action: handleLogout },
    ];

    const [open, setOpen] = useState(true);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div
                className={`bg-[#0e0e0e] min-h-screen ${
                    open ? 'w-64' : 'w-20'
                } transition-all duration-300 text-gray-100`}
            >
                <div className="p-4 flex justify-end">
                    <HiMenuAlt3
                        size={26}
                        className="cursor-pointer hover:text-white"
                        onClick={() => setOpen(!open)}
                    />
                </div>
                <nav className="mt-8">
                    {menus.map((menu, i) => (
                        <div key={i} className="px-4 py-2">
                            {menu.action ? (
                                <button
                                    onClick={menu.action}
                                    className="w-full flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md cursor-pointer"
                                >
                                    <div>{React.createElement(menu.icon, { size: '20' })}</div>
                                    <span className={`${!open && 'hidden'} transition-all`}>
                                        {menu.name}
                                    </span>
                                </button>
                            ) : (
                                <Link
                                    to={menu.link}
                                    className="flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"
                                >
                                    <div>{React.createElement(menu.icon, { size: '20' })}</div>
                                    <span className={`${!open && 'hidden'} transition-all`}>
                                        {menu.name}
                                    </span>
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto p-6">
                <AdminChart />
            </div>
        </div>
    );
}