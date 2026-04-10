// lib/api/endpoints/artikel.ts
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export interface Artikel {
    id: number;
    slug: string;
    judul: string;
    excerpt: string | null;
    foto: string | null;
    og_image: string | null;
    isi: string;
    status: string;
    views: number;
    is_featured: number;
    tanggal_publish: string | null;
    meta_title: string | null;
    meta_description: string | null;
    created_at: string;
    updated_at: string;
    kategori: {
        id: number;
        slug: string;
        nama_kategori: string;
    };
}

export const artikelApi = {
    // GET ALL ARTICLES dengan pagination
    getAll: async (page = 1) => {
        const response = await api.get(`/artikel?page=${page}`);
        // Response: { success, message, data: { data: [...], meta } }
        return {
            data: response.data.data.data, // Array artikel
            meta: response.data.data.meta  // Info pagination
        };
    },
    
    // GET SINGLE ARTICLE by slug
    getBySlug: async (slug: string) => {
        const response = await api.get(`/artikel/${slug}`);
        // Response: { success, message, data: { ...artikel } }
        return response.data.data; // Langsung return object artikel
    }
};