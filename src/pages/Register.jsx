import { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
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
            navigate("/dashbord");
        } catch (error) {
            setResult({
                title: "Houve um erro no cadastro!",
                message: error.response.data.error,
            });
        }
    };

    return (
        <>
            <Bar />
            <p className="align-middle" id="barraColorida">a</p>
            <Container >
                <Modal
                    show={result}
                    title={result?.title}
                    message={result?.message}
                    handleClose={() => setResult(null)}
                />
                <Form
                    id="form"
                    noValidate
                    validated={!!errors}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {" "}
                    <img
                        id="imagemDeLogin"
                        alt="qualquercoisa"
                        src="https://th.bing.com/th/id/OIG.jGSf7n01LudSawMKjyjW?w=1024&h=1024&rs=1&pid=ImgDetMain"
                        width={200}
                    ></img>
                    <Col
                        id="inputs"
                        className=".bg-white  p-5 m-auto novalidate border-top-style:"
                    >
                        E-mail:
                        <Input
                            className="m-1"
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
                <br />
            </Container>
            <Container>
            
                <label id="subtitulo">
                    <p class="text-center">
                        <strong>Referência: Silva, Joana.</strong>
                        <br />
                        "Inovações na Gestão Hospitalar: Um Estudo de Caso".
                        Revista de Saúde e Tecnologia, 15 de abril de 2023.
                        Disponível em: [URL fictício].
                    </p>
                    <p class="text-center">
                        <strong>Contato: Hospital Esperança</strong>
                        <br />
                        Endereço: Rua Flores, 123, Bairro Saúde, Cidade Feliz,
                        Estado Feliz, CEP 12345-678 Telefone: (012) 3456-7890
                        E-mail: contato@hospital-esperanca.com Website:
                        www.hospital-esperanca.com.br
                    </p>
                </label>
            </Container>
        </>
    );
}
