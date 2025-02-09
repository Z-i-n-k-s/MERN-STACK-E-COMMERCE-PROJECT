import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBoxes, FaUsers, FaShoppingCart, FaChartBar, FaBars } from "react-icons/fa";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`bg-white customShadow min-h-screen transition-all ${isOpen ? 'w-60' : 'w-16'}`}>
            {/* Toggle Button */}
            <div className="h-16 flex items-center justify-center border-b">
                <button onClick={() => setIsOpen(!isOpen)} className="text-2xl text-purple-600">
                    <FaBars />
                </button>
            </div>
            
            {/* Navigation Links */}
            <nav className="flex flex-col gap-4 p-4">
                {/* All Products */}
                {!isOpen && <Tooltip id="all-products" place="right" effect="solid"><span>All Products</span></Tooltip>}
                <Link 
                    to="all-products" 
                    data-tooltip-id={!isOpen ? "all-products" : ""} 
                    className="flex items-center gap-3 p-2 rounded transition-all text-purple-600 hover:bg-purple-600 hover:text-white"
                >
                    <FaBoxes className="text-xl" />
                    {isOpen && <span>All Products</span>}
                </Link>
                
                {/* All Users */}
                {!isOpen && <Tooltip id="all-users" place="right" effect="solid"><span>All Users</span></Tooltip>}
                <Link 
                    to="all-users" 
                    data-tooltip-id={!isOpen ? "all-users" : ""} 
                    className="flex items-center gap-3 p-2 rounded transition-all text-purple-600 hover:bg-purple-600 hover:text-white"
                >
                    <FaUsers className="text-xl" />
                    {isOpen && <span>All Users</span>}
                </Link>
                
                {/* All Orders */}
                {!isOpen && <Tooltip id="all-orders" place="right" effect="solid"><span>All Orders</span></Tooltip>}
                <Link 
                    to="allorder" 
                    data-tooltip-id={!isOpen ? "all-orders" : ""} 
                    className="flex items-center gap-3 p-2 rounded transition-all text-purple-600 hover:bg-purple-600 hover:text-white"
                >
                    <FaShoppingCart className="text-xl" />
                    {isOpen && <span>All Orders</span>}
                </Link>
                
                {/* Summary */}
                {!isOpen && <Tooltip id="summary" place="right" effect="solid"><span>Summary</span></Tooltip>}
                <Link 
                    to="sells" 
                    data-tooltip-id={!isOpen ? "summary" : ""} 
                    className="flex items-center gap-3 p-2 rounded transition-all text-purple-600 hover:bg-purple-600 hover:text-white"
                >
                    <FaChartBar className="text-xl" />
                    {isOpen && <span>Summary</span>}
                </Link>
            </nav>
        </div>
    );
};

export default SideBar;
