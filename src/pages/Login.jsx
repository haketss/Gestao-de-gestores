import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { Bar } from "../components/barlogin";
import "../index.css";
import { loginUser } from "../services/user-services";
import { Modal } from "../components/Modal";

export function Login() {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const user = await loginUser(data);
            setResult(user);
            navigate("/dashboard");
        } catch (error) {
            setResult({
                title: "Erro no login!",
                message: error.response?.data?.error || "E-mail ou senha incorretos",
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex flex-col transition-colors duration-300">
            <Bar />

            <main className="flex-grow flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white dark:!bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-800 transition-colors duration-300">
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <div className="mx-auto h-32 w-32 rounded-full shadow-lg bg-blue-50 dark:bg-slate-800 flex items-center justify-center mb-4 border-4 border-white dark:border-slate-700 transition-colors duration-300">
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
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Bem-vindo de volta</h2>
                            <p className="text-gray-500 dark:text-gray-400 mt-2">Acesse sua conta para gerenciar gestores</p>
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
                                label="Seu e-mail"
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
                                label="Sua senha"
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

                            <div className="flex items-center justify-between">
                                <div className="text-sm">
                                    <Link to="#" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors">
                                        Esqueceu a senha?
                                    </Link>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-900 dark:bg-blue-700 hover:bg-blue-800 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                            >
                                Entrar
                            </button>

                            <div className="text-center mt-6">
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Ainda não tem uma conta?{" "}
                                    <Link to="/register" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors">
                                        Registre-se aqui
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            <footer className="bg-white dark:!bg-slate-600 border-t border-gray-200 dark:border-slate-500 py-8 px-4 transition-colors duration-300">
                <div className="max-w-4xl mx-auto space-y-6">
                    <div className="text-center text-sm text-gray-600 dark:!text-white">
                        <p>
                            <strong>Referência: Silva, Joana.</strong>
                            <br />
                            "Inovações na Gestão Hospitalar: Um Estudo de Caso". Revista de Saúde e Tecnologia, 15 de abril de 2023.
                        </p>
                    </div>
                    <div className="text-center text-sm text-gray-600 dark:!text-white">
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
