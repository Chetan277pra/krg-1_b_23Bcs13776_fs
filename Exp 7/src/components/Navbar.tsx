import { Link } from "react-router-dom";
import { ShoppingCart, User, Store, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  return (
    <nav className="border-b bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <Store className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">LocalMarket</span>
          </Link>

          <div className="flex-1 max-w-xl hidden md:flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-10 w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/seller/dashboard">
                <Store className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/profile">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="md:hidden mt-3">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-10 w-full"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
