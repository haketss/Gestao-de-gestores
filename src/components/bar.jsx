import {
    Container,
    Button,
    Form,
    Nav,
    Navbar,
    NavDropdown,
    Offcanvas,
} from "react-bootstrap";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
    createGestor,
    deleteGestor,
    getGestors,
    updateGestor,
} from "../services/gestor-service";

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
        <>
            {[true].map((expand) => (
                <Navbar
                    key={expand}
                    expand={expand}
                    className="navbar navbar--fixed-top navbar navbar--fixed-top navbar-sidebar--show"
                    id="NavBara"
                >
                    <Container fluid>
                        <Navbar.Brand href="#">
                            <Link id="linksDaBarra" to="/dashbord">
                                Home
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Brand href="#">
                            <Link id="linksDaBarra" to="/gestors">
                                Gestores
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Brand href="#">
                            <Link id="linksDaBarra" to="/eventos">
                                Eventos
                            </Link>
                        </Navbar.Brand>

                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title
                                    id={`offcanvasNavbarLabel-expand-${expand}`}
                                >
                                    Offcanvas
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-8">
                                    <Nav.Link id="linksDaBarra" href="#action1">
                                        Bem vindo!!!
                                    </Nav.Link>
                                    <Nav.Link href="#action2"></Nav.Link>
                                    <Nav.Link id="linksDaBarra" href="#action2">
                                        ajuda
                                    </Nav.Link>
                                    <NavDropdown id="tentrativa">
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
                                            <Button
                                                className="m-1"
                                                variant="outline-secondary"
                                                onClick={() => {
                                                    sessionStorage.removeItem(
                                                        "token"
                                                    );
                                                    navigate("/");
                                                }}
                                            >
                                                Sair da pagina
                                            </Button>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    );
}
