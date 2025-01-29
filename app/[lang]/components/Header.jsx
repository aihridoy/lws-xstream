import Image from 'next/image';
import React from 'react';
import avatar from '/public/avatar.png';
import logo from '/public/logo.svg';
import { getDictionary } from '../dictionaries/dictionaries';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';

const Header = async ({ params: { lang } }) => {
    const dict = await getDictionary(lang);

    return (
        <header className="flex justify-between items-center mb-8 px-6 py-4 bg-color-bg-dark">
            <div className="flex items-center space-x-8">
                <Link href="/">
                    <Image src={logo} alt="LWS Xstream Logo" className="h-6" width={200} height={40} />
                </Link>
                <nav className="hidden md:flex space-x-6">
                    <a href="#" className="text-color-purple font-semibold">
                        {dict.topStreaming}
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                        {dict.games}
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                        {dict.teams}
                    </a>
                </nav>
            </div>
            <div className="flex items-center space-x-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder={dict.search}
                        className="bg-gray-800 text-white rounded-full py-2 px-4 w-64 focus:outline-none focus:ring-2 focus:ring-color-purple"
                    />
                    <svg
                        className="w-5 h-5 text-gray-400 absolute right-3 top-2.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                    </svg>
                </div>
                <LanguageSwitcher />
                <Image
                    src={avatar}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                    width={500}
                    height={300}
                />
            </div>
        </header>
    );
};

export default Header;
