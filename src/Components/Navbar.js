import React from 'react';
import logo from '../Images/logo.svg';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <nav className="shadow-lg border-t-4 border-blue-500">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-between">
                        <div className="flex space-x-7">
                            <div>
                                <a href="/" className="flex items-center py-4 px-2">
                                    <img src={logo} alt="Logo" className="rounded-full h-12 w-12 mr-2 border" />
                                    <span className="font-semibold text-gray-500 text-lg">Mama Kutusu</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div >
    )
}

export default Navbar