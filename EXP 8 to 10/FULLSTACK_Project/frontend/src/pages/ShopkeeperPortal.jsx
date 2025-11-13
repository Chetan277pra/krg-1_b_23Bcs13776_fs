import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function ShopkeeperPortal() {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
    });

    // Fetch all products initially
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

    // Handle form changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Add new product
    const addProduct = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.description || !formData.price) {
            alert("Please fill all fields");
            return;
        }

        try {
            const res = await axios.post("http://localhost:8080/api/products", formData);
            setProducts([...products, res.data]);
            setFormData({ name: "", description: "", price: "" }); // reset form
        } catch (err) {
            console.error("Error adding product:", err);
        }
    };

    // Delete product
    const deleteProduct = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await axios.delete(`http://localhost:8080/api/products/${id}`);
                setProducts(products.filter((p) => p.id !== id));
            } catch (err) {
                console.error("Error deleting product:", err);
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="p-6 bg-gray-900 min-h-screen"
        >
            <h2 className="text-3xl font-bold mb-6 text-white text-center">
                🏪 Shopkeeper Portal
            </h2>

            {/* Product Add Form */}
            <motion.form
                onSubmit={addProduct}
                className="bg-white p-5 rounded-lg shadow-md mb-8 max-w-lg mx-auto"
                whileHover={{ scale: 1.02 }}
            >
                <h3 className="text-lg font-semibold mb-4 text-center text-gray-800">
                    Add New Product
                </h3>
                <div className="flex flex-col gap-3">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Product Name"
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="border p-2 rounded"
                    />
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Price (₹)"
                        className="border p-2 rounded"
                    />
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-green-600 text-white px-4 py-2 rounded-md mt-2"
                        type="submit"
                    >
                        ➕ Add Product
                    </motion.button>
                </div>
            </motion.form>

            {/* Product Display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product, index) => (
                    <motion.div
                        key={product.id}
                        className="bg-white text-gray-800 shadow-lg rounded-xl p-5 text-center"
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0px 8px 30px rgba(59,130,246,0.3)",
                        }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="rounded-lg mx-auto w-full h-48 object-cover transition-transform duration-300 hover:scale-105 mb-3"
                        />
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                        <p className="font-bold mt-2 text-blue-600 text-lg">
                            ₹{product.price}
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: "#dc2626" }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => deleteProduct(product.id)}
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md transition-all"
                        >
                            🗑️ Delete
                        </motion.button>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

export default ShopkeeperPortal;
