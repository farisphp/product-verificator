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
    category: string;
    totalItems: Number;
    verifications: number;
}

export interface Invitation {
    id: number;
    email: string;
    token: string;
    merchant: Merchant;
}

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
};
