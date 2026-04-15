import { apiClient } from '../client';

export type KategoriPengaduan = 'saran' | 'kritik' | 'keluhan' | 'pertanyaan' | 'laporan' | 'informasi' | 'lainnya';

export interface PengaduanRequest {
    nama_pengirim: string;
    email: string;
    kategori: KategoriPengaduan;
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
        pesan: string;
        created_at: string;
    };
}

export const pengaduanApi = {
    create: async (data: PengaduanRequest): Promise<PengaduanResponse> => {
        return apiClient.post<PengaduanResponse>(
            '/api/v1/pengaduan',
            data as unknown as Record<string, unknown>
        );
    },
};