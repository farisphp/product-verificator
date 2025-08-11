export interface User {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
    email_verified_at?: string;
}

export interface Merchant {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    website?: string | null;
    logo?: string | null;
}

export interface Product {
    id: number;
    name: string;
    brand: string;
    material: string | null;
    description: string | null;
    colors: ProductOption[] | null;
    sizes: ProductOption[] | null;
    category: { id: string; name: string };
    totalItems: Number;
    totalClaimed: number;
}

export interface ProductOption {
    label: string;
    value: string;
}

export interface ProductItem {
    id: number;
    product_id: number;
    serial_number: string;
    manufacture_date: string; // ISO 8601 string (e.g., "2023-10-05T00:00:00.000000Z")
    sku: string | null;
    color: string | null;
    size: string | null;
    created_at: string;
    updated_at: string;
    product?: Product; // Optional relationship with Product
}

export interface Invitation {
    id: number;
    email: string;
    token: string;
    merchant: Merchant;
}

export interface Staff {
    id: number;
    name: string;
    email: string;
    role: string;
    invited_by?: string;
}

export interface Category {
    id: number;
    name: string;
}

export type UserWithPivot<T> = User & { pivot: T };

export type MetaPagination = {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;

    links: {
        url: null | string;
        label: string;
        active: boolean;
    }[];
};

export type MetaPaginationWithData<T> = MetaPagination & { data: T[] };

export type PaginatedData<T> = {
    data: T[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };

    meta: MetaPagination;
};

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    query: Record<string, string>;
};
