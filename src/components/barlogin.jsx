import { useState, memo } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

export const Bar = memo(function Bar() {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="bg-white dark:!bg-slate-600 border-b border-gray-200 dark:border-slate-500 sticky top-0 z-50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex flex-grow justify-between items-center">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="text-xl font-bold text-blue-900 dark:!text-white">
                                Gestão de Gestores
                            </Link>
                        </div>

                        <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
                            <Link to="#" className="text-gray-600 dark:!text-gray-100 hover:text-blue-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Bem vindo!!!
                            </Link>
                            <Link to="/login" className="text-gray-600 dark:!text-gray-100 hover:text-blue-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Entre com sua conta
                            </Link>
                            <Link to="#" className="text-gray-600 dark:!text-gray-100 hover:text-blue-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Ajuda
                            </Link>
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full text-gray-500 dark:!text-gray-100 hover:bg-gray-100 dark:hover:!bg-slate-500 transition-colors"
                                aria-label="Toggle Theme"
                            >
                                {theme === 'dark' ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
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

            <div className={`${isOpen ? "block" : "hidden"} sm:hidden bg-white dark:bg-slate-600 w-full absolute top-16 left-0 shadow-lg border-t border-gray-100 dark:border-slate-500`}>
                <div className="px-2 pt-2 pb-3 space-y-1">
                    <Link to="#" className="text-gray-600 dark:text-gray-100 hover:text-blue-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-500 block px-3 py-2 rounded-md text-base font-medium transition-colors">
                        Bem vindo!!!
                    </Link>
                    <Link to="/login" className="text-gray-600 dark:text-gray-100 hover:text-blue-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-500 block px-3 py-2 rounded-md text-base font-medium transition-colors">
                        Entre com sua conta
                    </Link>
                    <Link to="#" className="text-gray-600 dark:text-gray-100 hover:text-blue-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-500 block px-3 py-2 rounded-md text-base font-medium transition-colors">
                        Ajuda
                    </Link>
                    <button
                        onClick={toggleTheme}
                        className="w-full text-left text-gray-600 dark:text-gray-100 hover:text-blue-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-500 block px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center"
                    >
                        {theme === 'dark' ? (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                Tema Claro
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                                Tema Escuro
                            </>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
});
