import { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";



import "../index.css";
import { Input } from "../components/Input";
//import { Header } from '../components/Header';
import { Modal } from "../components/Modal";

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
            navigate("/dashbord");
        } catch (error) {
            setResult({
                title: "Houve um erro no cadastro!",
                message: error.response.data.error,
            });
        }
    };

    return (
        <Container className="mt-5">
            <Modal
                show={result}
                title={result?.title}
                message={result?.message}
                handleClose={() => setResult(null)}
            />
            <bar></bar>

            <nav id="bar" class="navbar p-3 navbar-expand-md fixed-top ">
                <a class="navbar-brand" href="#"></a>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarCollapse"
                    aria-controls="navbarCollapse"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <a
                                id="item-1"
                                class="nav-link disabled"
                                className="  m-custon {"
                                href="#"
                            >
                                Bom dia,
                            </a>
                            <a
                                id="corrPrincipal"
                                class="nav-link disabled"
                                className="  m-custon"
                                href="#"
                            >
                                entre com a sua conta
                            </a>{" "}
                            <svg
                                id="corPrincipal"
                                xmlns="http://www.w3.org/2000/svg"
                                width="42"
                                height="42"
                                fill="currentColor"
                                class="bi bi-translate"
                                viewBox="0 0 16 16"
                            >
                                <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286H4.545zm1.634-.736L5.5 3.956h-.049l-.679 2.022H6.18z" />
                                <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2zm7.138 9.995c.193.301.402.583.63.846-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6.066 6.066 0 0 1-.415-.492 1.988 1.988 0 0 1-.94.31z" />
                            </svg>
                        </li>
                    </ul>
                </div>
            </nav>
            <Form
                id="form"
                noValidate
                validated={!!errors}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Col className=".bg-white  p-5 m-auto novalidate border-top-style:">
                    E-mail:
                    <Input
                        className="m-1 shadow"
                        id="inputs"
                        type="text"
                        placeholder="Insira seu e-mail"
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
                    Senha:
                    <Input
                        className="m-1 shadow"
                        id="inputs"
                        type="password"
                        placeholder="Insira sua senha"
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
                    <lu id="criar-3">Esqueceu a senha?</lu>
                    <div className="d-flex justify-content-between">
                        <Button id="entrar" type="submit">
                            Criar
                        </Button>
                    </div>{" "}
                    <Link id="criar-2" to="/">
                        Já tenho minha conta
                    </Link>
                </Col>
            </Form>
        </Container>
    );
}
