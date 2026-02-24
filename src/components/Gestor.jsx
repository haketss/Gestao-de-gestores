import React, { useState, memo } from "react";
import { useForm } from "react-hook-form";
import { Input } from "./Input";

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

export const Gestor = memo(function Gestor({ gestor, editGestor: onEdit, removeGestor: onRemove }) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        defaultValues: {
            nomeGestor: gestor.nome,
            sobrenomeGestor: gestor.sobrenome,
            generoGestor: gestor.genero,
            idadeGestor: gestor.idade,
            dataDeNascimentoGestor: gestor.dataDeNascimento ? gestor.dataDeNascimento.split('T')[0] : "",
            localDeTrabalhoGestor: gestor.localDeTrabalho,
            CRMGestor: gestor.CRM,
            tipoDeContratoGestor: gestor.tipoDeContrato,
            formacaoGestor: gestor.formacao,
            senhaProvisoriaGestor: gestor.senhaProvisoria,
            metasGestor: gestor.metas,
            atendimentosGestor: gestor.atendimentos,
            ePGesor: gestor.eventosP
        }
    });

    const handleEdit = async (data) => {
        try {
            await onEdit({ ...data, id: gestor.id });
            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Error editing gestor:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await onRemove();
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error("Error deleting gestor:", error);
        }
    };

    return (
        <div className="flex space-x-2">
            <button
                onClick={() => setIsEditModalOpen(true)}
                className="flex items-center px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg transition-colors text-sm font-medium"
            >
                <EditIcon />
                <span className="ml-1">Editar</span>
            </button>
            <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="flex items-center px-3 py-1.5 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-lg transition-colors text-sm font-medium"
            >
                <TrashIcon />
                <span className="ml-1">Apagar</span>
            </button>



            {/* Delete Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-6 shadow-2xl scale-in-center border dark:border-slate-800">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">Excluir Gestor</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                            Tem certeza que deseja apagar o gestor <span className="font-bold">{gestor.nome}</span>?
                            <span className="block text-red-500 dark:text-red-400 text-sm mt-1">Esta ação não pode ser desfeita.</span>
                        </p>
                        <div className="flex space-x-3">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors font-medium"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center"
                            >
                                <TrashIcon />
                                <span className="ml-2">Excluir</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-50 overflow-y-auto">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full p-8 shadow-2xl my-8 border dark:border-slate-800">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Editar Gestor: {gestor.nome}</h3>
                            <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit(handleEdit)} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Nome"
                                    name="nomeGestor"
                                    error={errors.nomeGestor}
                                    validations={register("nomeGestor", { required: "Nome é obrigatório" })}
                                />
                                <Input
                                    label="Sobrenome"
                                    name="sobrenomeGestor"
                                    error={errors.sobrenomeGestor}
                                    validations={register("sobrenomeGestor", { required: "Sobrenome é obrigatório" })}
                                />
                                <Input
                                    label="Gênero"
                                    name="generoGestor"
                                    error={errors.generoGestor}
                                    validations={register("generoGestor", { required: "Gênero é obrigatório" })}
                                />
                                <Input
                                    label="Idade"
                                    type="number"
                                    name="idadeGestor"
                                    error={errors.idadeGestor}
                                    validations={register("idadeGestor", { required: "Idade é obrigatório" })}
                                />
                                <Input
                                    label="Data de Nascimento"
                                    type="date"
                                    name="dataDeNascimentoGestor"
                                    error={errors.dataDeNascimentoGestor}
                                    validations={register("dataDeNascimentoGestor", { required: "Data é obrigatória" })}
                                />
                                <Input
                                    label="Local de Trabalho"
                                    name="localDeTrabalhoGestor"
                                    error={errors.localDeTrabalhoGestor}
                                    validations={register("localDeTrabalhoGestor", { required: "Local é obrigatório" })}
                                />
                                <Input
                                    label="CRM"
                                    name="CRMGestor"
                                    error={errors.CRMGestor}
                                    validations={register("CRMGestor", { required: "CRM é obrigatório" })}
                                />
                                <Input
                                    label="Tipo de Contrato"
                                    name="tipoDeContratoGestor"
                                    error={errors.tipoDeContratoGestor}
                                    validations={register("tipoDeContratoGestor", { required: "Tipo de contrato é obrigatório" })}
                                />
                                <Input
                                    label="Formação"
                                    name="formacaoGestor"
                                    error={errors.formacaoGestor}
                                    validations={register("formacaoGestor", { required: "Formação é obrigatória" })}
                                />
                                <Input
                                    label="Metas"
                                    type="number"
                                    name="metasGestor"
                                    error={errors.metasGestor}
                                    validations={register("metasGestor", { required: "Metas é obrigatório" })}
                                />
                                <Input
                                    label="Atendimentos"
                                    type="number"
                                    name="atendimentosGestor"
                                    error={errors.atendimentosGestor}
                                    validations={register("atendimentosGestor", { required: "Atendimentos é obrigatório" })}
                                />
                                <Input
                                    label="Eventos a comparecer"
                                    name="ePGesor"
                                    error={errors.ePGesor}
                                    validations={register("ePGesor")}
                                />
                            </div>

                            <div className="flex justify-end space-x-3 mt-8 pt-4 border-t border-gray-100 dark:border-slate-800">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-6 py-2 border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors font-medium"
                                >
                                    Fechar
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium"
                                >
                                    Salvar Alterações
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
});
