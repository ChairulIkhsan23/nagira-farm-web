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

// Export alias untuk kemudahan
export type JenisKelamin = string | JenisKelaminTernak;
export type KategoriTernakType = string | KategoriTernak;
export type StatusAktif = string;

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
    id?: number;
    nama: string;
    kode: string;
    slug: string;
    nama_ternak?: string;
    kode_ternak?: string;
}

export interface BetinaInfo {
    id?: number;
    nama: string;
    kode: string;
    slug: string;
    nama_ternak?: string;
    kode_ternak?: string;
}

export interface PerkawinanTerakhir {
    tanggal_kawin: string | null;
    jenis_kawin: 'alami' | 'IB';
    jenis_kawin_label: string;
    status_siklus: 'kosong' | 'kawin' | 'bunting' | 'gagal' | 'melahirkan';
    status_label: string;
    perkiraan_lahir: string | null;
    pejantan: PejantanInfo | null;
    betina: BetinaInfo | null;
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
    kategori: KategoriTernakType;
    jenis_kelamin: JenisKelamin;
    tanggal_lahir: string;
    bobot: number;
    foto: string | null;
    status_aktif: StatusAktif;
    created_at: string;
    updated_at: string;
    data_kategori?: DataKategori;
    riwayat_timbangan?: RiwayatTimbang[];
    kelahirans?: Kelahiran[];
    price_range?: {
        min: number;
        max: number;
        label: string;
    };
}

export interface FeaturedTernakJenis {
    jenis_ternak: string;
    jenis_slug: string;
    foto: string | null;
    jumlah_tersedia: number;
    price_range: {
        min: number;
        max: number;
        label: string;
    };
}

export interface DetailAnak {
    nama_ternak?: string;
    jenis_kelamin: string;
    kategori: string;
    berat_lahir?: number | null;
    status_aktif: string;
}
export interface Kelahiran {
    id: number;
    betina_id: number;
    perkawinan_id: number | null;
    tanggal_melahirkan: string;
    tanggal_sapih: string | null;
    umur_sapih_hari: number | null;
    jumlah_anak_lahir: number;
    jumlah_anak_hidup: number;
    jumlah_anak_mati: number;
    keterangan: string | null;
    detail_anak: DetailAnak[];
    created_at: string;
    updated_at: string;
    // Relasi
    betina?: Ternak;
    perkawinan?: PerkawinanTerakhir;
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

    getFeatured: async (limit = 6): Promise<FeaturedTernakJenis[]> => {
        const response = await api.get(`/ternak/featured?limit=${limit}`);
        return response.data.data;
    },
    
    getBySlug: async (slug: string): Promise<Ternak> => {
        const response = await api.get<TernakResponse>(`/ternak/${slug}`);
        return response.data.data;
    }
};
