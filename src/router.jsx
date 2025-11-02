import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./layouts/Layout"
import IndexView from "./views/Home/IndexView"
import AboutUsView from "./views/aboutus/AboutUsView"
import LoginView from "./auth/LoginView"
import LoginEmpresa from "./auth/LoginEmpresaView"
import RegisterView from "./auth/RegisterView"

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<IndexView />} />
                    <Route path="about" element={<AboutUsView />} />
                    <Route path="auth/login" element={<LoginView />} />
                    <Route path="auth/login-empresas" element={<LoginEmpresa />} />
                    <Route path="auth/register" element={<RegisterView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}