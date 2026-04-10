// lib/api/endpoints/kategori.ts
import { apiClient } from '../client';
import type { KategoriArtikel } from './artikel';

export const kategoriApi = {
    // Get all categories
    getAll: async (): Promise<KategoriArtikel[]> => {
        return apiClient.get<KategoriArtikel[]>('/api/v1/kategori-artikel');
    },

    // Get single category by slug
    getBySlug: async (slug: string): Promise<KategoriArtikel> => {
        return apiClient.get<KategoriArtikel>(`/api/v1/kategori-artikel/${slug}`);
    },
};