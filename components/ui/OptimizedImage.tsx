// components/ui/OptimizedImage.tsx
import Image from 'next/image';

interface OptimizedImageProps {
    src: string | null;
    alt: string;
    fill?: boolean;
    className?: string;
}

export default function OptimizedImage({ src, alt, fill, className }: OptimizedImageProps) {
    if (!src) return null;
    
    // Untuk development, gunakan unoptimized
    const isDev = process.env.NODE_ENV === 'development';
    
    return (
        <Image
            src={src}
            alt={alt}
            fill={fill}
            unoptimized={isDev}
            className={className}
        />
    );
}