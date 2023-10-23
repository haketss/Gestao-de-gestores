import { Container, Col, Modal, Form, Button } from "react-bootstrap";

import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import "../index.css";

import { Input } from "../components/Input";
import { Bar } from "../components/bar";

import { createGestor, getGestors } from "../services/gestor-service";

export function GestorsE() {
    const [gestors, setGestors] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        findGestors();
        // eslint-disable-next-line
    }, []);

    async function findGestors() {
        try {
            const result = await getGestors();
            setGestors(result.data);
        } catch (error) {
            console.error(error);
            navigate("/");
        }
    }

    async function addGestor(data) {
        try {
            await createGestor(data);

            // Adiciona um alerta para informar que o gestor foi criado com sucesso
            alert("O gestor foi criado com sucesso!");

            setIsCreated(false);
            await findGestors();
        } catch (error) {
            console.error(error);
        }
    }
    function showAlert() {
        alert("Gestor criado com sucesso!");
        setIsCreated(false); // Reinicia o estado para evitar alertas repetidos
    }

    return (
        <Container fluid>
            <Bar></Bar>
            <Container></Container> <Col id="botocria" md="10"></Col>
            {/* Formulário dentro do Modal, ideal seria componentizar também, pois é parecido com o Modal de editar */}
            <Container>
                <Modal.Header>
                    <Modal.Title>Cadastrar novo gestor</Modal.Title>
                </Modal.Header>
                <Form
                    noValidate
                    onSubmit={handleSubmit(addGestor)}
                    validated={!!errors}
                >
                    <Modal.Body>
                        <Input
                            className="mb-3"
                            type="text"
                            label="Nome do gestor"
                            placeholder="Insira o nome do gestor"
                            required={true}
                            name="nomeGestor"
                            error={errors.nomeGestor}
                            validations={register("nomeGestor", {
                                required: {
                                    value: true,
                                    message: "Nome do gestor é obrigatório.",
                                },
                            })}
                        />
                        <Input
                            className="mb-3"
                            type="text"
                            label=" sobrenome"
                            placeholder="Insira o nome do gestor"
                            required={true}
                            name="sobrenomeGestor"
                            error={errors.sobrenomeGestor}
                            validations={register("sobrenomeGestor", {
                                required: {
                                    value: true,
                                    message:
                                        "Sovrenome do gestor é obrigatório.",
                                },
                            })}
                        />
                        <Input
                            className="mb-3"
                            type="number"
                            label="idade"
                            placeholder="Insira o nome do gestor"
                            required={true}
                            name="idadeGestor"
                            error={errors.idadeGestor}
                            validations={register("idadeGestor", {
                                required: {
                                    value: true,
                                    message: "idade do gestor é obrigatório.",
                                },
                            })}
                        />
                        <Input
                            className="mb-3"
                            type="text"
                            label="genero"
                            placeholder="Insira o nome do gestor"
                            required={true}
                            name="generoGestor"
                            error={errors.generoGestor}
                            validations={register("generoGestor", {
                                required: {
                                    value: true,
                                    message: "genero do gestor é obrigatório.",
                                },
                            })}
                        />
                        <Input
                            className="mb-3"
                            type="date"
                            label="Data de nacimento"
                            placeholder="Insira o nome do gestor"
                            required={true}
                            name="dataDeNascimentoGestor"
                            error={errors.dataDeNascimentoGestor}
                            validations={register("dataDeNascimentoGestor", {
                                required: {
                                    value: true,
                                    message:
                                        "Data de nacimento do gestor é obrigatório.",
                                },
                            })}
                        />
                        <Input
                            className="mb-3"
                            type="text"
                            label="local De Trabalho"
                            placeholder="Insira o nome do gestor"
                            required={true}
                            name="localDeTrabalhoGestor"
                            error={errors.localDeTrabalhoGestor}
                            validations={register("localDeTrabalhoGestor", {
                                required: {
                                    value: true,
                                    message:
                                        "Local de trabalho do gestor é obrigatório.",
                                },
                            })}
                        />
                        <Input
                            className="mb-3"
                            type="number"
                            label="CRM"
                            placeholder="Insira o nome do gestor"
                            required={true}
                            name="CRMGestor"
                            error={errors.CRMGestor}
                            validations={register("CRMGestor", {
                                required: {
                                    value: true,
                                    message: "CRM do gestor é obrigatório.",
                                },
                            })}
                        />
                        <Input
                            className="mb-3"
                            type="text"
                            label=" tipo De Contrato"
                            placeholder="Insira o nome do gestor"
                            required={true}
                            name="tipoDeContratoGestor"
                            error={errors.tipoDeContratoGestor}
                            validations={register("tipoDeContratoGestor", {
                                required: {
                                    value: true,
                                    message:
                                        "Tipo de contrato do gestor é obrigatório.",
                                },
                            })}
                        />

                        <Input
                            className="mb-3"
                            type="text"
                            label="Formação"
                            placeholder="Insira o nome do gestor"
                            required={true}
                            name="formacaoGestor"
                            error={errors.formacaoGestor}
                            validations={register("formacaoGestor", {
                                required: {
                                    value: true,
                                    message:
                                        "Formação do gestor é obrigatório.",
                                },
                            })}
                        />
                        <Input
                            className="mb-3"
                            type="text"
                            label="senha Provisoria"
                            placeholder="Insira o nome do gestor"
                            required={true}
                            name="senhaProvisoriaGestor"
                            error={errors.senhaProvisoriaGestor}
                            validations={register("senhaProvisoriaGestor", {
                                required: {
                                    value: true,
                                    message:
                                        "Senha Provisoria do gestor é obrigatório.",
                                },
                            })}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Adicionar
                        </Button>
                        <Button variant="secondary">
                            <Link to="/gestors">voltar</Link>
                        </Button>
                    </Modal.Footer>
                </Form>
            </Container>
        </Container>
    );
}
