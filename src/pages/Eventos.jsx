import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Evento } from "../components/Evento";
import { Input } from "../components/Input";
import { Bar } from "../components/bar";
import { Modal } from "../components/Modal";
import {
    createEvento,
    deleteEvento,
    getEventos,
    updateEvento,
} from "../services/evento-service";
import { getGestors } from "../services/gestor-service";

export function Eventos() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [eventos, setEventos] = useState([]);
    const [gestors, setGestors] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState(null);

    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset
    } = useForm();

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const [eventosRes, gestorsRes] = await Promise.all([
                getEventos(),
                getGestors()
            ]);
            setEventos(eventosRes.data || []);
            setGestors(gestorsRes.data || []);
        } catch (error) {
            console.error("Error fetching events data:", error);
            navigate("/");
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, []);

    const removeEvento = useCallback(async (id) => {
        try {
            await deleteEvento(id);
            setEventos(prev => prev.filter(e => e.id !== id));
            setResult({
                title: "Excluído!",
                message: "O evento foi removido com sucesso."
            });
        } catch (error) {
            console.error("Error removing event:", error);
            setResult({
                title: "Erro!",
                message: "Não foi possível remover o evento."
            });
        }
    }, []);

    const addEvento = useCallback(async (data) => {
        try {
            await createEvento(data);
            setIsAddModalOpen(false);
            reset();
            await fetchData();
            setResult({
                title: "Criado!",
                message: "O novo evento foi agendado com sucesso."
            });
        } catch (error) {
            console.error("Error creating event:", error);
            setResult({
                title: "Erro!",
                message: "Falha ao criar o evento."
            });
        }
    }, [fetchData, reset]);

    const editEvento = useCallback(async (data) => {
        try {
            await updateEvento({
                id: data.id,
                nomeEvento: data.nomeEvento,
                dataEvento: data.dataEvento,
                adendoEvento: data.adendoEvento,
            });
            await fetchData();
            setResult({
                title: "Atualizado!",
                message: "As informações do evento foram salvas."
            });
        } catch (error) {
            console.error("Error editing event:", error);
            setResult({
                title: "Erro!",
                message: "Não foi possível atualizar o evento."
            });
        }
    }, [fetchData]);

    const filteredEventos = useMemo(() => {
        return eventos.filter((evento) =>
            (evento.nome || "").toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [eventos, searchTerm]);

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
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Eventos e Reuniões</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Gerencie o cronograma de atividades</p>
                    </div>

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

                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="inline-flex items-center justify-center px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium shadow-sm"
                        >
                            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Novo Evento
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-900 dark:border-blue-500"></div>
                    </div>
                ) : (
                    <>
                        {filteredEventos.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredEventos.map((evento) => (
                                    <Evento
                                        key={evento.id}
                                        evento={evento}
                                        removeEvento={() => removeEvento(evento.id)}
                                        editEvento={editEvento}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-gray-300 dark:border-slate-700 py-20 text-center">
                                <div className="mx-auto w-16 h-16 bg-gray-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-gray-400 dark:text-gray-500 mb-4">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <p className="text-gray-500 dark:text-gray-400 font-medium">Nenhum evento encontrado.</p>
                            </div>
                        )}
                    </>
                )}
            </main>

            {/* Add Event Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 transition-opacity">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-8 shadow-2xl transform transition-all border dark:border-slate-800">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Novo Evento</h3>
                            <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(addEvento)} className="space-y-4">
                            <Input
                                label="Nome do Evento"
                                placeholder="Ex: Reunião de Alinhamento"
                                error={errors.nomeEvento}
                                validations={register("nomeEvento", { required: "Nome do evento é obrigatório." })}
                            />
                            <Input
                                label="Data e Hora"
                                type="datetime-local"
                                error={errors.dataEvento}
                                validations={register("dataEvento", { required: "Data e hora são obrigatórias." })}
                            />
                            <Input
                                label="Adendo"
                                placeholder="Notas adicionais..."
                                error={errors.adendoEvento}
                                validations={register("adendoEvento", { required: "Adendo é obrigatório." })}
                            />

                            <div className="space-y-1">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Selecione o Gestor</label>
                                <select
                                    {...register("idGestor")}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white dark:bg-slate-800 text-gray-900 dark:text-white transition-colors"
                                >
                                    <option value="">Selecione um gestor</option>
                                    {gestors.map((gestor) => (
                                        <option key={gestor.id} value={gestor.id}>
                                            {gestor.nome} {gestor.sobrenome}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex justify-end space-x-3 mt-8 pt-4 border-t border-gray-100 dark:border-slate-800">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-4 py-2 text-gray-600 dark:text-gray-400 font-medium hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-8 py-2 bg-blue-900 text-white rounded-xl hover:bg-blue-800 shadow-lg shadow-blue-900/20 transition-all font-bold"
                                >
                                    Criar Evento
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
