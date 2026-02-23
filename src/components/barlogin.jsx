import { useState, memo } from "react";
import { Link } from "react-router-dom";

export const Bar = memo(function Bar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="text-xl font-bold text-blue-900">
                                Gestão de Gestores
                            </Link>
                        </div>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
                        <Link to="#" className="text-gray-600 hover:text-blue-900 px-3 py-2 rounded-md text-sm font-medium">
                            Bem vindo!!!
                        </Link>
                        <Link to="/login" className="text-gray-600 hover:text-blue-900 px-3 py-2 rounded-md text-sm font-medium">
                            Entre com sua conta
                        </Link>
                        <Link to="#" className="text-gray-600 hover:text-blue-900 px-3 py-2 rounded-md text-sm font-medium">
                            Ajuda
                        </Link>
                    </div>
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        >
                            <span className="sr-only">Abrir menu</span>
                            <svg
                                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg
                                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className={`${isOpen ? "block" : "hidden"} sm:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1">
                    <Link to="#" className="text-gray-600 hover:text-blue-900 block px-3 py-2 rounded-md text-base font-medium">
                        Bem vindo!!!
                    </Link>
                    <Link to="/login" className="text-gray-600 hover:text-blue-900 block px-3 py-2 rounded-md text-base font-medium">
                        Entre com sua conta
                    </Link>
                    <Link to="#" className="text-gray-600 hover:text-blue-900 block px-3 py-2 rounded-md text-base font-medium">
                        Ajuda
                    </Link>
                </div>
            </div>
        </nav>
    );
});
