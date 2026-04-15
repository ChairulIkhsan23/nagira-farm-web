// lib/api/endpoints/ternak.ts
import api from '../../api';

// Tipe untuk kategori
export interface KategoriTernak {
    value: 'regular' | 'breeding' | 'fattening';
    label: string;
    badge_color: string;
}

// Tipe untuk jenis kelamin
export interface JenisKelaminTernak {
    value: 'jantan' | 'betina';
    icon: string;
}

// Tipe untuk program penggemukan (fattening)
export interface ProgramFattening {
    bobot_awal: number | null;
    bobot_terakhir: number | null;
    target_bobot: number | null;
    tanggal_mulai: string | null;
    tanggal_target_selesai: string | null;
    status: 'progres' | 'selesai' | 'gagal';
    progress_persen: number;
    keterangan: string | null;
}

// Tipe untuk data perkawinan (breeding)
export interface PejantanInfo {
    nama: string;
    kode: string;
    slug: string;
}

export interface PerkawinanTerakhir {
    tanggal_kawin: string | null;
    jenis_kawin: 'alami' | 'IB';
    jenis_kawin_label: string;
    status_siklus: 'kosong' | 'kawin' | 'bunting' | 'gagal' | 'melahirkan';
    status_label: string;
    perkiraan_lahir: string | null;
    pejantan: PejantanInfo | null;
    keterangan: string | null;
    hari_menuju_lahir?: number;
}

// Tipe untuk data kategori
export interface DataKategoriFattening {
    type: 'fattening';
    program: ProgramFattening;
}

export interface DataKategoriBreeding {
    type: 'breeding';
    perkawinan_terakhir: PerkawinanTerakhir;
    message?: string;
}

export type DataKategori = DataKategoriFattening | DataKategoriBreeding | null;

// Tipe untuk riwayat timbangan
export interface RiwayatTimbang {
    tanggal: string;
    bobot: number;
    keterangan: string | null;
}

// Tipe utama Ternak
export interface Ternak {
    id: number;
    slug: string;
    kode_ternak: string;
    nama_ternak: string;
    jenis_ternak: string;
    kategori: string | KategoriTernak;
    jenis_kelamin: string | JenisKelaminTernak;
    tanggal_lahir: string;
    bobot: number;
    foto: string | null;
    status_aktif: string;
    created_at: string;
    updated_at: string;
    data_kategori?: DataKategori;
    riwayat_timbangan?: RiwayatTimbang[];
}

// Tipe untuk response API
export interface TernakResponse {
    success: boolean;
    data: Ternak;
}

export const ternakApi = {
    getAll: async (page = 1) => {
        const response = await api.get(`/ternak?page=${page}`);
        return {
            data: response.data.data.data,
            meta: response.data.data.meta
        };
    },
    
    getBySlug: async (slug: string): Promise<Ternak> => {
        const response = await api.get<TernakResponse>(`/ternak/${slug}`);
        return response.data.data;
    }
};