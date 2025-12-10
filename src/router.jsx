import { BrowserRouter, Routes, Route } from "react-router-dom"
import IndexView from "./views/Home/IndexView";
import AboutUsView from "./views/aboutus/AboutUsView";
import IndexEmpresasView from "./views/home/IndexEmpresasView";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import Ofertas from "./pages/Ofertas" 
import MiPerfilView from "./views/pasantes/MiPerfilView";
import PerfilPublicoView from "./views/pasantes/PerfilPublicoView";
import Onboarding from "./views/auth/Onboarding"
import Layout from "./layouts/Layout";
import FavoritosView from "./views/pasantes/FavoritosView"
import PostulacionDetailView from "./views/postulaciones/PostulacionDetailView";
import MisPostulacionesView from "./views/postulaciones/MisPostulacionesView";


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Layout />}>
                    <Route index element={<IndexView />} />
                    <Route path="quienessomos" element={<AboutUsView />} />
                    <Route path="auth/login" element={<LoginView />} />
                    <Route path="auth/register" element={<RegisterView />} />
                    
                    {/* --- NUEVAS RUTAS DE PASANTES --- */}
                    
                    {/* Ruta Privada (Debería estar protegida, pero por ahora la ponemos aquí) */}
                    {/* 1. DASHBOARD: Veo mi perfil y mis botones de acción */}
                    <Route path="mi-perfil" element={<PerfilPublicoView />} />

                    {/* 2. EDICIÓN: Formulario para cambiar datos y archivos */}
                    <Route path="mi-perfil/editar" element={<MiPerfilView />} />

                    <Route path="mi-perfil/favoritos" element={<FavoritosView/>}></Route>

                    {/* 3. VISTA EXTERNA: Lo que ven las empresas (sin botones de edición) */}
                    <Route path="pasante/:id" element={<PerfilPublicoView />} />
                    
                    <Route path="index-empresas" element={<IndexEmpresasView />} />
                    <Route path="onboarding" element={<Onboarding />} />

                    <Route path="ofertas" element={<Ofertas />} />


                    {/* Ver detalles de una oferta (Pública o Privada) */}
                    <Route path="postulaciones/:id" element={<PostulacionDetailView />} />

                    {/* Ver mis postulaciones (Pasante) o Mis Ofertas (Empresa) */}
                    {/* Nota: Protege esta ruta si puedes, o el componente manejará la redirección si falla la carga */}
                    <Route path="mis-postulaciones" element={<MisPostulacionesView />} />
                    <Route path="mi-perfil/mis-postulaciones" element={<MisPostulacionesView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
