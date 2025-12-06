import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./layouts/Layout"
import IndexView from "./views/Home/IndexView"
import AboutUsView from "./views/aboutus/AboutUsView"
import LoginView from "./auth/LoginView"
import LoginEmpresa from "./auth/LoginEmpresaView"
import RegisterView from "./auth/RegisterView"
import IndexEmpresasView from "./views/home/IndexEmpresasView"
import RegisterFormView from "./auth/RegisterFormView"
import RegisterFromEmpresaView from "./auth/RegisterFormEmpresaView"
export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rutas para profesionales */}
                <Route path="/" element={<Layout />}>
                    <Route index element={<IndexView />} />
                    <Route path="quienessomos" element={<AboutUsView />} />
                    <Route path="auth/login" element={<LoginView />} />
                    <Route path="auth/register" element={<RegisterView />} />
                    <Route path="auth/register/form" element={<RegisterFormView /> } />
                    {/* Rutas para empresas */}
                    <Route path="index-empresas" element={<IndexEmpresasView />} />
                    <Route path="auth/login-empresas" element={<LoginEmpresa />} />
                    <Route path="auth/register/form-empresas" element={<RegisterFromEmpresaView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
