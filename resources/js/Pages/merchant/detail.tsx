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
import { staffColumns } from "./partials/columns";
import { MerchantForm } from "./partials/merchant-form";
import {
    Merchant as MerchantData,
    MetaPaginationWithData,
    PageProps,
    PaginatedData,
    User,
    UserWithPivot,
} from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { debounce } from "lodash";

export default function Merchant({
    merchant,
    users,
}: {
    merchant: MerchantData;
    users: MetaPaginationWithData<UserWithPivot<{ role: string }>>;
}) {
    const [activeTab, setActiveTab] = useState("details");
    return (
        <AuthenticatedLayout
            breadcrumbs={[
                { url: route("merchants"), label: "Merchants" },
                { label: merchant.name },
            ]}
        >
            <Head title={merchant.name} />
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="details">Merchant Details</TabsTrigger>
                    <TabsTrigger value="staff">Staff</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-6 pt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Merchant Information</CardTitle>
                            <CardDescription>
                                Details about this merchant
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">
                                            Name
                                        </h3>
                                        <p>{merchant.name}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">
                                            Email
                                        </h3>
                                        <p>{merchant.email}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">
                                            Phone
                                        </h3>
                                        <p>{merchant.phone}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">
                                            Address
                                        </h3>
                                        <p>{merchant.address}</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">
                                            Website
                                        </h3>
                                        <p>{merchant.website || "-"}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">
                                            Logo
                                        </h3>
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage
                                                src={
                                                    merchant.logo ||
                                                    `https://ui-avatars.com/api/?name=${merchant.name}`
                                                }
                                            />
                                        </Avatar>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button variant="outline">
                                    Edit Merchant Details
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="staff" className="space-y-4 pt-4">
                    <DataTable
                        columns={staffColumns}
                        data={users.data}
                        pagination={{
                            data: users,
                            onChange: (table) => {
                                router.get(
                                    route("merchants.show", merchant.id),
                                    {
                                        page:
                                            table.getState().pagination
                                                .pageIndex + 1,
                                        per_page:
                                            table.getState().pagination
                                                .pageSize,
                                    },
                                    { only: ["users"], preserveState: true },
                                );
                            },
                        }}
                        filter={{
                            column: "name",
                            onChange: debounce((value: string) => {
                                router.get(
                                    route("merchants.show", merchant.id),
                                    {
                                        search: value,
                                    },
                                    { only: ["users"], preserveState: true },
                                );
                            }, 200),
                        }}
                        RightHeader={() => <Button>Add Staff</Button>}
                    />
                </TabsContent>
            </Tabs>
        </AuthenticatedLayout>
    );
}
