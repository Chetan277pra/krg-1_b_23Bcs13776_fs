import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { User, MapPin, Mail, Phone, Star } from "lucide-react";
import Navbar from "@/components/Navbar";

const Profile = () => {
  const orderHistory = [
    { id: "#ORD-101", date: "2024-01-10", total: "$45.99", status: "Delivered", items: "Wooden Bowl" },
    { id: "#ORD-102", date: "2024-01-05", total: "$53.98", status: "Delivered", items: "Ceramic Mug x2" },
    { id: "#ORD-103", date: "2023-12-28", total: "$39.99", status: "Delivered", items: "Leather Journal" },
  ];

  const reviews = [
    { product: "Handcrafted Wooden Bowl", rating: 5, comment: "Absolutely beautiful! Great quality.", date: "2024-01-12" },
    { product: "Ceramic Coffee Mug", rating: 4, comment: "Nice design, perfect size.", date: "2024-01-07" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Summary Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center text-center pb-4 border-b">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <User className="h-12 w-12 text-primary" />
                </div>
                <h3 className="font-semibold text-xl">John Doe</h3>
                <p className="text-sm text-muted-foreground">Customer since 2023</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>john.doe@example.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>New York, NY 10001</span>
                </div>
              </div>

              <Button className="w-full" variant="outline">Edit Profile</Button>
            </CardContent>
          </Card>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="orders" className="space-y-6">
              <TabsList>
                <TabsTrigger value="orders">Order History</TabsTrigger>
                <TabsTrigger value="reviews">My Reviews</TabsTrigger>
                <TabsTrigger value="addresses">Addresses</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Items</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orderHistory.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>{order.items}</TableCell>
                            <TableCell>{order.total}</TableCell>
                            <TableCell>
                              <Badge className="bg-success text-success-foreground">{order.status}</Badge>
                            </TableCell>
                            <TableCell>
                              <Button size="sm" variant="outline">View</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>My Reviews</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {reviews.map((review, index) => (
                      <div key={index} className="border-b pb-4 last:border-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold">{review.product}</h4>
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

              <TabsContent value="addresses">
                <Card>
                  <CardHeader>
                    <CardTitle>Saved Addresses</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <Badge>Default</Badge>
                        <Button size="sm" variant="ghost">Edit</Button>
                      </div>
                      <p className="font-medium">Home Address</p>
                      <p className="text-sm text-muted-foreground">
                        123 Main Street<br />
                        Apartment 4B<br />
                        New York, NY 10001
                      </p>
                    </div>
                    <Button variant="outline" className="w-full">
                      + Add New Address
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue="john.doe@example.com" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                    </div>
                    <div>
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="flex gap-2">
                      <Button>Save Changes</Button>
                      <Button variant="outline">Cancel</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
