// components/ui/SearchBar.tsx
'use client';

interface SearchBarProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    onSearchSubmit: () => void;
    placeholder?: string;
    variant?: 'dark' | 'light';
}

export default function SearchBar({ 
    searchQuery, 
    onSearchChange, 
    onSearchSubmit,
    placeholder = "Search...",
    variant = 'dark'
}: SearchBarProps) {
    const isDark = variant === 'dark';
    
    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex gap-3">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder={placeholder}
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className={`w-full px-4 py-3 pr-10 rounded-lg focus:outline-none transition-all duration-300 ${
                            isDark 
                                ? 'border border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400'
                                : 'border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500'
                        }`}
                    />
                    <svg 
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                            isDark ? 'text-white/60' : 'text-gray-400'
                        }`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <button
                    onClick={onSearchSubmit}
                    className={`font-semibold px-6 py-3 rounded-lg transition-all duration-300 ${
                        isDark
                            ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-800'
                            : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                >
                    Search
                </button>
            </div>
        </div>
    );
}