"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import img from '/public/bd.png';

const LanguageSwitcher = () => {
    const router = useRouter();
    const pathname = usePathname();

    const languages = [
        { code: 'en', language: 'English' },
        { code: 'bn', language: 'Bangla' },
    ];

    const found = languages.find((lang) => pathname.includes(lang.code));
    const [selectedLanguage, setSelectedLanguage] = useState(found ?? languages[0]);
    const [showMenu, setShowMenu] = useState(false);

    const handleLanguageChange = (lang) => {
        setSelectedLanguage({ code: lang, language: lang === 'en' ? 'English' : 'Bangla' });
        setShowMenu(false);
        router.push(`/${lang}`);
    };

    return (
        <div className="relative">
            <button
                className="flex items-center gap-2 text-white hover:text-gray-300"
                onClick={() => setShowMenu(!showMenu)}
            >
                <Image className="w-5 h-5" src={img} alt="language-icon" height={20} width={20} />
                <span>{selectedLanguage.language}</span>
            </button>
            {showMenu && (
                <ul className="absolute right-0 top-full mt-2 w-40 rounded-md bg-gray-800 text-white shadow-lg z-10">
                    {languages.map((entry) => (
                        <li
                            key={entry.code}
                            onClick={() => handleLanguageChange(entry.code)}
                            className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-700"
                        >
                            <Image className="w-5 h-5" src={img} alt={entry.language} height={20} width={20} />
                            {entry.language}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LanguageSwitcher;
