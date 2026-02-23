import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import "../index.css";
import { Input } from "../components/Input";
import { Modal } from "../components/Modal";
import { Bar } from "../components/barlogin";

import { registerUser } from "../services/user-services";

export function Register() {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const user = await registerUser(data);
            setResult(user);
            navigate("/dashboard");
        } catch (error) {
            setResult({
                title: "Houve um erro no cadastro!",
                message: error.response?.data?.error || "Erro desconhecido",
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Bar />

            <main className="flex-grow flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <div className="mx-auto h-32 w-32 rounded-full shadow-lg bg-blue-50 flex items-center justify-center mb-4 border-4 border-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-16 w-16 text-blue-900"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.5}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Crie sua conta</h2>
                            <p className="text-gray-500 mt-2">Junte-se a nós para gerenciar seus gestores</p>
                        </div>

                        <Modal
                            show={result}
                            title={result?.title}
                            message={result?.message}
                            handleClose={() => setResult(null)}
                        />

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <Input
                                type="text"
                                placeholder="E-mail"
                                label="Seu melhor e-mail"
                                error={errors.email}
                                required={true}
                                name="email"
                                validations={register("email", {
                                    required: {
                                        value: true,
                                        message: "E-mail é obrigatório",
                                    },
                                    pattern: {
                                        value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
                                        message: "E-mail inválido!",
                                    },
                                })}
                            />

                            <Input
                                type="password"
                                placeholder="Senha"
                                label="Crie uma senha forte"
                                error={errors.password}
                                required={true}
                                name="password"
                                validations={register("password", {
                                    required: {
                                        value: true,
                                        message: "Senha é obrigatório",
                                    },
                                })}
                            />

                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                            >
                                Criar Conta
                            </button>

                            <div className="text-center mt-6">
                                <p className="text-sm text-gray-600">
                                    Já tem uma conta?{" "}
                                    <Link to="/" className="font-medium text-blue-600 hover:text-blue-500">
                                        Faça login aqui
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            <footer className="bg-white border-t border-gray-200 py-8 px-4">
                <div className="max-w-4xl mx-auto space-y-6">
                    <div className="text-center text-sm text-gray-600">
                        <p>
                            <strong>Referência: Silva, Joana.</strong>
                            <br />
                            "Inovações na Gestão Hospitalar: Um Estudo de Caso". Revista de Saúde e Tecnologia, 15 de abril de 2023.
                        </p>
                    </div>
                    <div className="text-center text-sm text-gray-600">
                        <p>
                            <strong>Contato: Hospital Esperança</strong>
                            <br />
                            Endereço: Rua Flores, 123, Bairro Saúde, Cidade Feliz, Estado Feliz, CEP 12345-678
                            <br />
                            Telefone: (012) 3456-7890 | E-mail: contato@hospital-esperanca.com
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
