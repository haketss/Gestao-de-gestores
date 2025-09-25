import { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
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
            navigate("/dashbord");
        } catch (error) {
            setResult({
                title: "Houve um erro no login!",
                message: error.response.data.error,
            });
        }
    };

    return (
        <>
            <Bar />
            <p className="align-middle" id="barraColorida">a</p>
            <Container className=" border-dark border-top border-bottom border-5 ">
                <Modal
                    noValidate
                    validated={!!errors}
                    onSubmit={handleSubmit(onSubmit)}
                />

                <Form
                    id="form"
                    noValidate
                    validated={!!errors}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <img
                        id="imagemDeLogin"
                        alt="qualquer coisa"
                        src="https://th.bing.com/th/id/OIG.jGSf7n01LudSawMKjyjW?w=1024&h=1024&rs=1&pid=ImgDetMain"
                        width={200}
                    ></img>

                    <Col
                        id="inputs"
                        className=".bg-white  p-5 m-auto novalidate border-top-style:"
                    >
                        E-mail:
                        <Input
                            className="mx-alto"
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
                        Senha:{result}
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
                        <p id="criar-3">Esqueceu a senha?</p>
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
                            <p id="criar-2">Ou crie uma conta  <Link  className="text-center" to="/register">
                                aqui!
                            </Link></p>
                           
                        </div>
                    </Col>
                </Form>
                <br />
            </Container>
            <Container>
                {" "}
                <label id="subtitulo">
                    <p className="text-center">
                        <strong>Referência: Silva, Joana.</strong>
                        <br />
                         "Inovações na Gestão Hospitalar: Um Estudo
                        de Caso". Revista de Saúde e Tecnologia, 15 de abril de
                        2023. Disponível em: [URL fictício].
                    </p>
                    <p className="text-center">
                        <strong>Contato: Hospital Esperança</strong>
                        <br />
                        Endereço: Rua Flores, 123, Bairro
                        Saúde, Cidade Feliz, Estado Feliz, CEP 12345-678
                        Telefone: (012) 3456-7890 E-mail:
                        contato@hospital-esperanca.com Website:
                        www.hospital-esperanca.com.br
                    </p>
                </label>
            </Container>
        </>
    );
}
