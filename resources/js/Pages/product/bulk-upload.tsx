import Authenticated from "@/layouts/authenticated";
import { useState } from "react";
import {
    AlertCircle,
    ArrowRight,
    CheckCircle2,
    Download,
    FileSpreadsheet,
    FileUp,
    HelpCircle,
    Upload,
    X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Head, Link } from "@inertiajs/react";

// Sample validation errors for demonstration
const sampleValidationErrors = [
    {
        row: 2,
        column: "Product ID",
        message: "Product ID already exists in the system",
    },
    {
        row: 5,
        column: "Manufacture Date",
        message: "Invalid date format. Use YYYY-MM-DD",
    },
    {
        row: 8,
        column: "Category",
        message: "Category 'Electronics' is not in the allowed list",
    },
];

// Sample preview data for demonstration
const samplePreviewData = [
    {
        id: "PRD001",
        name: "Premium Leather Wallet",
        brand: "LuxLeather",
        category: "Accessories",
        manufactureDate: "2023-05-15",
        status: "valid",
    },
    {
        id: "PRD002",
        name: "Designer Sunglasses",
        brand: "OptiVision",
        category: "Eyewear",
        manufactureDate: "2023-04-20",
        status: "valid",
    },
    {
        id: "PRD003",
        name: "Luxury Watch",
        brand: "TimeKeeper",
        category: "Watches",
        manufactureDate: "2023-06-10",
        status: "valid",
    },
    {
        id: "PRD004",
        name: "Designer Handbag",
        brand: "FashionElite",
        category: "Bags",
        manufactureDate: "2023-07-05",
        status: "valid",
    },
    {
        id: "PRD005",
        name: "Premium Sneakers",
        brand: "UrbanStep",
        category: "Footwear",
        manufactureDate: "Invalid Date",
        status: "error",
    },
];

export default function BulkUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [uploadStep, setUploadStep] = useState<
        "upload" | "validate" | "review" | "complete"
    >("upload");
    const [uploadProgress, setUploadProgress] = useState(0);
    const [validationErrors, setValidationErrors] = useState<
        typeof sampleValidationErrors
    >([]);
    const [previewData, setPreviewData] = useState<any[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (!file) return;

        setUploadStep("validate");

        // Simulate upload progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            setUploadProgress(progress);

            if (progress >= 100) {
                clearInterval(interval);
                // Simulate validation
                setTimeout(() => {
                    setPreviewData(samplePreviewData);
                    setValidationErrors(sampleValidationErrors);
                    setUploadStep("review");
                }, 1000);
            }
        }, 100);
    };

    const handleConfirmUpload = () => {
        setUploadStep("complete");

        // Simulate processing
        setTimeout(() => {
            // In a real app, you would redirect after successful processing
            // router.push('/admin/products')
        }, 2000);
    };

    const resetUpload = () => {
        setFile(null);
        setUploadStep("upload");
        setUploadProgress(0);
        setValidationErrors([]);
        setPreviewData([]);
    };

    return (
        <Authenticated>
            <Head title="Bulk Upload" />
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Bulk Upload Products</CardTitle>
                        <CardDescription>
                            Upload multiple products at once using a CSV or
                            Excel file
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="upload" value={uploadStep}>
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger
                                    value="upload"
                                    disabled={uploadStep !== "upload"}
                                >
                                    1. Upload File
                                </TabsTrigger>
                                <TabsTrigger
                                    value="validate"
                                    disabled={uploadStep !== "validate"}
                                >
                                    2. Validate Data
                                </TabsTrigger>
                                <TabsTrigger
                                    value="review"
                                    disabled={uploadStep !== "review"}
                                >
                                    3. Review & Confirm
                                </TabsTrigger>
                                <TabsTrigger
                                    value="complete"
                                    disabled={uploadStep !== "complete"}
                                >
                                    4. Complete
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent
                                value="upload"
                                className="space-y-4 pt-4"
                            >
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="file-upload">
                                            Upload File
                                        </Label>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                        >
                                            <Link
                                                href={route(
                                                    "products.bulk_upload.template",
                                                )}
                                            >
                                                <Download className="mr-2 h-4 w-4" />
                                                Download Template
                                            </Link>
                                        </Button>
                                    </div>
                                    <div className="border-2 border-dashed rounded-lg p-8">
                                        <div className="flex flex-col items-center justify-center space-y-4">
                                            <div className="bg-muted rounded-full p-4">
                                                <FileSpreadsheet className="h-8 w-8 text-muted-foreground" />
                                            </div>
                                            <div className="space-y-2 text-center">
                                                <h3 className="font-medium">
                                                    Drag & drop your file here
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Supported formats: CSV,
                                                    XLSX, XLS
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    id="file-upload"
                                                    type="file"
                                                    accept=".csv,.xlsx,.xls"
                                                    className="hidden"
                                                    onChange={handleFileChange}
                                                />
                                                <Button
                                                    asChild
                                                    variant="outline"
                                                >
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="cursor-pointer"
                                                    >
                                                        <Upload className="mr-2 h-4 w-4" />
                                                        Browse Files
                                                    </label>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    {file && (
                                        <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                                            <div className="flex items-center gap-2">
                                                <FileSpreadsheet className="h-5 w-5 text-muted-foreground" />
                                                <span className="text-sm font-medium">
                                                    {file.name}
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    {(file.size / 1024).toFixed(
                                                        2,
                                                    )}{" "}
                                                    KB
                                                </span>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={resetUpload}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    )}
                                </div>

                                <Alert>
                                    <HelpCircle className="h-4 w-4" />
                                    <AlertTitle>
                                        Important Information
                                    </AlertTitle>
                                    <AlertDescription>
                                        <ul className="list-disc pl-5 space-y-1 text-sm">
                                            <li>
                                                Your file must include the
                                                following columns: Product ID,
                                                Name, Brand, Category,
                                                Manufacture Date
                                            </li>
                                            <li>
                                                Maximum 1000 products per upload
                                            </li>
                                            <li>Product IDs must be unique</li>
                                            <li>
                                                Date format should be YYYY-MM-DD
                                            </li>
                                        </ul>
                                    </AlertDescription>
                                </Alert>
                            </TabsContent>

                            <TabsContent
                                value="validate"
                                className="space-y-4 pt-4"
                            >
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <h3 className="font-medium">
                                            Validating your data
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Please wait while we validate your
                                            file. This may take a few moments.
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Progress</span>
                                            <span>{uploadProgress}%</span>
                                        </div>
                                        <Progress value={uploadProgress} />
                                    </div>

                                    <div className="flex items-center gap-2 text-sm">
                                        <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
                                        <span className="font-medium">
                                            {file?.name}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {uploadProgress < 100 ? (
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <span>Validating data...</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-sm text-green-600">
                                                <CheckCircle2 className="h-4 w-4" />
                                                <span>Validation complete</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent
                                value="review"
                                className="space-y-6 pt-4"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-medium">
                                            Review Data
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <Badge
                                                variant="outline"
                                                className="text-amber-500 border-amber-200 bg-amber-50"
                                            >
                                                {validationErrors.length} Issues
                                                Found
                                            </Badge>
                                            <Badge
                                                variant="outline"
                                                className="text-green-500 border-green-200 bg-green-50"
                                            >
                                                {previewData.length} Products
                                                Valid
                                            </Badge>
                                        </div>
                                    </div>

                                    {validationErrors.length > 0 && (
                                        <Alert variant="destructive">
                                            <AlertCircle className="h-4 w-4" />
                                            <AlertTitle>
                                                Validation Issues
                                            </AlertTitle>
                                            <AlertDescription>
                                                <p className="mb-2">
                                                    The following issues were
                                                    found in your data:
                                                </p>
                                                <ul className="list-disc pl-5 space-y-1 text-sm">
                                                    {validationErrors.map(
                                                        (error, index) => (
                                                            <li key={index}>
                                                                Row {error.row}:{" "}
                                                                {error.column} -{" "}
                                                                {error.message}
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            </AlertDescription>
                                        </Alert>
                                    )}

                                    <div className="border rounded-md">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>
                                                        Product ID
                                                    </TableHead>
                                                    <TableHead>Name</TableHead>
                                                    <TableHead>Brand</TableHead>
                                                    <TableHead>
                                                        Category
                                                    </TableHead>
                                                    <TableHead>
                                                        Manufacture Date
                                                    </TableHead>
                                                    <TableHead>
                                                        Status
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {previewData.map(
                                                    (row, index) => (
                                                        <TableRow
                                                            key={index}
                                                            className={
                                                                row.status ===
                                                                "error"
                                                                    ? "bg-red-50"
                                                                    : ""
                                                            }
                                                        >
                                                            <TableCell>
                                                                {row.id}
                                                            </TableCell>
                                                            <TableCell>
                                                                {row.name}
                                                            </TableCell>
                                                            <TableCell>
                                                                {row.brand}
                                                            </TableCell>
                                                            <TableCell>
                                                                {row.category}
                                                            </TableCell>
                                                            <TableCell>
                                                                {
                                                                    row.manufactureDate
                                                                }
                                                            </TableCell>
                                                            <TableCell>
                                                                {row.status ===
                                                                "valid" ? (
                                                                    <Badge
                                                                        variant="outline"
                                                                        className="bg-green-50 text-green-600 border-green-200"
                                                                    >
                                                                        <CheckCircle2 className="mr-1 h-3 w-3" />
                                                                        Valid
                                                                    </Badge>
                                                                ) : (
                                                                    <Badge
                                                                        variant="outline"
                                                                        className="bg-red-50 text-red-600 border-red-200"
                                                                    >
                                                                        <AlertCircle className="mr-1 h-3 w-3" />
                                                                        Error
                                                                    </Badge>
                                                                )}
                                                            </TableCell>
                                                        </TableRow>
                                                    ),
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <Button
                                        variant="outline"
                                        onClick={resetUpload}
                                    >
                                        Cancel
                                    </Button>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div>
                                                    <Button
                                                        onClick={
                                                            handleConfirmUpload
                                                        }
                                                        disabled={
                                                            validationErrors.length >
                                                            0
                                                        }
                                                    >
                                                        Confirm Upload
                                                        <ArrowRight className="ml-2 h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TooltipTrigger>
                                            {validationErrors.length > 0 && (
                                                <TooltipContent>
                                                    <p>
                                                        Please fix validation
                                                        errors before proceeding
                                                    </p>
                                                </TooltipContent>
                                            )}
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </TabsContent>

                            <TabsContent
                                value="complete"
                                className="space-y-4 pt-4"
                            >
                                <div className="flex flex-col items-center justify-center py-8 space-y-4">
                                    <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                                        <CheckCircle2 className="h-8 w-8 text-green-600" />
                                    </div>
                                    <h3 className="text-xl font-medium">
                                        Upload Complete!
                                    </h3>
                                    <p className="text-center text-muted-foreground max-w-md">
                                        Your products have been successfully
                                        uploaded to the system. They are now
                                        ready for verification.
                                    </p>
                                    <div className="flex items-center gap-4 mt-4">
                                        <Button variant="outline" asChild>
                                            <Link href="/admin/products">
                                                View All Products
                                            </Link>
                                        </Button>
                                        <Button asChild>
                                            <Link href="/admin/products/bulk-upload">
                                                <FileUp className="mr-2 h-4 w-4" />
                                                Upload More Products
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t p-4">
                        {uploadStep === "upload" && (
                            <div className="flex justify-end w-full">
                                <Button onClick={handleUpload} disabled={!file}>
                                    <FileUp className="mr-2 h-4 w-4" />
                                    Upload & Validate
                                </Button>
                            </div>
                        )}
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Bulk Upload Guidelines</CardTitle>
                        <CardDescription>
                            Follow these guidelines to ensure a successful
                            upload
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <h3 className="font-medium">Required Columns</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline">
                                            Product ID
                                        </Badge>
                                        <span className="text-sm text-muted-foreground">
                                            Unique identifier for each product
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline">Name</Badge>
                                        <span className="text-sm text-muted-foreground">
                                            Product name
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline">Brand</Badge>
                                        <span className="text-sm text-muted-foreground">
                                            Brand or manufacturer name
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline">
                                            Category
                                        </Badge>
                                        <span className="text-sm text-muted-foreground">
                                            Product category
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline">
                                            Manufacture Date
                                        </Badge>
                                        <span className="text-sm text-muted-foreground">
                                            Format: YYYY-MM-DD
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline">
                                            Description
                                        </Badge>
                                        <span className="text-sm text-muted-foreground">
                                            Optional product description
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                            <h3 className="font-medium">
                                Tips for Successful Upload
                            </h3>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                <li>
                                    Ensure all required fields are filled in
                                </li>
                                <li>
                                    Product IDs must be unique across your
                                    entire inventory
                                </li>
                                <li>
                                    Use the provided template for the correct
                                    format
                                </li>
                                <li>Maximum file size: 10MB</li>
                                <li>Maximum 1000 products per upload</li>
                                <li>
                                    For large catalogs, split your data into
                                    multiple files
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Authenticated>
    );
}
