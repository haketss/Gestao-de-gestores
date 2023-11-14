import React, { useEffect, useState } from "react";
import { Container, Col, Modal, Form, Button, Dropdown } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Chart } from "react-google-charts";
import { Bar } from "../components/bar";

import { Evento } from "../components/EventoE";

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

export function Dashbord(props) {
    const [maxGestorsToShow, setMaxGestorsToShow] = useState(5);
    const [totalSales, setTotalSales] = useState(0);
    const [totalmeta, setTotalmeta] = useState(0);
    const [eventos, setEventos] = useState([]);
    const [gestors, setGestors] = useState([]);
    const [setIsCreated] = useState(false);
    const [setIsUpdated] = useState(false);

    const {
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        findGestors();
        calculateTotalSales();
    }, []);

    useEffect(() => {
        calculateTotalSales(); // Calculate total sales after gestors state is updated
    }, [gestors]); // Run this effect whenever gestors state changes
    useEffect(() => {
        calculateTotalmeta(); // Calculate total sales after gestors state is updated
    }, [gestors]); // Run this effect whenever gestors state changes

    useEffect(() => {
        findEventos();
    }, []);

    // usado para mostrar os gestores onde eu quero no corpo do dashibord

    const calculateTotalSales = () => {
        const total = gestors.reduce(
            (acc, gestor) => acc + (gestor.atendimentos || 0),
            0
        );
        setTotalSales(total);
    };
    const calculateTotalmeta = () => {
        const total = gestors.reduce(
            (acc, gestor) => acc + (gestor.metas || 0),
            0
        );
        setTotalmeta(total);
    };

    const [gestorAtual, setGestorAtual] = useState(null);

    const selecionarGestor = (gestor) => {
        setGestorAtual(gestor);
    };

    async function editGestor(data) {
        if (gestorAtual) {
            await props.editGestor({ ...data, id: gestorAtual.id });
            setIsUpdated(false);
        } else {
            console.error("Nenhum gestor selecionado.");
        }
    }

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

    return (
        <>
            <Bar />
            <Container fluid>
                {" "}
                <Chart
                    id="chart"
                    chartType="Bar"
                    width="100%"
                    height="400px"
                    data={[
                        ["Gestores", "atendimentos", "Metas"],
                        ...gestors
                            .slice(0, maxGestorsToShow)
                            .map((gestor) => [
                                `${gestor.nome} `,
                                gestor.atendimentos || 0,
                                gestor.metas || 0,
                            ]),
                    ]}
                    options={{
                        chart: {
                            title: "Resultados dos atendimentos",
                            subtitle: "Metas e ganhos do ano: 2023",
                        },
                    }}
                />{" "}
                <p id="menumaism">
                    {" "}
                    <td
                        onClick={() =>
                            setMaxGestorsToShow(maxGestorsToShow + 5)
                        }
                    >
                        <button id="menumais">Mostrar+</button>
                    </td>
                    <td
                        onClick={() =>
                            setMaxGestorsToShow(maxGestorsToShow - 5)
                        }
                    >
                        <button id="menumais">Mostrar-</button>
                    </td>
                </p>
                <li>
                    <p id="q_g">
                        <li>
                            {" "}
                            <img
                                id="imagen"
                                width={50}
                                src="https://static.vecteezy.com/system/resources/previews/000/379/094/original/edit-profile-vector-icon.jpg"
                            ></img>{" "}
                            Quantidade de gestors:{" "}
                            <strong>{gestors.length}</strong>{" "}
                            <strong>
                                {totalSales > 400 ? (
                                    <img
                                        id="imagen"
                                        width={37}
                                        src="   https://cdn-icons-png.flaticon.com/512/5610/5610930.png "
                                        alt="Large Sales Icon"
                                    />
                                ) : (
                                    <img
                                        id="imagen"
                                        width={37}
                                        src="https://cdn-icons-png.flaticon.com/512/5974/5974734.png"
                                        alt="Small Sales Icon"
                                    />
                                )}{" "}
                            </strong>
                            Total de atendimentos:{" "}
                            <strong>{totalSales} </strong>
                        </li>
                    </p>{" "}
                    <p id="q_g">
                        <li>
                            {" "}
                            <img
                                id="imagen"
                                width={50}
                                src="https://th.bing.com/th/id/OIP.5HYVKNZNNUPOwvVY11yO3gHaHa?pid=ImgDet&rs=1"
                            ></img>{" "}
                            Total de Metas: <strong>{totalmeta} </strong>
                        </li>
                    </p>
                    <p id="q_e">
                        {" "}
                        <img
                            id="imagen"
                            width={50}
                            src="https://th.bing.com/th/id/OIP.MH2GSCtym73Bu2M_z288ywHaHa?pid=ImgDet&rs=1"
                        ></img>
                        Quantidade de Eventos: {eventos.length}{" "}
                    </p>{" "}
                    <div>
                        <ul class="nav-bar nav-pills nav-fill navbar  navbar-expand-md ">
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <Col className="w-5 m-auto mb-5">
                                        {eventos && eventos.length > 0 ? (
                                            <div>
                                                {eventos
                                                    .slice(0, 2)
                                                    .map((evento, index) => (
                                                        <Evento
                                                            key={index}
                                                            evento={evento}
                                                        />
                                                    ))}
                                            </div>
                                        ) : (
                                            <p className="text-center">
                                                Não existe nenhum evento
                                                cadastrado!
                                            </p>
                                        )}
                                    </Col>
                                </a>
                            </li>
                            <li id="tituloT" class="nav-item">
                                <a class="nav-link" href="#">
                                    <p id="pizza">
                                        <label id="pizza2">
                                            <strong>
                                                Quantidade em % de cada gestor
                                                no montante total
                                            </strong>{" "}
                                        </label>{" "}
                                        <Chart
                                            width={300}
                                            height={300}
                                            chartType="PieChart"
                                            loader={
                                                <div>
                                                    Carregando informações
                                                </div>
                                            }
                                            data={[
                                                ["Gestor", "atendimentos"],
                                                ...gestors.map((gestor) => [
                                                    gestor.nome,
                                                    gestor.atendimentos || 0,
                                                ]),
                                            ]}
                                            options={{
                                                legend: "none",
                                                chartArea: {
                                                    left: 15,
                                                    top: 15,
                                                    right: 0,
                                                    bottom: 0,
                                                },
                                                pieSliceText: "label",
                                            }}
                                            rootProps={{ "data-testid": "1" }}
                                            chartWrapperParams={{
                                                view: { columns: [0, 1] },
                                            }}
                                            chartPackages={[
                                                "corechart",
                                                "controls",
                                            ]}
                                            render={({
                                                renderControl,
                                                renderChart,
                                            }) => {
                                                return (
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                width: "50%",
                                                                paddingTop: 10,
                                                            }}
                                                        >
                                                            {/* Removed gender and age controls */}
                                                        </div>
                                                        <div
                                                            style={{
                                                                width: "50%",
                                                            }}
                                                        >
                                                            {renderChart()}
                                                        </div>
                                                    </div>
                                                );
                                            }}
                                            controls={[]}
                                        />
                                    </p>
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>
            </Container>
        </>
    );
}
