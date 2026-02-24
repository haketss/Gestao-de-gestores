import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import { Input } from "../components/Input";
import { Bar } from "../components/bar";
import { createGestor } from "../services/gestor-service";
import { Modal } from "../components/Modal";
import { useState } from "react";

export function GestorsE() {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    const addGestor = useCallback(async (data) => {
        try {
            await createGestor(data);
            setResult({
                title: "Sucesso!",
                message: "O gestor foi cadastrado corretamente no sistema."
            });
            setTimeout(() => {
                navigate("/gestors");
            }, 2000);
        } catch (error) {
            console.error("Error creating gestor:", error);
            setResult({
                title: "Erro!",
                message: "Não foi possível cadastrar o gestor."
            });
        }
    }, [navigate]);

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
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Cadastrar Gestor</h2>
                            <p className="text-gray-500 dark:text-gray-400 mt-1">Insira as informações do profissional abaixo</p>
                        </div>
                        <Link
                            to="/gestors"
                            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 flex items-center text-sm font-medium transition-colors"
                        >
                            <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Voltar para lista
                        </Link>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-800 transition-colors duration-300">
                        <form onSubmit={handleSubmit(addGestor)} className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Seção: Informações Pessoais */}
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-slate-800 pb-2">Informações Pessoais</h3>
                                    <Input
                                        type="text"
                                        label="Nome do gestor"
                                        placeholder="Nome"
                                        error={errors.nomeGestor}
                                        validations={register("nomeGestor", { required: "Nome do gestor é obrigatório." })}
                                    />
                                    <Input
                                        type="text"
                                        label="Sobrenome"
                                        placeholder="Sobrenome"
                                        error={errors.sobrenomeGestor}
                                        validations={register("sobrenomeGestor", { required: "Sobrenome do gestor é obrigatório." })}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            type="number"
                                            label="Idade"
                                            placeholder="Ex: 35"
                                            error={errors.idadeGestor}
                                            validations={register("idadeGestor", { required: "Idade é obrigatória." })}
                                        />
                                        <Input
                                            type="text"
                                            label="Gênero"
                                            placeholder="Ex: Masculino"
                                            error={errors.generoGestor}
                                            validations={register("generoGestor", { required: "Gênero é obrigatório." })}
                                        />
                                    </div>
                                    <Input
                                        type="date"
                                        label="Data de Nascimento"
                                        error={errors.dataDeNascimentoGestor}
                                        validations={register("dataDeNascimentoGestor", { required: "Data de nascimento é obrigatória." })}
                                    />
                                </div>

                                {/* Seção: Informações Profissionais */}
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-slate-800 pb-2">Informações Profissionais</h3>
                                    <Input
                                        type="text"
                                        label="Local de Trabalho"
                                        placeholder="Hospital / Clínica"
                                        error={errors.localDeTrabalhoGestor}
                                        validations={register("localDeTrabalhoGestor", { required: "Local de trabalho é obrigatório." })}
                                    />
                                    <Input
                                        type="text"
                                        label="CRM"
                                        placeholder="000000-XX"
                                        error={errors.CRMGestor}
                                        validations={register("CRMGestor", { required: "CRM do gestor é obrigatório." })}
                                    />
                                    <Input
                                        type="text"
                                        label="Tipo de Contrato"
                                        placeholder="CLT, PJ, etc"
                                        error={errors.tipoDeContratoGestor}
                                        validations={register("tipoDeContratoGestor", { required: "Tipo de contrato é obrigatório." })}
                                    />
                                    <Input
                                        type="text"
                                        label="Formação"
                                        placeholder="Especialidade"
                                        error={errors.formacaoGestor}
                                        validations={register("formacaoGestor", { required: "Formação é obrigatória." })}
                                    />
                                </div>

                                {/* Seção: Metas e Acesso */}
                                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                                    <div className="md:col-span-3">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-slate-800 pb-2">Metas e Acesso</h3>
                                    </div>
                                    <Input
                                        type="password"
                                        label="Senha Provisória"
                                        error={errors.senhaProvisoriaGestor}
                                        validations={register("senhaProvisoriaGestor", { required: "Senha provisória é obrigatória." })}
                                    />
                                    <Input
                                        type="number"
                                        label="Meta de Atendimentos"
                                        placeholder="Ex: 50"
                                        error={errors.metasGestor}
                                        validations={register("metasGestor", { required: "Meta é obrigatória." })}
                                    />
                                    <Input
                                        type="number"
                                        label="Atendimentos Realizados"
                                        placeholder="Ex: 0"
                                        error={errors.atendimentosGestor}
                                        validations={register("atendimentosGestor", { required: "Atendimentos realizados é obrigatório." })}
                                    />
                                </div>
                            </div>

                            <div className="mt-10 flex items-center justify-end space-x-4 border-t border-gray-100 dark:border-slate-800 pt-8">
                                <Link
                                    to="/gestors"
                                    className="px-6 py-2.5 border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors font-medium"
                                >
                                    Cancelar
                                </Link>
                                <button
                                    type="submit"
                                    className="px-8 py-2.5 bg-blue-900 text-white rounded-xl hover:bg-blue-800 shadow-lg shadow-blue-900/20 transition-all font-bold text-lg"
                                >
                                    Cadastrar Gestor
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
