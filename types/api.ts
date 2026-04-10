// types/api.ts

// ==================== REQUEST TYPES ====================
// Cara 1: Gunakan Record<string, unknown> untuk tipe object apapun
export type RequestBody = Record<string, unknown> | null;

// Atau Cara 2: Lebih fleksibel (bisa object apa saja)
// export type RequestBody = object | null;

// ==================== RESPONSE TYPES ====================
export interface ErrorResponse {
    message?: string;
    errors?: Record<string, string[]>;
    [key: string]: unknown;
}

export interface ApiResponse<T = unknown> {
    data?: T;
    message?: string;
    success?: boolean;
}

// ==================== PAGINATION TYPES ====================
export interface PaginatedResponse<T> {
    data: T[];
    links?: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta?: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

// ==================== COMMON TYPES ====================
export type ID = number | string;
export type Timestamp = string;
export type Nullable<T> = T | null;