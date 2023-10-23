import { Container, Button, Nav, NavDropdown,} from "react-bootstrap";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";



import { createGestor, deleteGestor, getGestors, updateGestor,} from "../services/gestor-service";



export function Bar() {

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

    return (
        <Container id="title" className="">
                <div>
                    <ul
                        id="barra"
                        class="nav-bar nav-pills nav-fill navbar  navbar-expand-md "
                    >
                        <li class="nav-item">
                            <Link id="barrainicio" to="/dashbord">
                                 Inicio
                            </Link>
                        </li>
                        <li  class="nav-item">
                            <Link id="barragestores" to="/gestors">
                                Gestores
                            </Link>
                        </li>
                        <li  class="nav-item">
                            <Link id="barraeventos" to="/eventos">
                                Eventos
                            </Link>
                        </li>
                        <li id="bemvindo" class="nav-item">
                            <a class="nav-link" href="#">
                                Bem vindo, homarinho
                            </a>
                        </li>
                        <li id="tituloT" class="nav-item">
                            <a class="nav-link" href="#">
                                <svg
                                    id="tradu"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    fill="currentColor"
                                    class="bi bi-translate"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286H4.545zm1.634-.736L5.5 3.956h-.049l-.679 2.022H6.18z" />
                                    <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2zm7.138 9.995c.193.301.402.583.63.846-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6.066 6.066 0 0 1-.415-.492 1.988 1.988 0 0 1-.94.31z" />
                                </svg>
                            </a>
                        </li>
                        <li id="tituloT" class="nav-item">
                            <a class="nav-link" href="#">
                                <svg
                                    id="titulo"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    fill="currentColor"
                                    class="bi bi-bell"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                                </svg>
                            </a>
                        </li>
                        <li id="tituloT" class="nav-item">
                            {" "}
                            <Nav.Link href="#action2"></Nav.Link>
                            <NavDropdown>
                                {" "}
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                    class="img-fluid"
                                    alt="Imagem responsiva"
                                    width={100}
                                />
                                <NavDropdown.Item href="#action3">
                                    Perfil
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action4">
                                    Configuração
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action5">
                                    {" "}
                                    <Button
                                        className="m-1"
                                        variant="outline-secondary"
                                        onClick={() => {
                                            sessionStorage.removeItem("token");
                                            navigate("/");
                                        }}
                                    >
                                        Sair da pagina
                                    </Button>
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="#" disabled />
                            <a class="nav-link" href="#"></a>
                        </li>
                        <li id="tituloT" class="nav-item">
                            <a class="nav-link" href="#">
                                {" "}
                            </a>
                        </li>
                    </ul>
                </div>
                <span id="barrastilo" class="border-top"></span>
            </Container>
    )
}
