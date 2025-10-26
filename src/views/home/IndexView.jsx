import { useEffect, useState } from "react" // Hooks de React
import { authTest } from "../../API/AuthAPI" // Funcion para hacer la peticion al backend
import Hero from "../../components/home/Hero"
import CompaniesSection from "../../components/home/CompaniesSection"
import JobOffers from "../../components/home/JobOffers"
import Testimonials from "../../components/home/Testimonials"
import ContactForm from "../../components/home/ContactForm"

export default function IndexView() {
    // // useState o Estados sirve para manejar variables "reactivas" -> (que React vigila) que cambian y actualizan la vista
    // const [message, setMessage] = useState('Cargando...') // Estado para almacenar el mensaje de la respuesta
    // const [error, setError] = useState(null) // Estado para almacenar el error

    // // useEffect es un hook que se ejecuta cuando el componente se monta (cuando se renderiza/actualiza) o se cambian dependencias -> []
    // useEffect(() => {
    //     // Funcion asincronica que prueba la conexion con el back
    //     const testConnection = async () => {
    //         try {
    //             const data = await authTest() // llamamos al back
    //             setMessage(data.message) // Guardamos el mensaje de respuesta en el estado
    //         } catch (error) {
    //             console.error("Error al conectarse con el backend: ", error)
    //             setError(" No se pudo conectar con el servidor") // Guardamos el error en el estado
    //         }
    //     }
    //     testConnection()
    // }, []) // [] es un array de dependencias, en este caso vacio porque no depende de nada | significa que solo se ejecuta una vez (cuando el componente se carga)

    // return ( // define lo que se muestra en pantalla
    //     <>  
    //         <div className="p-10">
    //             <h1 className="text-3xl font-bold">Probando conexión Front con el Back</h1>
    //             <p className="mt-4 text-xl">
    //                 Respuesta del servidor:
    //                 <span className={`font-bold ${error ? 'text-red-500' : 'text-green-500'}`}>
    //                     {error ? error : ` "${message}"`}
    //                 </span>
    //             </p>
    //         </div>


    //     </>
    // )

    return (
        <>
            <Hero />
            <CompaniesSection />
            <JobOffers />
            <Testimonials />
            <ContactForm />
        </>
    )
}
