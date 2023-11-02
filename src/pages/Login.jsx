import { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import "../index.css";
import { Input } from "../components/Input";
import { Bar } from "../components/barlogin";

 

import { loginUser } from "../services/user-services";

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
            navigate("/dashbord");
        } catch (error) {
            setResult({
                title: "Houve um erro no login!",
                message: error.response.data.error,
            });
        }
    };

    return (
        <Container className="mt-2">
          <Bar />
          
            <Container>
                <Form
                    id="form"
                    noValidate
                    validated={!!errors}
                    onSubmit={handleSubmit(onSubmit)}
                ><img src="https://th.bing.com/th/id/OIG.4F7FJQwjdZKK6AGooVVj?pid=ImgGn" width={200}></img>
            
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
                        <lu id="criar-2">Esqueceu a senha?</lu>
                        <div className="d-flex justify-content-between">
                            <Button
                                id="entrar"
                                className="shadow"
                                type="submit"
                            >
                                Entrar
                            </Button>
                        </div>
                        <div>
                            <a id="criar-2">Ou crie uma conta</a>
                            <Link id="criar" to="/register">
                                aqui!
                            </Link>
                        </div>
                    </Col>
                </Form>
            </Container>
        </Container>
    );
}
