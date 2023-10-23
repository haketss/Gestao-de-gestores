import { Container, Col } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import "../index.css";
import { Gestor } from "../components/Gestor";
import { Evento } from "../components/Evento";
import { Bar } from "../components/bar";

import {
    createGestor,
    deleteGestor,
    getGestors,
    updateGestor,
} from "../services/gestor-service";

import {
    createEvento,
    deleteEvento,
    getEventos,
    updateEvento,
} from "../services/evento-service";

export function Dashbord() {
    const [eventos, setEventos] = useState([]);
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

    useEffect(() => {
        findEventos();
        // eslint-disable-next-line
    }, []);

    async function findEventos() {
        try {
            const result = await getEventos();
            setEventos(result.data);
        } catch (error) {
            console.error(error);
            navigate("/");
        }
    }

    async function findGestors() {
        try {
            const result = await getGestors();
            setGestors(result.data);
        } catch (error) {
            console.error(error);
            navigate("/");
        }
    }

    async function removeGestor(id) {
        try {
            await deleteGestor(id);
            await findGestors();
        } catch (error) {
            console.error(error);
        }
    }

    async function addGestor(data) {
        try {
            await createGestor(data);
            setIsCreated(false);
            await findGestors();
        } catch (error) {
            console.error(error);
        }
    }

    async function editGestor(data) {
        try {
            await updateGestor({
                id: data.id,
                nome: data.nome,
                sobrenome: data.sobrenome,
                genero: data.genero,
                idade: data.idade,
                dataDeNascimento: data.dataDeNascimento,
                localDeTrabalho: data.localDeTrabalho,
                CRM: data.CRM,
                tipoDeContrato: data.tipoDeContrato,
                formacao: data.formacao,
                senhaProvisoria: data.senhaProvisoria,
            });
            await findGestors();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container fluid>
            <Bar></Bar>

            <Container>
                <p id="q_g">Quantidade de gestors: {gestors.length} <img id="imagen" width={150} src="https://static.vecteezy.com/system/resources/previews/000/379/094/original/edit-profile-vector-icon.jpg"></img></p>
                <p id="q_e">Quantidade de Eventos: {eventos.length} <img id="imagen" width={150} src="https://th.bing.com/th/id/OIP.MH2GSCtym73Bu2M_z288ywHaHa?pid=ImgDet&rs=1"></img></p>
            </Container>
        </Container>
    );
}
