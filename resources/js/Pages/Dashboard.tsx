import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import AuthenticatedLayout from "@/layouts/authenticated";
import { cn } from "@/lib/utils";
import { Head, Link, usePage } from "@inertiajs/react";
import {
    BarChart3,
    Box,
    CheckCircle2,
    FileUp,
    QrCode,
    ShoppingBag,
} from "lucide-react";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

const chartData = [
    { month: "January", verification: 186 },
    { month: "February", verification: 305 },
    { month: "March", verification: 237 },
    { month: "April", verification: 73 },
    { month: "May", verification: 209 },
    { month: "June", verification: 214 },
];

const chartConfig = {
    verification: {
        label: "Scan",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig;

export default function Dashboard({
    total_products,
    total_claimed,
    total_scans,
    total_alerts,
}: {
    total_products: number;
    total_claimed: number;
    total_scans: number;
    total_alerts: number;
}) {
    const user = usePage().props.auth.user;
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Dashboard
                    </h1>
                </div>

                <div
                    className={cn("grid gap-4", {
                        "md:grid-cols-2 lg:grid-cols-4": user.is_admin,
                        "md:grid-cols-2 lg:grid-cols-3": !user.is_admin,
                    })}
                >
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Products
                            </CardTitle>
                            <Box className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {total_products}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                +24 from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Claimed Products
                            </CardTitle>
                            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {total_claimed}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                +19% from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                QR Scans
                            </CardTitle>
                            <QrCode className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {total_scans}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                +12% from last month
                            </p>
                        </CardContent>
                    </Card>
                    {user.is_admin ? (
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Counterfeit Alerts
                                </CardTitle>
                                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {total_alerts}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    -4 from last month
                                </p>
                            </CardContent>
                        </Card>
                    ) : null}
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>QR Scan Activity</CardTitle>
                            <CardDescription>
                                QR Scan trends over time
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <ChartContainer config={chartConfig}>
                                <AreaChart
                                    accessibilityLayer
                                    data={chartData}
                                    margin={{
                                        left: 12,
                                        right: 12,
                                    }}
                                >
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tickFormatter={(value) =>
                                            value.slice(0, 3)
                                        }
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={
                                            <ChartTooltipContent indicator="line" />
                                        }
                                    />
                                    <Area
                                        dataKey="verification"
                                        type="natural"
                                        fill="var(--color-verification)"
                                        fillOpacity={0.4}
                                        stroke="var(--color-verification)"
                                    />
                                </AreaChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>
                                Latest product verifications
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-4"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                Product ABC{i}23456 verified
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {i} hour{i !== 1 ? "s" : ""} ago
                                                in New York, USA
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">
                                View All Activity
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
