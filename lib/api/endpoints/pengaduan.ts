// lib/api/endpoints/pengaduan.ts
import { apiClient } from '../client';

export type KategoriPengaduan = 'saran' | 'keluhan' | 'pertanyaan' | 'laporan' | 'kerjasama';

export interface PengaduanRequest {
    nama_pengirim: string;
    email: string;
    kategori: KategoriPengaduan;
    subjek?: string;
    pesan: string;
}

export interface PengaduanResponse {
    success: boolean;
    message: string;
    data?: {
        id: number;
        nama_pengirim: string;
        email: string;
        kategori: KategoriPengaduan;
        subjek: string | null;
        pesan: string;
        created_at: string;
    };
}

export const pengaduanApi = {
    create: async (data: PengaduanRequest): Promise<PengaduanResponse> => {
        // Cast ke unknown dulu, baru ke Record<string, unknown>
        return apiClient.post<PengaduanResponse>(
            '/api/v1/pengaduan', 
            data as unknown as Record<string, unknown>
        );
    },
};