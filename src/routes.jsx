
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { isAuthenticated } from "./utils/is-authenticated";

// Rule: bundle-dynamic-imports - Use lazy loading for page components
const Login = lazy(() => import("./pages/Login").then(module => ({ default: module.Login })));
const Register = lazy(() => import("./pages/Register").then(module => ({ default: module.Register })));
const Dashboard = lazy(() => import("./pages/Dashboard").then(module => ({ default: module.Dashboard })));
const Gestors = lazy(() => import("./pages/Gestors").then(module => ({ default: module.Gestors })));
const Eventos = lazy(() => import("./pages/Eventos").then(module => ({ default: module.Eventos })));
const GestorsE = lazy(() => import("./pages/GestorsE").then(module => ({ default: module.GestorsE })));
const Perfil = lazy(() => import("./pages/perfil").then(module => ({ default: module.Perfil })));

const LoadingFallback = () => (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
        <span className="ml-3 text-gray-600 font-medium">Carregando aplicação...</span>
    </div>
);

/**
 * Cria rotas autenticadas
 */
export function PrivateRoute({ children }) {
    if (!isAuthenticated()) {
        return <Navigate to="/" replace />;
    }
    return children;
}

export function Navigations() {
    return (
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Suspense fallback={<LoadingFallback />}>
                <Routes>
                    <Route index path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/perfil"
                        element={
                            <PrivateRoute>
                                <Perfil />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/gestors"
                        element={
                            <PrivateRoute>
                                <Gestors />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/eventos"
                        element={
                            <PrivateRoute>
                                <Eventos />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/gestorse"
                        element={
                            <PrivateRoute>
                                <GestorsE />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}
