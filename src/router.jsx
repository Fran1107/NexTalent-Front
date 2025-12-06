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
import Ofertas from "./pages/Ofertas" 
import MiPerfilView from "./views/pasantes/MiPerfilView"
import PerfilPublicoView from "./views/pasantes/PerfilPublicoView"
import FavoritosView from "./views/pasantes/FavoritosView"

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Layout />}>
                    <Route index element={<IndexView />} />
                    <Route path="quienessomos" element={<AboutUsView />} />
                    <Route path="auth/login" element={<LoginView />} />
                    <Route path="auth/register" element={<RegisterView />} />
                    <Route path="auth/register/form" element={<RegisterFormView /> } />
                    {/* --- NUEVAS RUTAS DE PASANTES --- */}
                    
                    {/* Ruta Privada (Debería estar protegida, pero por ahora la ponemos aquí) */}
                    <Route path="mi-perfil" element={<MiPerfilView />} />
                    <Route path="mi-perfil/favoritos" element={<FavoritosView/>} />

                    {/* Ruta Pública (Cualquiera puede verla con el ID) */}
                    <Route path="pasante/:id" element={<PerfilPublicoView />} />
                    
                    <Route path="index-empresas" element={<IndexEmpresasView />} />
                    <Route path="auth/login-empresas" element={<LoginEmpresa />} />
                    <Route path="auth/register/form-empresas" element={<RegisterFromEmpresaView />} />

                    <Route path="ofertas" element={<Ofertas />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}