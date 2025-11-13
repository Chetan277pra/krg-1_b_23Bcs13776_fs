import React, { useEffect, useState } from "react";
import axios from "axios";

function CartPage() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/cart");
            setItems(res.data || []);
        } catch (err) {
            console.error("Error fetching cart:", err);
        } finally {
            setLoading(false);
        }
    };

    const updateQty = async (itemId, qty) => {
        if (qty < 1) return;
        try {
            await axios.put(`http://localhost:8080/api/cart/${itemId}`, { quantity: qty });
            setItems(items.map(i => i.id === itemId ? { ...i, quantity: qty } : i));
        } catch (err) {
            console.error("Error updating qty:", err);
        }
    };

    const removeItem = async (itemId) => {
        if (!window.confirm("Remove this item?")) return;
        try {
            await axios.delete(`http://localhost:8080/api/cart/${itemId}`);
            setItems(items.filter(i => i.id !== itemId));
        } catch (err) {
            console.error("Error removing item:", err);
        }
    };

    const clearCart = async () => {
        if (!window.confirm("Clear entire cart?")) return;
        try {
            await axios.delete("http://localhost:8080/api/cart");
            setItems([]);
        } catch (err) {
            console.error("Error clearing cart:", err);
        }
    };

    const total = items.reduce((s, it) => s + it.price * it.quantity, 0);

    if (loading) return <div className="text-white">Loading cart...</div>;

    return (
        <div className="bg-white rounded p-6 text-gray-900 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

            {items.length === 0 ? (
                <div>No items in cart.</div>
            ) : (
                <>
                    <div className="space-y-4">
                        {items.map(item => (
                            <div key={item.id} className="flex gap-4 items-center border rounded p-3">
                                <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded" />
                                <div className="flex-1">
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                    <p className="font-bold mt-1">₹{item.price}</p>
                                </div>

                                <div className="flex flex-col items-end gap-2">
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => updateQty(item.id, item.quantity - 1)} className="px-2 py-1 border rounded">-</button>
                                        <input type="number" value={item.quantity} min="1" onChange={(e) => updateQty(item.id, Number(e.target.value))} className="w-16 text-center border rounded p-1" />
                                        <button onClick={() => updateQty(item.id, item.quantity + 1)} className="px-2 py-1 border rounded">+</button>
                                    </div>

                                    <button onClick={() => removeItem(item.id)} className="text-red-600 text-sm">Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex justify-between items-center">
                        <div>
                            <button onClick={clearCart} className="bg-red-500 text-white px-4 py-2 rounded">Clear Cart</button>
                        </div>
                        <div>
                            <p className="text-lg font-semibold">Total: ₹{total.toFixed(2)}</p>
                            <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded">Checkout</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default CartPage;
