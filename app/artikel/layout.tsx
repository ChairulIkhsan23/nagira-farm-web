// app/artikel/layout.tsx
export default function ArtikelLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
        </>
    );
}

export async function generateMetadata() {
    return {
        title: 'Artikel | Nagira Farm',
        description: 'Kumpulan artikel terbaru seputar peternakan, tips beternak, dan berita terbaru dari Nagira Farm.',
    };
}