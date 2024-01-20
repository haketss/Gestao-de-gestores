import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "./Input";
import {
    Button,
    Form,
    Modal   
} from "react-bootstrap";



export function Gestor(props) {
    const [isUpdated, setIsUpdated] = useState(false);
    const [isEventoP, setIsEvendoP] = useState(false);
    const [modalTest, setModalTest] = useState(false);
  

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();


    async function editGestor(data) {
        await props.editGestor({ ...data, id: props.gestor.id });

        // Adiciona um alerta para informar que o gestor foi alterado com sucesso
        alert("O gestor foi alterado com sucesso!");

        setIsUpdated(false);
    }
   
    
    async function confirmDelete() {
        const result = window.confirm("Tem certeza de que deseja excluir?");
        if (result) {
            await props.removeGestor();
            setModalTest(false);
        }
    }
    


    return (
        <>
            <td>
                <Button
                    id="editeedele"
                    variant="secondary"
                    onClick={() => setIsUpdated(true)}
                >
                    Editar
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="33"
                        height="33"
                        fill="currentColor"
                        class="bi bi-pen"
                        viewBox="0 0 16 16"
                    >
                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                    </svg>
                </Button>
            </td>
            <td>
                <Button
                    id="editeedelet"
                    variant="outline-danger"
                    className="ms-3"
                    onClick={() => setModalTest(true)}
                >
                    Apagar
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="31"
                        height="31"
                        fill="currentColor"
                        class="bi bi-trash"
                        viewBox="0 0 16 16"
                    >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                    </svg>
                </Button>

            </td>
            <td>
                <Button
                    id="editeedele"
                    variant="secondary"
                    onClick={() => setIsEvendoP(true)}
                >
                    né
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="33"
                        height="33"
                        fill="currentColor"
                        class="bi bi-pen"
                        viewBox="0 0 16 16"
                    >
                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                    </svg>
                </Button>
                 </td>

            <Modal show={modalTest} onHide={() => setModalTest(false)}>
                <Modal.Header class="text-center" >
                    <Modal.Title >Excluir gestor</Modal.Title>
                </Modal.Header>
                <Modal.Body class="text-center m-3 ">
                    Tem certeza que deseja apagar o gestor: <strong >{props.gestor.nome}</strong>

                </Modal.Body>
                <Modal.Body class="text-center m-3">
                    Essa alteração apagara definitivamente este gestor, para colocado de volta sera necessario recadastralo.
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        id="editeedelet"
                        variant="outline-danger"
                        className="ms-3"
                        onClick={confirmDelete}
                    >
                        Apagar
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="31"
                            height="31"
                            fill="currentColor"
                            class="bi bi-trash"
                            viewBox="0 0 16 16"
                        >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                        </svg>
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => setModalTest(false)}
                    >
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={isEventoP} onHide={() => setIsEvendoP(false)}>
                <Modal.Header>
                    <Modal.Title>
                        Editar Eventos a comparecer: {props.gestor.nome}
                    </Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(editGestor)}>
                    <Modal.Body>

                        <Input
                            className="mb-3"
                            type="text"
                            defaultValue={props.gestor.ePGesor}
                            label="Eventos a comparecer"
                            placeholder=""
                            required={true}
                            name="eventosPGesor"
                            error={errors.ePGesor}
                            validations={register("ePGesor", {
                                required: {
                                    value: true,
                                    message: "Atribua um evento",
                                },
                            })}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Editar
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => setIsEvendoP(false)}
                        >
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
                <Modal.Header>
                    <Modal.Title>
                        Editar gestores: {props.gestor.nome}
                    </Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(editGestor)}>
                    <Modal.Body>
                        <td>
                            {" "}
                            <Input
                                className="mb-3"
                                type="text"
                                defaultValue={props.gestor.nome}
                                label="Nome do Gestor"
                                placeholder=""
                                required={true}
                                name="nomeGestor"
                                error={errors.nomeGestor}
                                validations={register("nomeGestor", {
                                    required: {
                                        value: true,
                                        message: "Nome do  é obrigatório.",
                                    },
                                })}
                            />
                        </td>
                        <td>
                            <Input
                                className="mb-3"
                                type="text"
                                defaultValue={props.gestor.sobrenome}
                                label=" sobrenome"
                                placeholder=""
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
                        </td>
                        <br />
                        <td>
                            {" "}
                            <Input
                                className="mb-3"
                                type="text"
                                defaultValue={props.gestor.genero}
                                label="genero"
                                placeholder=""
                                required={true}
                                name="generoGestor"
                                error={errors.generoGestor}
                                validations={register("generoGestor", {
                                    required: {
                                        value: true,
                                        message:
                                            "genero do gestor é obrigatório.",
                                    },
                                })}
                            />
                        </td>
                        <td>
                            {" "}
                            <Input
                                className="mb-3"
                                type="INTEGER"
                                defaultValue={props.gestor.idade}
                                label="idade"
                                placeholder=""
                                required={true}
                                name="idadeGestor"
                                error={errors.idadeGestor}
                                validations={register("idadeGestor", {
                                    required: {
                                        value: true,
                                        message:
                                            "idade do gestor é obrigatório.",
                                    },
                                })}
                            />
                        </td>
                        <br />
                        <td>
                            <Input
                                className="mb-3"
                                type="date"
                                defaultValue={props.gestor.dataDeNascimento}
                                label="Data de nacimento"
                                placeholder=""
                                required={true}
                                name="dataDeNascimentoGestor"
                                error={errors.dataDeNascimentoGestor}
                                validations={register(
                                    "dataDeNascimentoGestor",
                                    {
                                        required: {
                                            value: true,
                                            message:
                                                "Data de nacimento do gestor é obrigatório.",
                                        },
                                    }
                                )}
                            />
                        </td>
                        <td>
                            {" "}
                            <Input
                                className="mb-3"
                                type="text"
                                defaultValue={props.gestor.localDeTrabalho}
                                label="local De Trabalho"
                                placeholder=""
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
                        </td>
                        <br />
                        <td>
                            <Input
                                className="mb-3"
                                type="text"
                                defaultValue={props.gestor.CRM}
                                label="CRM"
                                placeholder=""
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
                        </td>
                        <td>
                            <Input
                                className="mb-3"
                                type="text"
                                defaultValue={props.gestor.tipoDeContrato}
                                label=" tipo De Contrato"
                                placeholder=""
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
                        </td>
                        <br />
                        <td>
                            <Input
                                className="mb-3"
                                type="text"
                                defaultValue={props.gestor.formacao}
                                label="Formação"
                                placeholder=""
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
                        </td>
                        <td>
                            {" "}
                            <Input
                                className="mb-3"
                                type="text"
                                defaultValue={props.gestor.senhaProvisoria}
                                label="senha Provisoria"
                                placeholder=""
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
                        </td>
                        <td>
                            <Input
                                className="mb-3"
                                type="text"
                                defaultValue={props.gestor.metas}
                                label="Metas"
                                placeholder=""
                                required={true}
                                name="metasGestor"
                                error={errors.metasGestor}
                                validations={register("metasGestor", {
                                    required: {
                                        value: true,
                                        message:
                                            "Senha Provisoria do gestor é obrigatório.",
                                    },
                                })}
                            />
                        </td>
                        <Input
                            className="mb-3"
                            type="text"
                            defaultValue={props.gestor.atendimentos}
                            label="atendimentos"
                            placeholder=""
                            required={true}
                            name="atendimentosGestor"
                            error={errors.atendimentosGestor}
                            validations={register("atendimentosGestor", {
                                required: {
                                    value: true,
                                    message:
                                        "atendimentos do gestor é obrigatório.",
                                },
                            })}
                        />

                        <td>

                        </td>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Editar
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => setIsUpdated(false)}
                        >
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>



        </>
    );
}
