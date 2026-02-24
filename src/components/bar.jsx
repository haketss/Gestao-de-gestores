import { useState, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

export const Bar = memo(function Bar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="bg-white dark:!bg-slate-600 border-b border-gray-200 dark:border-slate-500 sticky top-0 z-50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Left: Branding and Main Links */}
                    <div className="flex items-center space-x-8">
                        <Link to="/" className="text-xl font-bold text-blue-900 dark:!text-white flex-shrink-0">
                            Gestão de Gestores
                        </Link>

                        <div className="hidden md:flex items-center space-x-4">
                            <Link to="/dashboard" className="text-gray-600 dark:!text-gray-100 hover:text-blue-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Home
                            </Link>
                            <Link to="/gestors" className="text-gray-600 dark:!text-gray-100 hover:text-blue-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Gestores
                            </Link>
                            <Link to="/eventos" className="text-gray-600 dark:!text-gray-100 hover:text-blue-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Eventos
                            </Link>
                        </div>
                    </div>

                    {/* Right: User Info and Toggle */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-gray-500 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-500 transition-colors"
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
                        <div className="hidden md:flex items-center space-x-3">
                            <span className="text-sm text-gray-700 dark:!text-gray-100">Logado como, <span className="font-semibold text-gray-900 dark:!text-white">Vitor</span></span>
                            <img
                                className="h-10 w-10 rounded-full border border-gray-200 dark:border-slate-500"
                                alt="Perfil"
                                src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/d4ad40103067131.5f450dd53ccd1.png"
                            />
                        </div>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:!text-gray-200 dark:hover:!text-white dark:hover:!bg-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        >
                            <span className="sr-only">Menu</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile / Side Drawer Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Side Drawer */}
            <div className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-slate-600 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Menu</h2>
                        <button onClick={() => setIsOpen(false)} className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="text-center mb-8">
                        <img
                            src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/d4ad40103067131.5f450dd53ccd1.png"
                            className="h-20 w-20 rounded-full mx-auto mb-3 border-2 border-blue-100 dark:border-slate-500"
                            alt="User"
                        />
                        <div className="font-bold text-gray-900 dark:text-white">Vitor</div>
                        <div className="text-xs text-gray-500 dark:text-gray-200">Administrador</div>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <button
                            onClick={() => { navigate("/perfil"); setIsOpen(false); }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-slate-500 hover:text-blue-700 dark:hover:text-white rounded-lg transition-colors"
                        >
                            Perfil
                        </button>
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-slate-500 hover:text-blue-700 dark:hover:text-white rounded-lg transition-colors">
                            Suporte
                        </button>
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-slate-500 hover:text-blue-700 dark:hover:text-white rounded-lg transition-colors">
                            Ajuda
                        </button>
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-slate-500 hover:text-blue-700 dark:hover:text-white rounded-lg transition-colors">
                            Configuração
                        </button>

                        <div className="pt-4 mt-4 border-t border-gray-100 dark:border-slate-500">
                            <button
                                onClick={() => {
                                    sessionStorage.removeItem("token");
                                    navigate("/");
                                }}
                                className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Sair
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
});
