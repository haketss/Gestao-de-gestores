import { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import "../index.css";
import { Input } from "../components/Input";
//import { Header } from '../components/Header';
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
        <Container className="mt-5">
            <Bar />
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
