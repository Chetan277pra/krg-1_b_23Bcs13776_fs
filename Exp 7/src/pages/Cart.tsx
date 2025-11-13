import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";

const Cart = () => {
  // Mock cart items
  const cartItems = [
    {
      id: 1,
      name: "Handcrafted Wooden Bowl",
      price: 45.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=200",
      seller: "Local Artisan Co."
    },
    {
      id: 2,
      name: "Ceramic Coffee Mug",
      price: 18.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=200",
      seller: "Clay & Fire Pottery"
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-6">Add some items to get started!</p>
              <Button asChild>
                <Link to="/">Continue Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{item.seller}</p>
                        <p className="text-lg font-bold text-primary">${item.price}</p>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <Button size="icon" variant="ghost">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                        <div className="flex items-center gap-2 border rounded">
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Input placeholder="Enter promo code" />
                    <Button variant="outline" className="w-full">Apply Code</Button>
                  </div>

                  <Button className="w-full" size="lg" asChild>
                    <Link to="/checkout">Proceed to Checkout</Link>
                  </Button>

                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/">Continue Shopping</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
