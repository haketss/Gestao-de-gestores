import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

import { Dashbord } from "./pages/Dashbord";

import { Gestors } from "./pages/Gestors";
import { Eventos } from "./pages/Eventos";

import { GestorsE } from "./pages/GestorsE";

import { Perfil } from "./pages/perfil"



import { isAuthenticated } from "./utils/is-authenticated";

/**
 * Cria rotas autenticadas
 */
export function PrivateRoute({ children }) {
    if (!isAuthenticated()) {
        // Pode trocar para renderizar uma página customizada de não autorizada,
        // nesse caso ele vai voltar para a tela de login
        return <Navigate to="/" replace />;
    }
    return children;
}

export function Navigations() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/perfil"
                    element={
                        <PrivateRoute>
                            {" "}
                            <Perfil />{" "}
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/gestors"
                    element={
                        <PrivateRoute>
                            {" "}
                            <Gestors />{" "}
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/eventos"
                    element={
                        <PrivateRoute>
                            {" "}
                            <Eventos />{" "}
                        </PrivateRoute>
                    }
                />{" "}
                <Route
                    path="/gestorse"
                    element={
                        <PrivateRoute>
                            {" "}
                            <GestorsE />{" "}
                        </PrivateRoute>
                    }
                />{" "}
                
                 <Route
                    path="/dashbord"
                    element={
                        <PrivateRoute>
                            {" "}
                            <Dashbord />{" "}
                        </PrivateRoute>
                    }
                />{" "}
            </Routes>
        </BrowserRouter>
    );
}
