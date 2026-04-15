// app/kontak/page.tsx
'use client';

import HeroContact from '@/components/contact/HeroContact';
import ContactInfoSidebar from '@/components/contact/ContactInfoSidebar';
import ContactForm from '@/components/contact/ContactForm';
import FAQSection from '@/components/contact/FAQSection';
import GoogleMapsSection from '@/components/contact/GoogleMapsSection';

export default function KontakPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <HeroContact
                title="Hubungi Kami"
                subtitle="Kami siap membantu Anda. Silakan isi form di bawah atau hubungi kami langsung."
            />

            <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 mt-6 md:mt-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1">
                            <ContactInfoSidebar />
                        </div>
                        <div className="lg:col-span-2">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>

            <FAQSection />

            <GoogleMapsSection />
        </div>
    );
}