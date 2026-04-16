import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// EXPORT KategoriArtikel INTERFACE
export interface KategoriArtikel {
    id: number;
    slug: string;
    nama_kategori: string;
    created_at?: string;
    updated_at?: string;
}

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
    kategori: KategoriArtikel; 
}

export const artikelApi = {
    // GET ALL ARTICLES dengan pagination
    getAll: async (page = 1) => {
        const response = await api.get(`/artikel?page=${page}`);
        return {
            data: response.data.data.data, 
            meta: response.data.data.meta 
        };
    },
    
    getBySlug: async (slug: string) => {
        const response = await api.get(`/artikel/${slug}`);
        return response.data.data.article;
    }
};