import React from "react";
import { NavLink } from "react-router-dom";
import { FaBoxes, FaUsers, FaShoppingCart, FaChartBar, FaBars } from "react-icons/fa";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

const SideBar = ({ isOpen, setIsOpen }) => {
    return (
        <div className={`bg-white customShadow min-h-screen transition-all duration-300 ${isOpen ? 'w-60' : 'w-16'}`}>
            {/* Toggle Button */}
            <div className="h-16 flex items-center justify-center border-b">
                <button onClick={() => setIsOpen(!isOpen)} className="text-xl text-black">
                    <FaBars />
                </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-4 p-4">
                {/* All Products */}
                {!isOpen && <Tooltip id="all-products" place="right" effect="solid"><span>All Products</span></Tooltip>}
                <NavLink
                    to="all-products"
                    data-tooltip-id={!isOpen ? "all-products" : ""}
                    className={({ isActive }) =>
                        `flex items-center gap-3 p-2 rounded transition-all text-black hover:bg-red-600 hover:text-white ${isActive ? 'bg-red-600 text-white' : ''}`
                    }
                >
                    <FaBoxes className="text-xl" />
                    {isOpen && <span>All Products</span>}
                </NavLink>

                {/* All Users */}
                {!isOpen && <Tooltip id="all-users" place="right" effect="solid"><span>All Users</span></Tooltip>}
                <NavLink
                    to="all-users"
                    data-tooltip-id={!isOpen ? "all-users" : ""}
                    className={({ isActive }) =>
                        `flex items-center gap-3 p-2 rounded transition-all text-black hover:bg-red-600 hover:text-white ${isActive ? 'bg-red-600 text-white' : ''}`
                    }
                >
                    <FaUsers className="text-xl" />
                    {isOpen && <span>All Users</span>}
                </NavLink>

                {/* All Orders */}
                {!isOpen && <Tooltip id="all-orders" place="right" effect="solid"><span>All Orders</span></Tooltip>}
                <NavLink
                    to="allorder"
                    data-tooltip-id={!isOpen ? "all-orders" : ""}
                    className={({ isActive }) =>
                        `flex items-center gap-3 p-2 rounded transition-all text-black hover:bg-red-600 hover:text-white ${isActive ? 'bg-red-600 text-white' : ''}`
                    }
                >
                    <FaShoppingCart className="text-xl" />
                    {isOpen && <span>All Orders</span>}
                </NavLink>

                {/* Summary */}
                {!isOpen && <Tooltip id="summary" place="right" effect="solid"><span>Summary</span></Tooltip>}
                <NavLink
                    to="sells"
                    data-tooltip-id={!isOpen ? "summary" : ""}
                    className={({ isActive }) =>
                        `flex items-center gap-3 p-2 rounded transition-all text-black hover:bg-red-600 hover:text-white ${isActive ? 'bg-red-600 text-white' : ''}`
                    }
                >
                    <FaChartBar className="text-xl" />
                    {isOpen && <span>Summary</span>}
                </NavLink>
            </nav>
        </div>
    );
};

export default SideBar;
