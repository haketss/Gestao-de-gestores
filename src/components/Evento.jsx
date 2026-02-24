import { useForm } from "react-hook-form";
import { Input } from "./Input";
import { Modal } from "./Modal";
import { useState, memo } from "react";

const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

export const Evento = memo(function Evento(props) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [result, setResult] = useState(null);

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        defaultValues: {
            nomeEvento: props.evento.nome,
            dataEvento: props.evento.data,
            adendoEvento: props.evento.adendo,
        }
    });

    async function handleEdit(data) {
        try {
            await props.editEvento({ ...data, id: props.evento.id });
            setIsEditModalOpen(false);
            setResult({
                title: "Sucesso!",
                message: "O evento foi atualizado corretamente."
            });
        } catch (error) {
            console.error("Error editing event:", error);
            setResult({
                title: "Erro!",
                message: "Erro ao atualizar o evento."
            });
        }
    }

    async function handleDelete() {
        try {
            await props.removeEvento();
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error("Error removing event:", error);
            setResult({
                title: "Erro!",
                message: "Houve um problema ao remover o evento."
            });
        }
    }

    function formatarData(dataString) {
        if (!dataString) return "Indefinida";
        const data = new Date(dataString);
        const dia = data.getDate().toString().padStart(2, "0");
        const mes = (data.getMonth() + 1).toString().padStart(2, "0");
        const ano = data.getFullYear();
        const horas = data.getHours().toString().padStart(2, "0");
        const minutos = data.getMinutes().toString().padStart(2, "0");
        return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
    }

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden hover:shadow-md transition-shadow">
            <img
                className="w-full h-40 object-cover"
                src={`https://picsum.photos/400/200?random=${props.evento.id || 1}`}
                alt="Evento"
            />
            <div className="p-6">
                <h3 className="text-xl font-bold text-blue-900 dark:text-blue-400 mb-2 truncate">
                    {props.evento.nome}
                </h3>

                <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium text-gray-900 dark:text-white mr-2">Data:</span>
                        {formatarData(props.evento.data)}
                    </div>
                    {props.evento.adendo && (
                        <div className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                            <svg className="w-4 h-4 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                            <div>
                                <span className="font-medium text-gray-900 dark:text-white mr-2">Adendo:</span>
                                <span className="italic">"{props.evento.adendo}"</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex space-x-2">
                    <button
                        onClick={() => setIsEditModalOpen(true)}
                        className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg transition-colors text-sm font-semibold"
                    >
                        <EditIcon />
                        <span className="ml-2">Editar</span>
                    </button>
                    <button
                        onClick={() => setIsDeleteModalOpen(true)}
                        className="flex-1 flex items-center justify-center px-4 py-2 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-lg transition-colors text-sm font-semibold"
                    >
                        <TrashIcon />
                        <span className="ml-2">Apagar</span>
                    </button>
                </div>
            </div>

            <Modal
                show={result}
                title={result?.title}
                message={result?.message}
                handleClose={() => setResult(null)}
            />

            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-8 shadow-2xl border dark:border-slate-800">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Editar Evento</h3>
                            <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(handleEdit)} className="space-y-4">
                            <Input
                                label="Nome do Evento"
                                placeholder="Insira o nome"
                                error={errors.nomeEvento}
                                validations={register("nomeEvento", { required: "Nome do evento é obrigatório." })}
                            />
                            <Input
                                label="Data do Evento"
                                type="datetime-local"
                                error={errors.dataEvento}
                                validations={register("dataEvento", { required: "Data é obrigatória." })}
                            />
                            <Input
                                label="Adendo e Informações"
                                placeholder="Observações..."
                                error={errors.adendoEvento}
                                validations={register("adendoEvento", { required: "Adendo é obrigatório." })}
                            />
                            <div className="flex justify-end space-x-3 mt-8">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-4 py-2 text-gray-600 dark:text-gray-400 font-medium hover:text-gray-800 dark:hover:text-gray-200"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-900 text-white rounded-xl hover:bg-blue-800 transition-colors font-bold"
                                >
                                    Salvar Alterações
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-6 shadow-2xl text-center border dark:border-slate-800">
                        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
                            <TrashIcon />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Excluir Evento</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Tem certeza que deseja apagar o evento <span className="font-bold">"{props.evento.nome}"</span>? Esta ação não pode ser desfeita.
                        </p>
                        <div className="flex space-x-3">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                            >
                                Confirmar Exclusão
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
});
