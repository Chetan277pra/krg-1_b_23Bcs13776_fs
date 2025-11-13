import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
            <h1 className="text-2xl font-bold">E-Commerce App</h1>
            <div className="flex space-x-4">
                <Link to="/" className="hover:underline">
                    Consumer
                </Link>
                <Link to="/shopkeeper" className="hover:underline">
                    Shopkeeper
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
