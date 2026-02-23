import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { Bar } from "../components/bar";
import { getGestors } from "../services/gestor-service";
import { getEventos } from "../services/evento-service";

export function Perfil() {
    const [eventos, setEventos] = useState([]);
    const [gestors, setGestors] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const [gestorsRes, eventosRes] = await Promise.all([
                getGestors(),
                getEventos()
            ]);
            setGestors(gestorsRes.data || []);
            setEventos(eventosRes.data || []);
        } catch (error) {
            console.error("Error fetching profile data:", error);
            navigate("/");
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [fetchData]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Bar />

            <main className="flex-grow container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row items-center gap-8 mb-12 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <div className="relative">
                            <img
                                className="h-32 w-32 rounded-full border-4 border-blue-50 shadow-xl object-cover"
                                alt="Perfil"
                                src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/d4ad40103067131.5f450dd53ccd1.png"
                            />
                            <div className="absolute bottom-1 right-1 h-6 w-6 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>

                        <div className="text-center md:text-left">
                            <h2 className="text-4xl font-bold text-gray-900 mb-1">Vitor</h2>
                            <p className="text-blue-600 font-semibold mb-3">Administrador Sênior</p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-500">
                                <span className="flex items-center">
                                    <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    vitor@gestao.com
                                </span>
                                <span className="flex items-center">
                                    <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    São Paulo, SP
                                </span>
                            </div>
                        </div>

                        <div className="md:ml-auto flex gap-2">
                            <button className="px-6 py-2 bg-blue-900 text-white rounded-xl hover:bg-blue-800 transition-colors font-semibold shadow-lg shadow-blue-900/20">
                                Editar Perfil
                            </button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center">
                            <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mr-6">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Gestores Ativos</p>
                                <h4 className="text-3xl font-bold text-gray-900">{loading ? "..." : gestors.length}</h4>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center">
                            <div className="h-16 w-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mr-6">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total de Eventos</p>
                                <h4 className="text-3xl font-bold text-gray-900">{loading ? "..." : eventos.length}</h4>
                            </div>
                        </div>
                    </div>

                    {/* Additional Content / Settings Placeholder */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-8 border-b border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900">Configurações da Conta</h3>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {[
                                { title: "Segurança", sub: "Troca de senha e autenticação", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
                                { title: "Notificações", sub: "Configure como você recebe alertas", icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" },
                                { title: "Privacidade", sub: "Dados visíveis para outros usuários", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" }
                            ].map((item, idx) => (
                                <button key={idx} className="w-full flex items-center p-6 hover:bg-gray-50 transition-colors text-left">
                                    <div className="h-10 w-10 bg-gray-100 text-gray-500 rounded-lg flex items-center justify-center mr-4">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">{item.title}</p>
                                        <p className="text-sm text-gray-500">{item.sub}</p>
                                    </div>
                                    <svg className="w-5 h-5 ml-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
