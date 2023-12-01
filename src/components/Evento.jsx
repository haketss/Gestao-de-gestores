import { useForm } from "react-hook-form";
import { Input } from "./Input";
import { useState, useEffect  } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
    Nav,
    Button,
    Card,
    Container,
    Form,
    Modal,
    Table,
    Row,
    Dropdown,
} from "react-bootstrap";


export function Evento(props) {
    const [isUpdated, setIsUpdated] = useState(false);
    const [modalTest, setModalTest] = useState(false);
    const [gestors, setGestors] = useState([]);
    const [eventos, setEventos] = useState([]);
    const navigate = useNavigate();
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

  
    async function editEvento(data) {
        await props.editEvento({ ...data, id: props.evento.id });
        setIsUpdated(false);
    }

    async function confirmDelete() {
        confirmDelete = props.removeEvento();
    }
    function formatarData(dataString) {
        const data = new Date(dataString);

        // Obtém os componentes da data
        const dia = data.getDate().toString().padStart(2, "0");
        const mes = (data.getMonth() + 1).toString().padStart(2, "0"); // Mês é base 0
        const ano = data.getFullYear();
        const horas = data.getHours().toString().padStart(2, "0");
        const minutos = data.getMinutes().toString().padStart(2, "0");

        // Formata a data como "DD/MM/YYYY HH:mm"
        const dataFormatada = `${dia}/${mes}/${ano} ${horas}:${minutos}`;

        return dataFormatada;
    }

    return (
        <>
            <Card style={{ width: "18rem" }}>
                <Card.Img
                    variant="top"
                    src="https://i0.wp.com/multarte.com.br/wp-content/uploads/2019/01/fundo-3d-preta.png?fit=3840%2C2160&ssl=1"
                />
                <Card.Body>
                    <Card.Title id="chardssub">
                        <strong>Nome: </strong>
                        {props.evento.nome}
                    </Card.Title>
                    <Card.Text id="chardssub">
                        <strong>Data do evento: </strong>
                        {formatarData(props.evento.data)}
                    </Card.Text>
                    <Card.Text class="align-middle text-center" id="chardssub">
                        <strong>Adendo: </strong>
                        {props.evento.adendo}
                    </Card.Text>
                </Card.Body>
                <Row xs="auto" className="d-flex">
                    <Button id="botaodocard" onClick={() => setIsUpdated(true)}>
                        Editar
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="currentColor"
                            class="bi bi-pen"
                            viewBox="0 0 16 16"
                        >
                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                        </svg>
                    </Button>
                    <Button
                        id="botaodocarde"
                        variant="outline-danger"
                        className="ms-3"
                        onClick={() => setModalTest(true)}
                    >
                        Apagar
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="currentColor"
                            class="bi bi-trash"
                            viewBox="0 0 16 16"
                        >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                        </svg>
                    </Button>

                    <Modal show={modalTest} onHide={() => setModalTest(false)}>
                        {" "}
                        <Modal.Header>
                            <Modal.Title>Excluir evento</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Tem certeza que deseja apagar o evento: "
                            {props.evento.nome}"
                        </Modal.Body>
                        <Modal.Body>
                            Essa alteração apagara definitivamente este evento,
                            não sera possivel resltaura-lo.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={confirmDelete}>
                                Apagar
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => setModalTest(false)}
                            >
                                Fechar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Row>
            </Card>

            <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
                <Modal.Header>
                    <Modal.Title>
                        Editar evento: {props.evento.nome}
                    </Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(editEvento)}>
                    <Modal.Body>
                        <Input
                            className="mb-3"
                            type="text"
                            defaultValue={props.evento.nome}
                            label="Nome do Evento"
                            placeholder="Insira o nome do Evento"
                            required={true}
                            error={errors.nomeEvento}
                            validations={register("nomeEvento", {
                                required: {
                                    value: true,
                                    message: "Nome do  é obrigatório.",
                                },
                            })}
                        />
                        <Input
                            className="mb-3"
                            type="datetime-local"
                            defaultValue={props.evento.data}
                            label="data do Evento"
                            placeholder="Insira o nome do Evento"
                            required={true}
                            error={errors.dataEvento}
                            validations={register("dataEvento", {
                                required: {
                                    value: true,
                                    message: "Nome do  é obrigatório.",
                                },
                            })}
                        />
                        <Input
                            className="mb-3"
                            type="text"
                            defaultValue={props.evento.adendo}
                            label="Adendo e informações"
                            placeholder="Insira o adendo do Evento"
                            required={true}
                            error={errors.adendoEvento}
                            validations={register("adendoEvento", {
                                required: {
                                    value: true,
                                    message: "adendo é obrigatório.",
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
