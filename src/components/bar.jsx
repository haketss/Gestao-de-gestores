import { useState, memo } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Bar = memo(function Bar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Left: Branding and Main Links */}
                    <div className="flex items-center space-x-8">
                        <Link to="/" className="text-xl font-bold text-blue-900 flex-shrink-0">
                            Gestão de Gestores
                        </Link>

                        <div className="hidden md:flex items-center space-x-4">
                            <Link to="/dashboard" className="text-gray-600 hover:text-blue-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Home
                            </Link>
                            <Link to="/gestors" className="text-gray-600 hover:text-blue-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Gestores
                            </Link>
                            <Link to="/eventos" className="text-gray-600 hover:text-blue-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Eventos
                            </Link>
                        </div>
                    </div>

                    {/* Right: User Info and Toggle */}
                    <div className="flex items-center">
                        <div className="hidden md:flex items-center mr-4 space-x-3">
                            <span className="text-sm text-gray-700">Logado como, <span className="font-semibold">Vitor</span></span>
                            <img
                                className="h-10 w-10 rounded-full border border-gray-200"
                                alt="Perfil"
                                src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/d4ad40103067131.5f450dd53ccd1.png"
                            />
                        </div>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
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
            <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-bold text-gray-800">Menu</h2>
                        <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="text-center mb-8">
                        <img
                            src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/d4ad40103067131.5f450dd53ccd1.png"
                            className="h-20 w-20 rounded-full mx-auto mb-3 border-2 border-blue-100"
                            alt="User"
                        />
                        <div className="font-bold text-gray-900">Vitor</div>
                        <div className="text-xs text-gray-500">Administrador</div>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <button
                            onClick={() => { navigate("/perfil"); setIsOpen(false); }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
                        >
                            Perfil
                        </button>
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
                            Suporte
                        </button>
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
                            Ajuda
                        </button>
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
                            Configuração
                        </button>

                        <div className="pt-4 mt-4 border-t border-gray-100">
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
