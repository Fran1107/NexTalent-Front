import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./layouts/Layout"
import IndexView from "./views/Home/IndexView"
import AboutUsView from "./views/aboutus/AboutUsView"
import LoginView from "./views/auth/LoginView"
import RegisterView from "./views/auth/RegisterView"
import IndexEmpresasView from "./views/home/IndexEmpresasView"
import RegisterFormView from "./auth/RegisterFormView"
import RegisterFromEmpresaView from "./auth/RegisterFormEmpresaView"
import MiPerfilView from "./views/pasantes/MiPerfilView"
import PerfilPublicoView from "./views/pasantes/PerfilPublicoView"
import RegisterEmpresaForm from "./views/auth/RegisterEmpresaForm"
import RegisterPasanteForm from "./views/auth/RegisterPasanteForm"

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
                    {/* --- NUEVAS RUTAS DE PASANTES --- */}
                    
                    {/* Ruta Privada (Debería estar protegida, pero por ahora la ponemos aquí) */}
                    <Route path="mi-perfil" element={<MiPerfilView />} />

                    {/* Ruta Pública (Cualquiera puede verla con el ID) */}
                    <Route path="pasante/:id" element={<PerfilPublicoView />} />
                    {/* Rutas para empresas */}
                    <Route path="index-empresas" element={<IndexEmpresasView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}