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
            <p class="align-middle" id="barraColorida">a</p>
            <Container class=" border-dark border-top border-bottom border-5 ">
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
                        src="https://th.bing.com/th/id/OIG.4F7FJQwjdZKK6AGooVVj?pid=ImgGn"
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
                            <Button
                                id="entrar"
                                className="shadow"
                                type="submit"
                            >
                                Entrar
                            </Button>
                        </div>
                        <div>
                            <a id="criar-2">Ou crie uma conta </a>
                            <Link  class="text-center" to="/register">
                                aqui!
                            </Link>
                        </div>
                    </Col>
                </Form>
                <br />
            </Container>
            <Container>
                {" "}
                <label id="subtitulo">
                    <p class="text-center">
                        <strong>Referência: Silva, Joana.</strong>
                        <br />
                         "Inovações na Gestão Hospitalar: Um Estudo
                        de Caso". Revista de Saúde e Tecnologia, 15 de abril de
                        2023. Disponível em: [URL fictício].
                    </p>
                    <p class="text-center">
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
