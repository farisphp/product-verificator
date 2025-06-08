import {
    CheckCircle2,
    XCircle,
    AlertTriangle,
    Calendar,
    MapPin,
    User,
} from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface OwnershipRecord {
    owner: string;
    date: string;
    location: string;
    type: string;
}

interface ProductProps {
    product: {
        id: string;
        name: string;
        brand?: string;
        manufactureDate?: string;
        isAuthentic: boolean;
        description: string;
        imageUrl?: string;
        ownershipHistory: OwnershipRecord[];
    };
}

export default function ProductDetails({ product }: ProductProps) {
    return (
        <div className="space-y-6">
            <Alert variant={product.isAuthentic ? "default" : "destructive"}>
                {product.isAuthentic ? (
                    <CheckCircle2 className="h-4 w-4" />
                ) : (
                    <XCircle className="h-4 w-4" />
                )}
                <AlertTitle>
                    {product.isAuthentic
                        ? "Authentic Product"
                        : "Potential Counterfeit"}
                </AlertTitle>
                <AlertDescription>
                    {product.isAuthentic
                        ? "This product has been verified as authentic."
                        : "This product could not be verified or may be counterfeit."}
                </AlertDescription>
            </Alert>

            <Card>
                <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>
                        Information about the verified product
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-lg">
                                    {product.name}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {product.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium">
                                        Product ID
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {product.id}
                                    </p>
                                </div>
                                {product.brand && (
                                    <div>
                                        <p className="text-sm font-medium">
                                            Brand
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {product.brand}
                                        </p>
                                    </div>
                                )}
                                {product.manufactureDate && (
                                    <div>
                                        <p className="text-sm font-medium">
                                            Manufacture Date
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {product.manufactureDate}
                                        </p>
                                    </div>
                                )}
                                <div>
                                    <p className="text-sm font-medium">
                                        Status
                                    </p>
                                    <Badge
                                        variant={
                                            product.isAuthentic
                                                ? "default"
                                                : "destructive"
                                        }
                                        className="mt-1"
                                    >
                                        {product.isAuthentic
                                            ? "Authentic"
                                            : "Unverified"}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        {product.imageUrl && (
                            <div className="flex justify-center">
                                <div className="relative h-[200px] w-[300px] overflow-hidden rounded-lg border">
                                    {/* <Image
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  /> */}
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Ownership History</CardTitle>
                    <CardDescription>
                        Track the chain of ownership for this product
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {product.ownershipHistory.length > 0 ? (
                        <div className="relative">
                            <div className="absolute top-0 bottom-0 left-8 w-px bg-border" />
                            <ol className="relative space-y-6">
                                {product.ownershipHistory.map(
                                    (record, index) => (
                                        <li
                                            key={index}
                                            className="relative pl-10"
                                        >
                                            <div className="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full bg-background border">
                                                {record.type ===
                                                "Manufactured" ? (
                                                    <Calendar className="h-4 w-4" />
                                                ) : record.type ===
                                                  "Consumer" ? (
                                                    <User className="h-4 w-4" />
                                                ) : (
                                                    <MapPin className="h-4 w-4" />
                                                )}
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <h4 className="font-medium">
                                                        {record.owner}
                                                    </h4>
                                                    <Badge variant="outline">
                                                        {record.type}
                                                    </Badge>
                                                </div>
                                                <div className="text-sm text-muted-foreground flex gap-3">
                                                    <span>{record.date}</span>
                                                    <Separator orientation="vertical" />
                                                    <span>
                                                        {record.location}
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                    ),
                                )}
                            </ol>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center p-6 text-center">
                            <div className="space-y-2">
                                <AlertTriangle className="h-6 w-6 text-muted-foreground mx-auto" />
                                <h3 className="font-medium">
                                    No ownership records found
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    This product does not have any recorded
                                    ownership history in our database.
                                </p>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
