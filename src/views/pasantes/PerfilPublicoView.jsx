import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPublicProfile } from '../../API/PasanteAPI';

const BASE_URL = import.meta.env.VITE_API_URL.replace('/api', '');

export default function PerfilPublicoView() {
    const { id } = useParams(); // Obtiene el ID de la URL
    const [pasante, setPasante] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchInfo() {
            try {
                const data = await getPublicProfile(id);
                setPasante(data.pasante);
            } catch (err) {
                setError(true);
            }
        }
        fetchInfo();
    }, [id]);

    if (error) return <div className="text-center mt-10 text-red-500">Pasante no encontrado</div>;
    if (!pasante) return <div className="text-center mt-10">Cargando perfil...</div>;

    return (
        <div className="container mx-auto mt-10 p-5">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden flex flex-col md:flex-row">
                
                {/* Foto y Datos Principales */}
                <div className="bg-slate-100 p-8 flex flex-col items-center justify-center md:w-1/3 border-r">
                    <img 
                        src={pasante.fotoPerfil ? `${BASE_URL}/${pasante.fotoPerfil}` : "https://via.placeholder.com/150"} 
                        alt="Foto Perfil" 
                        className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg mb-4"
                    />
                    <h1 className="text-2xl font-bold text-gray-800">{pasante.nombre} {pasante.apellido}</h1>
                    <p className="text-indigo-600 font-semibold">{pasante.carrera}</p>
                    <p className="text-gray-500 text-sm mt-1">{pasante.provincia}, {pasante.localidad}</p>
                </div>

                {/* Detalles y CV */}
                <div className="p-8 md:w-2/3">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Sobre mí</h2>
                    <p className="text-gray-600 mb-6">{pasante.sobreMi || "Sin descripción."}</p>

                    <h2 className="text-xl font-bold text-gray-800 mb-4">Habilidades</h2>
                    <div className="flex flex-wrap gap-2 mb-8">
                        {pasante.habilidades?.map((skill, index) => (
                            <span key={index} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                                {skill}
                            </span>
                        ))}
                    </div>

                    <div className="border-t pt-6">
                        {pasante.cvUrl ? (
                            <a 
                                href={`${BASE_URL}/${pasante.cvUrl}`} 
                                target="_blank" 
                                rel="noreferrer"
                                className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
                            >
                                📄 Descargar Curriculum Vitae
                            </a>
                        ) : (
                            <span className="text-gray-500 italic">Este usuario no ha publicado su CV aún.</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}