import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, ShoppingCart, Store, Truck, Shield, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  // Mock product data
  const product = {
    id: 1,
    name: "Handcrafted Wooden Bowl",
    price: 45.99,
    rating: 4.8,
    reviews: 124,
    seller: "Local Artisan Co.",
    category: "Home & Living",
    description: "Beautiful handcrafted wooden bowl made from sustainable hardwood. Each piece is unique with its own natural grain patterns. Perfect for serving salads, fruits, or as a decorative centerpiece.",
    features: [
      "Made from sustainable hardwood",
      "Hand-finished with food-safe oil",
      "Dimensions: 10\" diameter x 4\" height",
      "Unique grain pattern on each piece",
      "Care: Hand wash only"
    ],
    images: [
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800",
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800",
    ],
    stock: 12,
    shipping: "Free shipping on orders over $50"
  };

  const reviews = [
    { author: "Sarah M.", rating: 5, date: "2024-01-10", comment: "Absolutely beautiful! The craftsmanship is outstanding. Perfect size for our dining table." },
    { author: "Michael R.", rating: 5, date: "2024-01-05", comment: "High quality product. Worth every penny. Will definitely buy from this seller again." },
    { author: "Emily K.", rating: 4, date: "2023-12-28", comment: "Very nice bowl. Only giving 4 stars because shipping took a bit longer than expected." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link>
          {" / "}
          <Link to="/products" className="hover:text-foreground">Products</Link>
          {" / "}
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden border">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden border cursor-pointer hover:border-primary">
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-2">{product.category}</Badge>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-warning text-warning" />
                  <span className="font-semibold">{product.rating}</span>
                  <span className="text-muted-foreground">({product.reviews} reviews)</span>
                </div>
              </div>
              <p className="text-3xl font-bold text-primary mb-4">${product.price}</p>
            </div>

            <Separator />

            <div className="flex items-center gap-2">
              <Store className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">Sold by: <Link to="#" className="font-semibold hover:underline">{product.seller}</Link></span>
            </div>

            <p className="text-muted-foreground">{product.description}</p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="font-semibold">Quantity:</label>
                <div className="flex items-center border rounded">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="px-4">{quantity}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  >
                    +
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">{product.stock} in stock</span>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1" size="lg">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-5 w-5 text-success" />
                <span>{product.shipping}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-5 w-5 text-info" />
                <span>Secure payment & buyer protection</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="details" className="mb-12">
          <TabsList>
            <TabsTrigger value="details">Product Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
            <TabsTrigger value="seller">About Seller</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-4">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardContent className="pt-6 space-y-6">
                {reviews.map((review, index) => (
                  <div key={index} className="border-b pb-6 last:border-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">{review.author}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "fill-warning text-warning" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="text-sm">{review.comment}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seller">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-4">{product.seller}</h3>
                <p className="text-muted-foreground mb-4">
                  Local Artisan Co. has been crafting beautiful handmade wooden items for over 15 years. 
                  We source our materials from sustainable forests and take pride in creating unique pieces 
                  that will last for generations.
                </p>
                <div className="flex gap-4">
                  <Button variant="outline">Visit Store</Button>
                  <Button variant="outline">Contact Seller</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetail;
