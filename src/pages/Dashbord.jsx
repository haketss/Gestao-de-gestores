import React, { useEffect, useState } from "react";
import { Container, Col } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Chart } from "react-google-charts";
import { Bar } from "../components/bar";

import { Evento } from "../components/EventoE";

import {
  
    getGestors
  
} from "../services/gestor-service";

import {
    
    getEventos
   
} from "../services/evento-service";

export function Dashbord() {
    const [maxGestorsToShow, setMaxGestorsToShow] = useState(5);
    const [totalSales, setTotalSales] = useState(0);
    const [totalmeta, setTotalmeta] = useState(0);
    const [eventos, setEventos] = useState([]);
    const [gestors, setGestors] = useState([]);
  
    const {
        formState: { errou },
    } = useForm();

    const navigate = useNavigate();

    useEffect(() => {
        findGestors();
        calculateTotalSales();
    });

    useEffect(() => {
        calculateTotalSales(); // Calculate total sales after gestors state is updated
    }); 
    useEffect(() => {
        calculateTotalmeta(); // Calculate total sales after gestors state is updated
    }); 

    useEffect(() => {
        findEventos();
    });

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
        <>
            <Bar />
            <p class="align-middle" id="barraColorida">
                a
            </p>
            <Container>
                <table>
                    <thead>
                        <th id="grafchart">
                            <Chart
                                chartType="Bar"
                                width=""
                                height=""
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
                                        subtitle:
                                            "Metas e atendimentos do ano: 2023",
                                    },
                                }}
                            />

                            <div className="text-middle">
                                <section>
                                    <button
                                        id="menumais"
                                        onClick={() =>
                                            setMaxGestorsToShow(
                                                maxGestorsToShow + 5
                                            )
                                        }
                                    >
                                        Mostrar +
                                    </button>

                                    <button
                                        id="menumais"
                                        onClick={() =>
                                            setMaxGestorsToShow(
                                                maxGestorsToShow - 5
                                            )
                                        }
                                    >
                                        Mostrar -
                                    </button>
                                </section>
                            </div>
                        </th>
                        <th className="text-center">
                            <section id="q_g">
                                <li>
                                    {" "}
                                    <img
                                        class="rounded"
                                        id="imagen"
                                        alt="qualquercoisa"
                                        width={50}
                                        src="https://static.vecteezy.com/system/resources/previews/000/379/094/original/edit-profile-vector-icon.jpg"
                                    ></img>
                                    Quantidade de gestors:
                                    <label>{gestors.length}</label>
                                    <label>
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
                                        )}
                                    </label>
                                    Total de atendimentos: {errou}
                                    <label>{totalSales} </label>
                                </li>
                            </section>
                            <section id="q_g">
                                <li>
                                    <img
                                        class="rounded"
                                        id="imagen"
                                        alt="qualquercoisa"
                                        width={50}
                                        src="https://th.bing.com/th/id/OIP.5HYVKNZNNUPOwvVY11yO3gHaHa?pid=ImgDet&rs=1"
                                    ></img>
                                    Total de Metas: <label>{totalmeta} </label>
                                </li>
                            </section>
                            <section id="q_e">
                                <img
                                    class="rounded"
                                    alt="qualquercoisa"
                                    id="imagen"
                                    width={50}
                                    src="https://th.bing.com/th/id/OIP.MH2GSCtym73Bu2M_z288ywHaHa?pid=ImgDet&rs=1"
                                ></img>
                                Quantidade de Eventos: {eventos.length}
                            </section>
                        </th>
                    </thead>
                </table>
                <div>
                    <div>
                        <Col className="text-center">
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
                                    Não existe nenhum evento cadastrado!
                                </p>
                            )}
                        </Col>
                    </div>
                    <div>
                        <p>
                            <p className="text-center">
                                Quantidade em % de cada gestor no montante total
                            </p>
                            <Chart
                                chartType="PieChart"
                                loader={<div>Carregando informações</div>}
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
                                chartPackages={["corechart", "controls"]}
                                render={({ renderControl, renderChart }) => {
                                    return (
                                        <div
                                            style={{
                                                display: "flex",
                                            }}
                                        >
                                            {renderChart()}
                                        </div>
                                    );
                                }}
                                controls={[]}
                            />
                        </p>
                    </div>
                </div>
            </Container>
        </>
    );
}
