import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ConsumerPortal from "./pages/ConsumerPortal";
import ShopkeeperPortal from "./pages/ShopkeeperPortal";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";

function App() {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <header className="p-4 bg-gray-800">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold">My E-Shop</Link>
                    <nav className="flex gap-4">
                        <Link to="/" className="hover:underline">Home</Link>
                        <Link to="/shopkeeper" className="hover:underline">Shopkeeper</Link>
                        <Link to="/cart" className="hover:underline">Cart</Link>
                    </nav>
                </div>
            </header>

            <main className="container mx-auto py-6">
                <Routes>
                    <Route path="/" element={<ConsumerPortal />} />
                    <Route path="/shopkeeper" element={<ShopkeeperPortal />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<CartPage />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
