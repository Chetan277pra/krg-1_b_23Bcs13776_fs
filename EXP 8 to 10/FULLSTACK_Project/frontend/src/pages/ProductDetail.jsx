import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(1);
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/products/${id}`);
            setProduct(res.data);
        } catch (err) {
            console.error("Error fetching product:", err);
        }
    };

    const addToCart = async () => {
        if (!product) return;
        setAdding(true);
        try {
            await axios.post("http://localhost:8080/api/cart", {
                productId: product.id,
                quantity: parseInt(qty, 10),
            });
            // optional: navigate to cart
            navigate("/cart");
        } catch (err) {
            console.error("Error adding to cart:", err);
        } finally {
            setAdding(false);
        }
    };

    if (!product) return <div className="text-white">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-lg p-6 text-gray-900">
            <div className="md:flex gap-6">
                <div className="md:w-1/2">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-96 object-cover rounded" />
                </div>
                <div className="md:w-1/2">
                    <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <p className="text-xl font-semibold mb-4">₹{product.price}</p>

                    <div className="flex items-center gap-3 mb-4">
                        <label className="text-sm">Quantity:</label>
                        <input
                            type="number"
                            value={qty}
                            min="1"
                            onChange={(e) => setQty(e.target.value)}
                            className="border p-2 w-20 rounded"
                        />
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={addToCart}
                            disabled={adding}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            {adding ? "Adding..." : "Add to Cart"}
                        </button>

                        <button
                            onClick={() => navigate(-1)}
                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
                        >
                            Back
                        </button>
                    </div>

                    <div className="mt-6">
                        <h3 className="font-semibold">Product Details</h3>
                        <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
                            <li>Product ID: {product.id}</li>
                            <li>Category: {product.name}</li>
                            <li>Availability: In stock</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
