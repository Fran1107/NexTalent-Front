import { useEffect, useState } from 'react';
import { getMyProfile, uploadCV, uploadFotoPerfil } from '../../API/PasanteAPI';

// Helper para obtener la URL base de las imágenes
// Si tu API es http://localhost:4000/api, las imágenes están en http://localhost:4000/uploads
const BASE_URL = import.meta.env.VITE_API_URL.replace('/api', ''); 

export default function MiPerfilView() {
    const [perfil, setPerfil] = useState(null);
    const [fotoFile, setFotoFile] = useState(null);
    const [cvFile, setCvFile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarPerfil();
    }, []);

    const cargarPerfil = async () => {
        try {
            const data = await getMyProfile();
            setPerfil(data.pasante);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubirFoto = async (e) => {
        e.preventDefault();
        if (!fotoFile) return;
        const formData = new FormData();
        formData.append('fotoPerfil', fotoFile); // 'fotoPerfil' debe coincidir con el backend

        try {
            await uploadFotoPerfil(formData);
            alert('Foto actualizada!');
            cargarPerfil(); // Recargar para ver cambios
        } catch (error) {
            alert('Error al subir foto');
        }
    };

    const handleSubirCV = async (e) => {
        e.preventDefault();
        if (!cvFile) return;
        const formData = new FormData();
        formData.append('cv', cvFile); // 'cv' debe coincidir con el backend

        try {
            await uploadCV(formData);
            alert('CV subido correctamente!');
            cargarPerfil();
        } catch (error) {
            alert('Error al subir CV');
        }
    };

    if (loading) return <p>Cargando perfil...</p>;

    return (
        <div className="max-w-4xl mx-auto p-5">
            <h1 className="text-2xl font-bold mb-5">Mi Perfil</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* --- SECCIÓN FOTO --- */}
                <div className="bg-white p-6 shadow rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Foto de Perfil</h2>
                    
                    {perfil?.fotoPerfil ? (
                        <img 
                            src={`${BASE_URL}/${perfil.fotoPerfil}`} 
                            alt="Mi Foto" 
                            className="w-32 h-32 rounded-full object-cover mb-4 border"
                        />
                    ) : (
                        <div className="w-32 h-32 bg-gray-200 rounded-full mb-4 flex items-center justify-center text-gray-500">Sin Foto</div>
                    )}

                    <form onSubmit={handleSubirFoto} className="flex flex-col gap-2">
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => setFotoFile(e.target.files[0])}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
                            Actualizar Foto
                        </button>
                    </form>
                </div>

                {/* --- SECCIÓN CV --- */}
                <div className="bg-white p-6 shadow rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Curriculum Vitae</h2>
                    
                    {perfil?.cvUrl ? (
                        <div className="mb-4">
                            <p className="text-green-600 font-medium">✅ CV Cargado</p>
                            <a 
                                href={`${BASE_URL}/${perfil.cvUrl}`} 
                                target="_blank" 
                                rel="noreferrer"
                                className="text-blue-500 underline"
                            >
                                Ver mi CV actual
                            </a>
                        </div>
                    ) : (
                        <p className="text-red-500 mb-4">No has subido tu CV aún.</p>
                    )}

                    <form onSubmit={handleSubirCV} className="flex flex-col gap-2">
                        <input 
                            type="file" 
                            accept="application/pdf"
                            onChange={(e) => setCvFile(e.target.files[0])}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                        />
                        <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition">
                            Subir PDF
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}