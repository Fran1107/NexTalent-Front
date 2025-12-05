import { BrowserRouter, Routes, Route } from "react-router-dom"
// Vistas Generales
import IndexView from "./views/Home/IndexView";
import AboutUsView from "./views/aboutus/AboutUsView";
import IndexEmpresasView from "./views/home/IndexEmpresasView";

// Vistas de Autenticación (Actualizado según tu imagen)
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import RegisterPasanteForm from "./views/auth/RegisterPasanteForm"; // Antes: RegisterFormView
import RegisterEmpresaForm from "./views/auth/RegisterEmpresaForm"; // Antes: RegisterFromEmpresaView
import LoginPasante from "./views/auth/LoginPasante"; // Nuevo
import LoginEmpresa from "./views/auth/LoginEmpresa"; // Nuevo

// Vistas de Pasantes
import MiPerfilView from "./views/pasantes/MiPerfilView";
import PerfilPublicoView from "./views/pasantes/PerfilPublicoView";

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
                </Route>
            </Routes>
        </BrowserRouter>
    )
}