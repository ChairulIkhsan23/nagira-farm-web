// lib/api/endpoints/ternak.ts
import api from '../../api'; // <- Path ke api.ts (karena di lib/api.ts)

export interface Ternak {
    id: number;
    slug: string;
    kode_ternak: string;
    nama_ternak: string;
    jenis_ternak: string;
    jenis_kelamin: 'jantan' | 'betina';
    tanggal_lahir: string;
    umur: string;
    bobot: number;
    foto: string;
    status_aktif: string;
    created_at: string;
    updated_at: string;
}

export const ternakApi = {
    // GET all ternak
    getAll: async (page = 1) => {
        const response = await api.get(`/ternak?page=${page}`);
        // Response: { success, message, data: { data: [...], meta } }
        return {
            data: response.data.data.data, // Array ternak
            meta: response.data.data.meta  // Info pagination
        };
    },
    
    // GET single ternak by slug
    getBySlug: async (slug: string) => {
        const response = await api.get(`/ternak/${slug}`);
        return response.data.data;
    }
};