import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import AuthenticatedLayout from "@/layouts/authenticated";
import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Merchant as MerchantData, PageProps, PaginatedData } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { FormLabel } from "@/components/ui/form";

export default function Settings() {
    const { user } = usePage().props.auth;
    const [activeTab, setActiveTab] = useState("personal");

    return (
        <AuthenticatedLayout>
            <Head title="Settings" />
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-6 pt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>
                                Details about your personal information
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">
                                            Name
                                        </h3>

                                        <p>{user.name}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">
                                            Email
                                        </h3>
                                        <p>{user.email}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button variant="outline">
                                    Edit Personal Information
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent
                    value="staff"
                    className="space-y-4 pt-4"
                ></TabsContent>
            </Tabs>
        </AuthenticatedLayout>
    );
}
