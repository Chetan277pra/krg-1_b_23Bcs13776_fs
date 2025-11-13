import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function ConsumerPortal() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/products");
            setProducts(res.data);
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    };

    const openDetail = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="p-6"
        >
            <h2 className="text-2xl font-bold mb-6 text-white text-center">Available Products</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product, index) => (
                    <motion.div
                        key={product.id}
                        className="bg-white text-gray-800 shadow-lg rounded-xl p-5 text-center cursor-pointer"
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                        <div onClick={() => openDetail(product.id)}>
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="rounded-lg mx-auto w-full h-48 object-cover mb-4"
                            />
                            <h3 className="text-lg font-semibold">{product.name}</h3>
                            <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                            <p className="font-bold mt-2 text-blue-600 text-lg">₹{product.price}</p>
                        </div>

                        <div className="flex justify-center gap-3 mt-4">
                            <button
                                onClick={() => openDetail(product.id)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                View
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

export default ConsumerPortal;
