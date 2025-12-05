import { BrowserRouter, Routes, Route } from "react-router-dom"
import IndexView from "./views/Home/IndexView";
import AboutUsView from "./views/aboutus/AboutUsView";
import IndexEmpresasView from "./views/home/IndexEmpresasView";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import MiPerfilView from "./views/pasantes/MiPerfilView";
import PerfilPublicoView from "./views/pasantes/PerfilPublicoView";
import Onboarding from "./views/auth/Onboarding"
import Layout from "./layouts/Layout";

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
        
                    {/* --- NUEVAS RUTAS DE PASANTES --- */}
                    
                    {/* Ruta Privada (Debería estar protegida, pero por ahora la ponemos aquí) */}
                    <Route path="mi-perfil" element={<MiPerfilView />} />

                    {/* Ruta Pública (Cualquiera puede verla con el ID) */}
                    <Route path="pasante/:id" element={<PerfilPublicoView />} />
                    {/* Rutas para empresas */}
                    <Route path="index-empresas" element={<IndexEmpresasView />} />
                    <Route path="onboarding" element={<Onboarding />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}