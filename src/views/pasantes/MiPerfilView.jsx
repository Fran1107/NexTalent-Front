import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalMensajeExito, ModalMensajeError } from '../../components/MessageModals.jsx';
import { getMyProfile, uploadCV, uploadFotoPerfil } from '../../API/pasanteApi.js';
import api from '../../lib/axios'; // Importamos axios directo para el update de texto

export default function MiPerfilView() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    
    // Estados para archivos
    const [fotoFile, setFotoFile] = useState(null);
    const [cvFile, setCvFile] = useState(null);

    // Estados para Modales (Feedback)
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    // Estado para formulario de texto
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        telefono: '',
        provincia: '',
        localidad: '',
        linkedinUrl: '',
        carrera: '',
        sobreMi: '',
        habilidades: '' // Lo manejaremos como string separado por comas para facilitar la edición
    });

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
            const { pasante } = await getMyProfile();
            setFormData({
                nombre: pasante.nombre || '',
                apellido: pasante.apellido || '',
                telefono: pasante.telefono || '',
                provincia: pasante.provincia || '',
                localidad: pasante.localidad || '',
                linkedinUrl: pasante.linkedinUrl || '',
                carrera: pasante.carrera || '',
                sobreMi: pasante.sobreMi || '',
                habilidades: pasante.habilidades ? pasante.habilidades.join(', ') : ''
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // 1. Guardar Textos
        try {
            // Convertir habilidades de string "React, Node" a array ["React", "Node"]
            const datosAEnviar = {
                ...formData,
                habilidades: formData.habilidades.split(',').map(s => s.trim()).filter(s => s !== '')
            };

            await api.put('/pasantes/profile/me', datosAEnviar); // Usamos put directo
            
            // 2. Guardar Archivos (Si se seleccionaron)
            if (fotoFile) {
                const fotoData = new FormData();
                fotoData.append('fotoPerfil', fotoFile);
                await uploadFotoPerfil(fotoData);
            }

            if (cvFile) {
                const cvData = new FormData();
                cvData.append('cv', cvFile);
                await uploadCV(cvData);
            }

            // ÉXITO: Mostramos el modal y preparamos el mensaje
            setModalMessage('Tus datos y archivos se han actualizado correctamente.');
            setShowSuccess(true);
            // Nota: La navegación ocurre cuando el usuario cierra el modal (ver abajo en el JSX)

        } catch (error) {
            console.error(error);
            // ERROR: Mostramos el modal de error
            setModalMessage(error.message || 'Hubo un problema al intentar guardar los cambios.');
            setShowError(true);
        }
    };

    if (loading) return <div className="p-10 text-center">Cargando editor...</div>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-10 mb-20">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Editar Mi Perfil</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* --- SECCIÓN ARCHIVOS --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nueva Foto de Perfil</label>
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => setFotoFile(e.target.files[0])}
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Actualizar CV (PDF)</label>
                        <input 
                            type="file" 
                            accept="application/pdf"
                            onChange={(e) => setCvFile(e.target.files[0])}
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                        />
                    </div>
                </div>

                {/* --- DATOS PERSONALES --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nombre</label>
                        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Apellido</label>
                        <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                        <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Carrera</label>
                        <input type="text" name="carrera" value={formData.carrera} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
                    </div>
                </div>

                {/* --- UBICACIÓN --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Provincia</label>
                        <input type="text" name="provincia" value={formData.provincia} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Localidad</label>
                        <input type="text" name="localidad" value={formData.localidad} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
                    </div>
                </div>

                {/* --- EXTRA --- */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
                    <input type="url" name="linkedinUrl" value={formData.linkedinUrl} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" placeholder="https://linkedin.com/in/tu-perfil" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Sobre mí</label>
                    <textarea name="sobreMi" rows="4" value={formData.sobreMi} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" placeholder="Cuéntanos sobre tus objetivos..."></textarea>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Habilidades (Separadas por comas)</label>
                    <input type="text" name="habilidades" value={formData.habilidades} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" placeholder="Javascript, React, Trabajo en equipo..." />
                </div>

                {/* --- BOTONES DE ACCIÓN --- */}
                <div className="flex justify-end gap-4 pt-4 border-t">
                    <button 
                        type="button" 
                        onClick={() => navigate('/mi-perfil')}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                        Cancelar
                    </button>
                    <button 
                        type="submit" 
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium shadow-md"
                    >
                        Guardar Cambios
                    </button>
                </div>
            </form>

            {/* --- MODALES DE FEEDBACK --- */}
            <ModalMensajeExito 
                isOpen={showSuccess} 
                title="¡Perfil Actualizado!"
                message={modalMessage}
                onClose={() => {
                    setShowSuccess(false);
                    navigate('/mi-perfil'); // Redirigir al dashboard al cerrar el éxito
                }} 
            />

            <ModalMensajeError 
                isOpen={showError} 
                title="Error"
                message={modalMessage}
                onClose={() => setShowError(false)} 
            />
        </div>
    );
}