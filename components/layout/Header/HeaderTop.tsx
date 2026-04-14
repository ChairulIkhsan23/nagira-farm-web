import { HeaderTopProps } from '@/types';

const defaultProps = {
    phone: '+62 821 1241 77',
    email: 'nagirafarm@gmail.com',
    hours: 'Senin - Sabtu: 08.00 - 17.00',
    showSocial: false
};

export default function HeaderTop({
    phone = defaultProps.phone,
    email = defaultProps.email,
    hours = defaultProps.hours,
}: HeaderTopProps) {
    return (
        <div className="bg-green-700 text-white text-xs py-2 hidden md:block">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex gap-4">
                        <span className="flex items-center gap-1">
                            {phone}
                        </span>
                        <span className="flex items-center gap-1">
                            {email}
                        </span>
                        <span className="flex items-center gap-1">
                            {hours}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}