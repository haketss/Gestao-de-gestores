import {
    Container,
    Button,
    Form,
    Nav,
    Navbar,
    NavDropdown,
    Offcanvas,
} from "react-bootstrap";

export function Bar() {
    return (
        <>
            {[true].map((expand) => (
                <Navbar
                    key={expand}
                    expand={expand}
                    className="bg-body-tertiary mb-3"
                >
                    <Container fluid>
                        <Navbar.Brand href="#">Inicio</Navbar.Brand>
                        <Navbar.Brand href="#">Gestores</Navbar.Brand>
                        <Navbar.Brand href="#">Eventos</Navbar.Brand>

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
                                    <Nav.Link href="#action1">Bem vimdo!!!</Nav.Link>
                                    <Nav.Link href="#action2">Nomedogestor</Nav.Link>
                                    <Nav.Link href="#action3">Icone</Nav.Link>
                                    <Nav.Link href="#action4">Cone</Nav.Link>
                                    <NavDropdown
                                        title="Dropdown"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                    >
                                        <NavDropdown.Item href="#action5">
                                            Perfil
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="#action6">
                                            Tema
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="#action7">
                                            Ajuda
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action8">
                                            Sair
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
