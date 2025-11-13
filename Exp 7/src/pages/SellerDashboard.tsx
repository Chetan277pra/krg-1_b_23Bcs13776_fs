import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Package, ShoppingCart, TrendingUp, Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const SellerDashboard = () => {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  // Mock data
  const stats = [
    { label: "Total Sales", value: "$12,345", icon: DollarSign, color: "text-success" },
    { label: "Products", value: "24", icon: Package, color: "text-primary" },
    { label: "Orders", value: "156", icon: ShoppingCart, color: "text-info" },
    { label: "Growth", value: "+23%", icon: TrendingUp, color: "text-warning" },
  ];

  const recentOrders = [
    { id: "#ORD-001", customer: "John Doe", product: "Wooden Bowl", status: "Processing", amount: "$45.99", date: "2024-01-10" },
    { id: "#ORD-002", customer: "Jane Smith", product: "Ceramic Mug", status: "Shipped", amount: "$18.99", date: "2024-01-09" },
    { id: "#ORD-003", customer: "Bob Johnson", product: "Leather Journal", status: "Delivered", amount: "$39.99", date: "2024-01-08" },
  ];

  const products = [
    { id: 1, name: "Handcrafted Wooden Bowl", price: "$45.99", stock: 12, status: "Active" },
    { id: 2, name: "Ceramic Coffee Mug", price: "$18.99", stock: 24, status: "Active" },
    { id: 3, name: "Leather Journal", price: "$39.99", stock: 8, status: "Active" },
    { id: 4, name: "Hand-knitted Scarf", price: "$34.99", stock: 0, status: "Out of Stock" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processing": return "warning";
      case "Shipped": return "info";
      case "Delivered": return "success";
      default: return "default";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Seller Dashboard</h1>
            <p className="text-muted-foreground">Manage your products and orders</p>
          </div>
          
          <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input id="name" placeholder="Enter product name" />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe your product" rows={4} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" type="number" placeholder="0.00" />
                  </div>
                  <div>
                    <Label htmlFor="stock">Stock</Label>
                    <Input id="stock" type="number" placeholder="0" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" placeholder="e.g., Home & Living" />
                </div>
                <div>
                  <Label htmlFor="image">Product Image URL</Label>
                  <Input id="image" placeholder="https://..." />
                </div>
                <Button className="w-full">Add Product</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs for Orders and Products */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList>
            <TabsTrigger value="orders">Recent Orders</TabsTrigger>
            <TabsTrigger value="products">My Products</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.product}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(order.status) as any}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{order.amount}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">Update</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Product Inventory</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>
                          <Badge className={product.stock > 0 ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"}>
                            {product.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">Edit</Button>
                            <Button size="sm" variant="destructive">Delete</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Sales Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <p>Analytics charts and graphs will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SellerDashboard;
