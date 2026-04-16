// components/ui/Pagination.tsx
'use client';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    variant?: 'dark' | 'light';
}

export default function Pagination({ 
    currentPage, 
    totalPages, 
    onPageChange,
    variant = 'dark'
}: PaginationProps) {
    const isDark = variant === 'dark';

    const handlePrevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
            window.scrollTo({ top: 600, behavior: 'smooth' });
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
            window.scrollTo({ top: 600, behavior: 'smooth' });
        }
    };

    const getButtonClass = (isActive: boolean = false) => {
        if (isDark) {
            return isActive
                ? 'bg-yellow-400 text-gray-800 font-bold'
                : 'bg-white/10 backdrop-blur-sm text-white hover:bg-yellow-400 hover:text-gray-800';
        } else {
            return isActive
                ? 'bg-green-600 text-white font-bold'
                : 'bg-gray-100 text-gray-700 hover:bg-green-600 hover:text-white';
        }
    };

    const getNavButtonClass = () => {
        if (isDark) {
            return 'bg-white/10 backdrop-blur-sm text-white hover:bg-yellow-400 hover:text-gray-800';
        } else {
            return 'bg-gray-100 text-gray-700 hover:bg-green-600 hover:text-white';
        }
    };

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 3;
        
        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            
            if (currentPage > 3) {
                pages.push('...');
            }
            
            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);
            
            if (currentPage <= 3) {
                start = 2;
                end = 3;
            }
            
            if (currentPage >= totalPages - 2) {
                start = totalPages - 2;
                end = totalPages - 1;
            }
            
            for (let i = start; i <= end; i++) {
                if (i !== 1 && i !== totalPages) {
                    pages.push(i);
                }
            }
            
            if (currentPage < totalPages - 2) {
                pages.push('...');
            }
            
            if (totalPages !== 1) {
                pages.push(totalPages);
            }
        }
        
        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div>
            <div className="flex justify-center items-center gap-4 mt-12">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ${getNavButtonClass()}`}
                >
                    Sebelumnya
                </button>
                
                <div className="flex gap-2">
                    {getPageNumbers().map((page, idx) => (
                        page === '...' ? (
                            <span key={`dots-${idx}`} className={`w-10 h-10 flex items-center justify-center ${isDark ? 'text-white' : 'text-gray-500'}`}>
                                ...
                            </span>
                        ) : (
                            <button
                                key={page}
                                onClick={() => onPageChange(page as number)}
                                className={`w-10 h-10 rounded-lg transition-all duration-300 ${getButtonClass(currentPage === page)}`}
                            >
                                {page}
                            </button>
                        )
                    ))}
                </div>
                
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ${getNavButtonClass()}`}
                >
                    Selanjutnya
                </button>
            </div>
            
            {/* Info halaman */}
            <div className={`text-center mt-4 text-sm ${isDark ? 'text-white/50' : 'text-gray-400'}`}>
                Halaman {currentPage} dari {totalPages}
            </div>
        </div>
    );
}