import { Container } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "../index.css";


import { Bar } from "../components/bar";

import {

    getGestors

} from "../services/gestor-service";

import {

    getEventos

} from "../services/evento-service";

export function Perfil() {
    const [eventos, setEventos] = useState([]);
    const [gestors, setGestors] = useState([]);


    const navigate = useNavigate();

    useEffect(() => {
        findGestors();
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

    return (
        <Container fluid>
            <Bar />
            <p class="align-middle" id="barraColorida">a</p>
            <Container>
                <p id="q_g">Quantidade de gestors: {gestors.length} <img id="imagen" alt="" width={150} src="https://static.vecteezy.com/system/resources/previews/000/379/094/original/edit-profile-vector-icon.jpg"></img></p>
                <p id="q_e">Quantidade de Eventos: {eventos.length} <img id="imagen" alt="" width={150} src="https://th.bing.com/th/id/OIP.MH2GSCtym73Bu2M_z288ywHaHa?pid=ImgDet&rs=1"></img></p>
            </Container>
        </Container>
    );
}
