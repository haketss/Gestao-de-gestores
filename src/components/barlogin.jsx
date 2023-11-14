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
                    className="navbar navbar--fixed-top navbar navbar--fixed-top navbar-sidebar--show"
                    id="NavBar"
                >
                    <Container fluid>
                        <Navbar.Brand href="#"></Navbar.Brand>
                        <Navbar.Brand href="#"></Navbar.Brand>
                        <Navbar.Brand href="#"></Navbar.Brand>

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
                                    <Nav.Link href="#action1">
                                        Bem vindo!!! 
                                    </Nav.Link>
                                    <Nav.Link href="#action2" >
                                        entre com sua conta
                                    </Nav.Link>
                                    <Nav.Link href="#action2">
                                        ajuda
                                    </Nav.Link>
                                    <Nav.Link href="#action4"></Nav.Link>
                                    
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                        
                    </Container>
                </Navbar>
            ))}
        </>
    );
}
