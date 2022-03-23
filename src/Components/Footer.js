import React from 'react';
import logo from '../Images/logo.svg';

const Footer = () => {
    return (
        <div className="mx-auto">
            <footer className="p-4 bg-white shadow md:px-6 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="#" target="_blank" className="flex items-center mb-4 sm:mb-0">
                        <img src={logo} className="mr-4 h-8" alt="Flowbite Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap">Mama Kutusu Randevu Sistemi</span>
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 sm:mb-0">
                        <li>
                            <a href="#" className="mr-4 text-sm text-gray-500 hover:underline md:mr-6">Hakkımızda</a>
                        </li>
                        <li>
                            <a href="#" className="mr-4 text-sm text-gray-500 hover:underline md:mr-6">KVKK</a>
                        </li>
                        <li>
                            <a href="#" className="mr-4 text-sm text-gray-500 hover:underline md:mr-6">Randevu Al</a>
                        </li>
                        <li>
                            <a href="#" className="text-sm text-gray-500 hover:underline">Bağış Yap</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center">© 2022 Brains Beyond Time. Tüm hakları saklıdır.
                </span>
            </footer>
        </div>
    )
}

export default Footer