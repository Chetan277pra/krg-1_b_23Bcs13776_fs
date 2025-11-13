import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Store } from "lucide-react";
import Navbar from "@/components/Navbar";

// Mock data for demonstration
const featuredProducts = [
  {
    id: 1,
    name: "Handcrafted Wooden Bowl",
    price: 45.99,
    seller: "Local Artisan Co.",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400",
    category: "Home & Living"
  },
  {
    id: 2,
    name: "Organic Honey Set",
    price: 29.99,
    seller: "Bee's Knees Farm",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784eaf?w=400",
    category: "Food & Beverage"
  },
  {
    id: 3,
    name: "Hand-knitted Scarf",
    price: 34.99,
    seller: "Cozy Knits Studio",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400",
    category: "Fashion"
  },
  {
    id: 4,
    name: "Ceramic Coffee Mug",
    price: 18.99,
    seller: "Clay & Fire Pottery",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400",
    category: "Home & Living"
  },
  {
    id: 5,
    name: "Natural Soap Collection",
    price: 24.99,
    seller: "Pure Essence Soaps",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=400",
    category: "Beauty"
  },
  {
    id: 6,
    name: "Leather Journal",
    price: 39.99,
    seller: "Heritage Leather",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400",
    category: "Stationery"
  }
];

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover Local Treasures
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
            Support local sellers and find unique, handcrafted products from your community
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/products">Shop Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20" asChild>
              <Link to="/seller/dashboard">Become a Seller</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {["All", "Home & Living", "Fashion", "Food & Beverage", "Beauty", "Stationery"].map((category) => (
              <Badge
                key={category}
                variant={category === "All" ? "default" : "outline"}
                className="cursor-pointer whitespace-nowrap"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <Badge variant="outline" className="mb-2">
                    {product.category}
                  </Badge>
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{product.seller}</p>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-warning text-warning" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <p className="text-2xl font-bold text-primary">${product.price}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex gap-2">
                  <Button className="flex-1" asChild>
                    <Link to={`/product/${product.id}`}>View Details</Link>
                  </Button>
                  <Button size="icon" variant="secondary">
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose LocalMarket?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Store className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Support Local</h3>
              <p className="text-muted-foreground">
                Every purchase directly supports small businesses in your community
              </p>
            </div>
            <div className="text-center">
              <div className="bg-secondary text-secondary-foreground rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Unique Products</h3>
              <p className="text-muted-foreground">
                Discover one-of-a-kind handcrafted items you won't find anywhere else
              </p>
            </div>
            <div className="text-center">
              <div className="bg-accent text-accent-foreground rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Quality Guaranteed</h3>
              <p className="text-muted-foreground">
                All sellers are verified and products are quality-checked
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
