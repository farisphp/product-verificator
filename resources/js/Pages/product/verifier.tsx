import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ProductDetails from "./partials/product-details";
import { Head } from "@inertiajs/react";

// Mock data for demonstration
const mockProducts = {
    ABC123456: {
        id: "ABC123456",
        name: "Premium Leather Wallet",
        brand: "LuxLeather",
        manufactureDate: "2025-05-15",
        isAuthentic: true,
        description: "Handcrafted premium leather wallet with RFID protection",
        imageUrl: "/placeholder.svg?height=200&width=300",
        ownershipHistory: [
            {
                owner: "LuxLeather",
                date: "2025-06-01",
                location: "Jakarta, Indonesia",
                type: "Merchant",
            },
            // {
            //     owner: "Global Distribution Inc.",
            //     date: "2023-06-02",
            //     location: "Paris, France",
            //     type: "Distributor",
            // },
            // {
            //     owner: "Luxury Goods Store",
            //     date: "2023-07-10",
            //     location: "New York, USA",
            //     type: "Retailer",
            // },
            {
                owner: "John Doe",
                date: "2025-06-03",
                location: "Surabaya, Indonesia",
                type: "Consumer",
            },
        ],
    },
    XYZ789012: {
        id: "XYZ789012",
        name: "Designer Sunglasses",
        brand: "OptiVision",
        manufactureDate: "2023-04-20",
        isAuthentic: true,
        description: "Polarized designer sunglasses with UV protection",
        imageUrl: "/placeholder.svg?height=200&width=300",
        ownershipHistory: [
            {
                owner: "OptiVision Co.",
                date: "2023-04-20",
                location: "Barcelona, Spain",
                type: "Manufactured",
            },
            {
                owner: "EuroLux Distributors",
                date: "2023-05-05",
                location: "Madrid, Spain",
                type: "Distributor",
            },
            {
                owner: "Fashion Eyewear",
                date: "2023-06-12",
                location: "London, UK",
                type: "Retailer",
            },
        ],
    },
    FAKE555555: {
        id: "FAKE555555",
        name: "Designer Handbag",
        brand: "Unknown",
        manufactureDate: "Unknown",
        isAuthentic: false,
        description: "This product appears to be counterfeit",
        imageUrl: "/placeholder.svg?height=200&width=300",
        ownershipHistory: [],
    },
};

const formSchema = z.object({
    productId: z.string().min(6, {
        message: "Product ID must be at least 6 characters.",
    }),
});

export default function Checker() {
    const [product, setProduct] = useState<any>(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationMethod, setVerificationMethod] = useState("serial");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            productId: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsVerifying(true);

        // Simulate API call with timeout
        setTimeout(() => {
            const foundProduct =
                mockProducts[values.productId as keyof typeof mockProducts];
            setProduct(
                foundProduct || {
                    isAuthentic: false,
                    id: values.productId,
                    name: "Unknown Product",
                    description:
                        "This product could not be verified in our database. It may be counterfeit or not registered.",
                    ownershipHistory: [],
                },
            );
            setIsVerifying(false);
        }, 1500);
    }

    return (
        <div className="container mx-auto py-10 px-4 max-w-5xl">
            <Head title="Product Authenticity Verifier" />
            <div className="space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Product Authenticity Verifier
                    </h1>
                    <p className="text-muted-foreground max-w-[700px] mx-auto">
                        Verify the authenticity of your product and view its
                        ownership history to protect against counterfeits.
                    </p>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Verify Your Product</CardTitle>
                            <CardDescription>
                                Enter your product details to verify its
                                authenticity and view ownership history.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs
                                defaultValue="qr"
                                className="w-full"
                                onValueChange={setVerificationMethod}
                            >
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="qr">
                                        QR Code
                                    </TabsTrigger>
                                    <TabsTrigger value="serial">
                                        Product ID
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="serial">
                                    <Form {...form}>
                                        <form
                                            onSubmit={form.handleSubmit(
                                                onSubmit,
                                            )}
                                            className="space-y-4 pt-4"
                                        >
                                            <FormField
                                                control={form.control}
                                                name="productId"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Product ID
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Enter product ID (e.g., ABC123456)"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormDescription>
                                                            You can find the
                                                            product ID on the
                                                            product label or
                                                            packaging.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button
                                                type="submit"
                                                className="w-full"
                                                disabled={isVerifying}
                                            >
                                                {isVerifying
                                                    ? "Verifying..."
                                                    : "Verify Product"}
                                                {!isVerifying && (
                                                    <Search className="ml-2 h-4 w-4" />
                                                )}
                                            </Button>
                                        </form>
                                    </Form>
                                </TabsContent>
                                <TabsContent value="qr">
                                    <div className="pt-4 space-y-4">
                                        <div className="border-2 border-dashed rounded-lg p-8 text-center">
                                            <div className="mx-auto flex flex-col items-center justify-center space-y-4">
                                                <div className="bg-muted rounded-lg p-4">
                                                    <Search className="h-8 w-8 text-muted-foreground" />
                                                </div>
                                                <div className="space-y-2">
                                                    <h3 className="font-medium">
                                                        Scan QR Code
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        Position the QR code
                                                        within the scanner area
                                                    </p>
                                                </div>
                                                <Button className="mt-4">
                                                    Upload QR Code
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>

                    {product && <ProductDetails product={product} />}
                </div>
            </div>
        </div>
    );
}
