import api from '../../api';

export interface Ternak {
    id: number;
    slug: string;
    kode_ternak: string;
    nama_ternak: string;
    jenis_ternak: string;
    kategori: 'regular' | 'breeding' | 'fattening';
    jenis_kelamin: 'jantan' | 'betina';
    tanggal_lahir: string;
    bobot: number;
    foto: string | null;
    status_aktif: string;
    created_at: string;
    updated_at: string;
}

export const ternakApi = {
    getAll: async (page = 1) => {
        const response = await api.get(`/ternak?page=${page}`);
        return {
            data: response.data.data.data,
            meta: response.data.data.meta
        };
    },
    
    getBySlug: async (slug: string) => {
        const response = await api.get(`/ternak/${slug}`);
        return response.data.data;
    }
};