
"use client"

import { useState } from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, PlusCircle, LoaderCircle } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useProducts } from "@/hooks/use-products"
import type { Product } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addProduct, updateProduct, deleteProduct } from "@/lib/firestore"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminProductsPage() {
    const { products, loading } = useProducts();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const { toast } = useToast();

    const openAddDrawer = () => {
        setEditingProduct(null);
        setIsDrawerOpen(true);
    };

    const openEditDrawer = (product: Product) => {
        setEditingProduct(product);
        setIsDrawerOpen(true);
    };

    const handleDeleteProduct = async (productId: string) => {
        try {
            await deleteProduct(productId);
            toast({
                title: "Product Deleted",
                description: "The product has been successfully removed.",
            });
        } catch (error) {
             toast({
                variant: "destructive",
                title: "Error Deleting Product",
                description: "There was a problem deleting the product.",
            });
        }
    };

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        
        const productData: Omit<Product, 'id' | 'rating' | 'reviews'> & { rating?: number, reviews?: any[] } = {
            name: formData.get("name") as string,
            price: parseFloat(formData.get("price") as string),
            originalPrice: formData.get("originalPrice") ? parseFloat(formData.get("originalPrice") as string) : undefined,
            image: formData.get("image") as string || "https://placehold.co/400x400.png",
            hint: (formData.get("name") as string).toLowerCase(),
            description: formData.get("description") as string,
            category: formData.get("category") as string,
            tag: formData.get("tag") as string,
        };

        try {
            if (editingProduct) {
                // Update existing product, preserving rating and reviews
                const updateData = { ...productData, rating: editingProduct.rating, reviews: editingProduct.reviews };
                await updateProduct(editingProduct.id, updateData);
                 toast({
                    title: "Product Updated",
                    description: `${productData.name} has been updated.`,
                });
            } else {
                // Add new product with default rating and reviews
                await addProduct({
                    ...productData,
                    rating: 0,
                    reviews: [],
                });
                 toast({
                    title: "Product Added",
                    description: `${productData.name} has been added to your store.`,
                });
            }
            setIsDrawerOpen(false);
            setEditingProduct(null);
        } catch (error) {
             toast({
                variant: "destructive",
                title: `Error ${editingProduct ? "Updating" : "Adding"} Product`,
                description: `There was a problem ${editingProduct ? "updating" : "adding"} the product.`,
            });
        }
    };
    
    const stockStatus = (product: Product) => {
      // a mock stock status
      return "In Stock";
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground mt-2">Loading products...</p>
            </div>
        )
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Products</CardTitle>
                    <CardDescription>Manage your products, view their sales performance and edit them.</CardDescription>
                </div>
                <Button onClick={openAddDrawer}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Product
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map(product => (
                            <TableRow key={product.id}>
                                <TableCell>
                                    <img src={product.image} alt={product.name} className="h-10 w-10 object-cover rounded-md" />
                                </TableCell>
                                <TableCell className="font-medium">{product.name}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell><Badge>{stockStatus(product)}</Badge></TableCell>
                                <TableCell>
                                    {product.originalPrice && <span className="text-muted-foreground line-through mr-2">₦{product.originalPrice.toFixed(2)}</span>}
                                    ₦{product.price.toFixed(2)}
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem onClick={() => openEditDrawer(product)}>Edit</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:text-destructive">Delete</DropdownMenuItem>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will permanently delete the product
                                                            "{product.name}".
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDeleteProduct(product.id)}>Delete</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerContent>
                    <DrawerHeader className="text-left">
                        <DrawerTitle>{editingProduct ? "Edit Product" : "Add a New Product"}</DrawerTitle>
                        <DrawerDescription>
                            {editingProduct ? "Update the details for this product." : "Fill in the details below to add a new product."}
                        </DrawerDescription>
                    </DrawerHeader>
                    <form onSubmit={handleFormSubmit} className="px-4 space-y-4 max-h-[80vh] overflow-y-auto">
                        <div className="space-y-2">
                            <Label htmlFor="name">Product Name</Label>
                            <Input id="name" name="name" defaultValue={editingProduct?.name} required />
                        </div>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Input id="category" name="category" defaultValue={editingProduct?.category} placeholder="e.g. Furniture"/>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="tag">Tag</Label>
                                <Select name="tag" defaultValue={editingProduct?.tag}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a tag" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="None">None</SelectItem>
                                        <SelectItem value="New">New</SelectItem>
                                        <SelectItem value="Hot">Hot</SelectItem>
                                        <SelectItem value="Sale">Sale</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                         </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="price">Price (₦)</Label>
                                <Input id="price" name="price" type="number" step="0.01" defaultValue={editingProduct?.price} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="originalPrice">Original Price (₦)</Label>
                                <Input id="originalPrice" name="originalPrice" type="number" step="0.01" defaultValue={editingProduct?.originalPrice} placeholder="For sales/discounts"/>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" defaultValue={editingProduct?.description} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="image">Image URL</Label>
                            <Input id="image" name="image" placeholder="https://..." defaultValue={editingProduct?.image} />
                        </div>
                        <DrawerFooter className="flex-row gap-4 px-0">
                            <Button type="submit">{editingProduct ? "Save Changes" : "Add Product"}</Button>
                            <DrawerClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </form>
                </DrawerContent>
            </Drawer>
        </Card>
    )
}
