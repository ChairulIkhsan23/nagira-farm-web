// lib/api/client.ts
import type { ErrorResponse } from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;

        const config: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                const error = await response.json().catch((): ErrorResponse => ({}));
                throw new Error(error.message || `API Error: ${response.status}`);
            }

            const data = await response.json();
            return data as T;
        } catch (error) {
            console.error(`API Request Failed: ${url}`, error);
            throw error;
        }
    }

    async get<T = unknown>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: 'GET' });
    }

    // Ganti tipe body jadi unknown (lebih fleksibel)
    async post<T = unknown>(endpoint: string, body: unknown): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(body),
        });
    }

    // Tambahan method PUT, DELETE, PATCH (opsional)
    async put<T = unknown>(endpoint: string, body: unknown): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: JSON.stringify(body),
        });
    }

    async delete<T = unknown>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: 'DELETE' });
    }

    async patch<T = unknown>(endpoint: string, body: unknown): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PATCH',
            body: JSON.stringify(body),
        });
    }
}

export const apiClient = new ApiClient(API_BASE_URL);