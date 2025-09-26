import {
    Container,
    Button,
  
    Nav,
    Navbar,
   
    Offcanvas,
} from "react-bootstrap";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function Bar() {
    
  
    const navigate = useNavigate();

    return (
        <>
            {[false].map((expand) => (
                <Navbar
                    id="NavBara"
                    key={expand}
                    expand={expand}
                    className="bg-body-tertiary  fixed-top   navbar--fixed-top"
                >
                    <Container fluid>
                        <Navbar.Brand href="#">
                            <Navbar.Brand id="gigante" />
                            <Link
                                class="align-end"
                                id="linksDaBarra"
                                to="/dashbord"
                            >
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

                        <Navbar.Brand id="gigante" />
                        <Navbar.Brand id="gigante" />
                        <Navbar.Brand id="gigante" />
                        <Navbar.Brand id="gigante" />
                        <Navbar.Brand id="gigante" />
                        <Navbar.Brand id="gigante" />
                        <Navbar.Brand id="gigante" />
                        <Navbar.Brand id="gigante" />
                        <Navbar.Brand id="gigante" />
                        <Navbar.Brand id="gigante" />
                        <Navbar.Brand id="gigante" />

                        <Navbar.Brand id="linksDaBarra" href="#action1">
                            Logado com, Vitor {" "}
                            <img
                                class="rounded"
                                alt="qualquercoisa"
                                height={45}
                                src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/d4ad40103067131.5f450dd53ccd1.png"
                            />
                        </Navbar.Brand>

                        <Navbar.Toggle
                            aria-controls={`offcanvasNavbar-expand-${expand}`}
                        />

                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-true${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title
                                    id={`offcanvasNavbarLabel-expand-${expand}`}
                                >
                                    Menu
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-8">
                                    <Nav.Link
                                        class=" text-center"
                                        href="#action1"
                                    >
                                        <img
                                            src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/d4ad40103067131.5f450dd53ccd1.png"
                                            class="img-fluid rounded"
                                            alt="Imagem responsiva"
                                            width={100}
                                        />{" "}
                                        Logado com [...]
                                    </Nav.Link>

                                    <Button
                                        className="m-1"
                                        variant="outline-secondary"
                                        onClick={() => {
                                            navigate("/perfil");
                                        }}
                                    >
                                        Perfil
                                    </Button>
                                    <Button
                                        className="m-1"
                                        variant="outline-secondary"
                                    >
                                        suporte
                                    </Button>

                                    <Button
                                        className="m-1"
                                        variant="outline-secondary"
                                    >
                                        ajuda
                                    </Button>

                                    <Button
                                        className="m-1"
                                        variant="outline-secondary"
                                    >
                                        Configuração
                                    </Button>

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
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    );
}
