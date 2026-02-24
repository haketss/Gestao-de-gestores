import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Gestor } from "../components/Gestor";
import { Bar } from "../components/bar";
import { Modal } from "../components/Modal";
import {
    deleteGestor,
    getGestors,
    updateGestor,
} from "../services/gestor-service";

export function Gestors() {
    const [gestors, setGestors] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState(null);

    const navigate = useNavigate();

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const result = await getGestors();
            setGestors(result.data || []);
        } catch (error) {
            console.error("Error fetching gestors:", error);
            navigate("/");
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, []);

    const removeGestorItem = useCallback(async (id) => {
        try {
            await deleteGestor(id);
            setGestors(prev => prev.filter(g => g.id !== id));
            setResult({
                title: "Excluído!",
                message: "O gestor foi removido com sucesso."
            });
        } catch (error) {
            console.error("Error removing gestor:", error);
            setResult({
                title: "Erro!",
                message: "Não foi possível remover o gestor."
            });
        }
    }, []);

    const editGestorItem = useCallback(async (data) => {
        try {
            await updateGestor(data);
            await fetchData();
            setResult({
                title: "Atualizado!",
                message: "As informações do gestor foram salvas com sucesso."
            });
        } catch (error) {
            console.error("Error updating gestor:", error);
            setResult({
                title: "Erro!",
                message: "Ocorreu um erro ao atualizar os dados."
            });
        }
    }, [fetchData]);

    const filteredGestors = useMemo(() => {
        return gestors.filter((gestor) =>
            (gestor.nome || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (gestor.sobrenome || "").toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [gestors, searchTerm]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex flex-col transition-colors duration-300">
            <Bar />
            <Modal
                show={result}
                title={result?.title}
                message={result?.message}
                handleClose={() => setResult(null)}
            />

            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Gestão de Gestores</h2>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Pesquisar por nome..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-full sm:w-64 transition-all"
                            />
                            <div className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        <Link to="/gestorse" className="inline-flex items-center justify-center px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium">
                            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Adicionar Gestor
                        </Link>
                    </div>
                </div>

                <div className="bg-white dark:!bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden transition-colors duration-300">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-900 dark:border-blue-500"></div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 dark:!bg-slate-800 border-b border-gray-100 dark:border-slate-700">
                                        <th className="px-6 py-4 text-xs font-bold text-gray-600 dark:!text-gray-300 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-600 dark:!text-gray-300 uppercase tracking-wider">Nome</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-600 dark:!text-gray-300 uppercase tracking-wider">Gênero</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-600 dark:!text-gray-300 uppercase tracking-wider">Idade</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-600 dark:!text-gray-300 uppercase tracking-wider">Local</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-600 dark:!text-gray-300 uppercase tracking-wider">Metas</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-600 dark:!text-gray-300 uppercase tracking-wider">Atend.</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-600 dark:!text-gray-300 uppercase tracking-wider text-center">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                                    {filteredGestors.length > 0 ? (
                                        filteredGestors.map((gestor) => (
                                            <tr key={gestor.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                                                        Ativo
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-gray-900 dark:!text-white leading-tight">
                                                        {gestor.nome} {gestor.sobrenome}
                                                    </div>
                                                    <div className="text-[10px] text-gray-400 dark:!text-gray-400 mt-0.5">CRM: {gestor.CRM}</div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-700 dark:!text-gray-200">{gestor.genero}</td>
                                                <td className="px-6 py-4 text-sm text-gray-700 dark:!text-gray-200">{gestor.idade}</td>
                                                <td className="px-6 py-4 text-sm text-gray-700 dark:!text-gray-200">{gestor.localDeTrabalho}</td>
                                                <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:!text-white">{gestor.metas}</td>
                                                <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:!text-white">{gestor.atendimentos}</td>
                                                <td className="px-6 py-4 text-center">
                                                    <Gestor
                                                        gestor={gestor}
                                                        removeGestor={() => removeGestorItem(gestor.id)}
                                                        editGestor={editGestorItem}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400 italic">
                                                Nenhum gestor encontrado.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                    <div className="px-6 py-4 bg-gray-50 dark:!bg-slate-800 border-t border-gray-100 dark:border-slate-700 text-sm text-gray-600 dark:!text-gray-300">
                        Total de gestores: <span className="font-bold text-gray-900 dark:!text-white ml-1">{filteredGestors.length}</span>
                    </div>
                </div>
            </main>
        </div>
    );
}
