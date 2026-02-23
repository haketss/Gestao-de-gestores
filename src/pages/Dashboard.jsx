import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Chart } from "react-google-charts";
import { Bar } from "../components/bar";
import { Modal } from "../components/Modal";
import { Evento } from "../components/EventoE";
import { getGestors } from "../services/gestor-service";
import { getEventos } from "../services/evento-service";

export function Dashboard() {
    const [maxGestorsToShow, setMaxGestorsToShow] = useState(5);
    const [eventos, setEventos] = useState([]);
    const [gestors, setGestors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState(null);

    const navigate = useNavigate();

    const totalSales = useMemo(() =>
        gestors.reduce((acc, gestor) => acc + (Number(gestor.atendimentos) || 0), 0),
        [gestors]
    );

    const totalmeta = useMemo(() =>
        gestors.reduce((acc, gestor) => acc + (Number(gestor.metas) || 0), 0),
        [gestors]
    );

    const stats = useMemo(() => [
        {
            label: "Gestores",
            value: gestors.length,
            icon: "https://static.vecteezy.com/system/resources/previews/000/379/094/original/edit-profile-vector-icon.jpg",
            bg: "bg-blue-50"
        },
        {
            label: "Atendimentos",
            value: totalSales,
            icon: totalSales > 400 ? "https://cdn-icons-png.flaticon.com/512/5610/5610930.png" : "https://cdn-icons-png.flaticon.com/512/5974/5974734.png",
            bg: "bg-green-50"
        },
        {
            label: "Total de Metas",
            value: totalmeta,
            icon: "https://th.bing.com/th/id/OIP.5HYVKNZNNUPOwvVY11yO3gHaHa?pid=ImgDet&rs=1",
            bg: "bg-purple-50"
        },
        {
            label: "Eventos",
            value: eventos.length,
            icon: "https://th.bing.com/th/id/OIP.MH2GSCtym73Bu2M_z288ywHaHa?pid=ImgDet&rs=1",
            bg: "bg-orange-50"
        }
    ], [gestors.length, totalSales, totalmeta, eventos.length]);

    const mainChart = useMemo(() => (
        <Chart
            chartType="Bar"
            width="100%"
            height="400px"
            data={[
                ["Gestores", "Atendimentos", "Metas"],
                ...gestors
                    .slice(0, maxGestorsToShow)
                    .map((gestor) => [
                        gestor.nome || "Sem nome",
                        Number(gestor.atendimentos) || 0,
                        Number(gestor.metas) || 0,
                    ]),
            ]}
            options={{
                chart: { subtitle: "Metas e atendimentos do ano: 2023" },
                colors: ['#1e3a8a', '#10b981'],
                legend: { position: 'top' }
            }}
        />
    ), [gestors, maxGestorsToShow]);

    const distributionChart = useMemo(() => (
        <Chart
            chartType="PieChart"
            data={[
                ["Gestor", "Atendimentos"],
                ...gestors.map((gestor) => [
                    gestor.nome || "Anônimo",
                    Number(gestor.atendimentos) || 0,
                ]),
            ]}
            options={{
                legend: { position: 'bottom' },
                chartArea: { width: '90%', height: '70%' },
                pieHole: 0.4,
                colors: ['#1e3a8a', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'],
            }}
            width="100%"
            height="300px"
        />
    ), [gestors]);

    useEffect(() => {
        let isMounted = true;

        async function fetchData() {
            try {
                setLoading(true);
                const [gestorsResult, eventosResult] = await Promise.all([
                    getGestors(),
                    getEventos()
                ]);

                if (isMounted) {
                    setGestors(gestorsResult.data || []);
                    setEventos(eventosResult.data || []);
                }
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
                if (isMounted) {
                    setResult({
                        title: "Erro de Conexão",
                        message: "Não foi possível carregar os dados do dashboard."
                    });
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        fetchData();
        return () => { isMounted = false; };
    }, [navigate]);

    // Render section
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Bar />
            <Modal
                show={result}
                title={result?.title}
                message={result?.message}
                handleClose={() => setResult(null)}
            />

            {loading ? (
                <div className="flex-grow flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
                    <span className="ml-3 text-gray-600 font-medium">Carregando...</span>
                </div>
            ) : (
                <main className="flex-grow container mx-auto px-4 py-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, i) => (
                            <div key={i} className={`${stat.bg} p-6 rounded-2xl shadow-sm border border-white flex items-center space-x-4`}>
                                <img src={stat.icon} alt={stat.label} className="w-12 h-12 rounded-lg object-cover bg-white p-1" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.label}</p>
                                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Chart */}
                        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-gray-900">Resultados dos Atendimentos</h3>
                                <div className="flex space-x-2">
                                    <button
                                        className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                                        onClick={() => setMaxGestorsToShow(prev => prev + 5)}
                                    >
                                        Ver mais
                                    </button>
                                    {maxGestorsToShow > 5 ? (
                                        <button
                                            className="px-3 py-1 text-sm font-medium text-gray-600 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                                            onClick={() => setMaxGestorsToShow(prev => Math.max(5, prev - 5))}
                                        >
                                            Recolher
                                        </button>
                                    ) : null}
                                </div>
                            </div>
                            {mainChart}
                        </div>

                        {/* Distribution Chart */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 text-center">Distribuição</h3>
                            {distributionChart}
                        </div>
                    </div>

                    {/* Events Section */}
                    <div className="mt-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Próximos Eventos</h3>
                            <Link to="/eventos" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                                Ver todos os eventos &rarr;
                            </Link>
                        </div>
                        {eventos && eventos.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {eventos.slice(0, 2).map((evento) => (
                                    <Evento
                                        key={evento.id || evento.nome}
                                        evento={evento}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-300">
                                <p className="text-gray-500">Nenhum evento agendado para o momento.</p>
                            </div>
                        )}
                    </div>
                </main>
            )}
        </div>
    );
}
