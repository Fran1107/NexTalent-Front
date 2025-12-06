import React, { useState, useEffect } from 'react';
import { User, Quote, Star, Edit } from 'lucide-react';
import ReviewForm from '../review/ReviewForm';

// Componente auxiliar para renderizar estrellas
const StarRating = ({ rating }) => {
  const maxStars = 5;
  const fullStars = Math.floor(rating);

  return (
    <div className="flex items-center space-x-0.5 text-lg">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} size={18} fill="#FFC400" strokeWidth={0} />
      ))}
      {[...Array(maxStars - fullStars)].map((_, i) => (
        <Star key={i} size={18} className="text-gray-300" strokeWidth={1} />
      ))}
    </div>
  );
};

//Datos por defecto por si falla la conexión
const testimonialsData = [
  { id: <User size={80} />, user: 'Omar Luna', role: 'Full Stack Developer', quote: 'Mi experiencia fue increíble, conseguí mi primer trabajo gracias a la plataforma..."', rating: 5 },
  { id: <User size={80} />, user: 'Fiorela Salica', role: 'Full Stack Developer', quote: 'Mi experiencia fue muy buena ya que conseguí mi primer empleo en el sector IT. El proceso de selección fue muy rápido..."', rating: 5.0 },
  { id: <User size={80} />, user: 'Irina Pontiroli', role: 'Full Stack Developer', quote: 'Conseguí mi primer oportunidad laboral gracias a una postulación que realice por medio de esta página, me siento muy contenta..."', rating: 4.0 },
];

export default function Testimonials() {
  const [openForm, setOpenForm] = useState(false);
  // Estado para las reseñas
  const [reviews, setReviews] = useState(testimonialsData);

  // Cargar reseñas del backend
  useEffect(() => {
    fetchReviews();
  }, []);

  //Función para obtener reseñas destacadas
  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/resenas/highlighted');
      
      if (response.ok) {
        const data = await response.json();
        
        // Mapear los datos del backend al formato del frontend
        if (data.length > 0) {
        const formattedReviews = data.map(review => ({
          id: <User size={80} />,
          user: review.name,
          role: review.role,
          quote: review.comment,
          rating: review.rating
        }));
            setReviews(formattedReviews);
      }
        
        setReviews(formattedReviews);
      }
    } catch (error) {
      console.error('Error al cargar reseñas:', error);
      // Si falla, mantiene los datos por defecto
    }
  };

  // Manejar nueva reseña enviada
  const handleSubmitReview = (newReview) => {
    console.log("Nueva reseña:", newReview);
    // Recargar las reseñas después de enviar una nueva
    fetchReviews();
  };

  return (
    <section className="py-20 bg-[#ffffff] text-black">
      <div className="container mx-auto px-4">

        <h2 className="text-4xl font-bold text-center mb-4">
          Comentarios Destacados
        </h2>
        <p className="text-center text-black text-base max-w-2xl mx-auto mb-16">
          Lo que dicen nuestros pasantes sobre sus primeras experiencias laborales.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((item, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-2xl border border-[#4D1874] flex flex-col justify-between">

              <div className="grow">
                <div className="flex items-center mb-6">
                  <div className="mr-4 text-[#4D1874]">{item.id}</div>
                  <div>
                    <h4 className="font-bold text-lg">{item.user}</h4>
                    <p className="text-black">{item.role}</p>
                  </div>
                </div>
                <div className="mb-4 text-[#4D1874] flex justify-between">
                  <Quote size={32} />
                </div>

                <p className="text-black text-lg leading-relaxed mb-6 text-center">
                  {item.quote}
                </p>
              </div>

              <div className="flex items-center pt-4 border-t border-gray-100 justify-center">
                <p className="text-lg font-semibold mr-3">
                  {item.rating.toFixed(1)}
                </p>
                <StarRating rating={item.rating} />
              </div>
            </div>
          ))}
        </div>

        <div className="text-right mt-12">
          <button
            onClick={() => setOpenForm(true)}
            className="inline-flex items-center px-6 py-3 rounded-full text-white bg-[#4D1874] hover:bg-[#6A3391] shadow-lg"
          >
            <Edit size={20} className="mr-2" />
            Dejar una Reseña
          </button>
        </div>
      </div>

      {openForm && (
        <ReviewForm
          onClose={() => setOpenForm(false)}
          onSubmit={handleSubmitReview} 
        />
      )}
    </section>
  );
}


                
//                 {/* Grid de Testimonios */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
//                     {testimonialsData.map((item, index) => (
//                         <div 
//                             key={index} 
//                             // Tarjeta: Borde morado y layout flex para pegar la calificación abajo
//                             className="bg-white rounded-xl p-8 shadow-2xl transition-transform duration-300 hover:scale-[1.02] border border-[#4D1874] flex flex-col justify-between"
//                         >
//                             {/* Contenedor principal del texto y perfil */}
//                             <div className="grow">
//                                 {/* 1. Bloque de Perfil (Icono + Nombre) */}
//                                 <div className="flex items-center mb-6">
//                                     <div className="mr-4 text-[#4D1874] shrink-0">
//                                         {item.id} 
//                                     </div>
//                                     <div>
//                                         <h4 className="font-bold text-lg">{item.user}</h4>
//                                         <p className="text-black">{item.role}</p>
//                                     </div>
//                                 </div>
//                                 {/* 2. ÍCONO DE COMILLAS */}
//                                 <div className="mb-4 text-[#4D1874] flex justify-between"> 
//                                     <Quote size={32} /> 
//                                 </div>

//                                 {/* 3. Cita: Texto principal (Clase corregida y sin comilla doble final) */}
//                                 <p className="text-black text-lg leading-relaxed mb-6 text-center">
//                                     {item.quote}"
//                                 </p>
//                             </div>

//                             {/* 4. Bloque de Calificación (Estrellas y Número) - Centrado */}
//                             <div className="flex items-center pt-4 border-t border-gray-100 justify-center">
//                                 {/* Muestra la calificación numérica con un decimal */}
//                                 <p className="text-lg font-semibold mr-3">{item.rating.toFixed(1)}</p>
//                                 {/* Muestra el componente de estrellas */}
//                                 <StarRating rating={item.rating} />
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* BOTÓN DE AGREGAR RESEÑA - AL FINAL Y ALINEADO A LA DERECHA */}
//                 <div className="text-right mt-12">
//                     <button
//                         onClick={handleLeaveReview}
//                         className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-[#4D1874] hover:bg-[#6A3391] transition duration-150 ease-in-out transform hover:scale-105"
//                     >
//                         <Edit size={20} className="mr-2" />
//                         Dejar una Reseña
//                     </button>
//                 </div>
//             </div>
//         </section>
//     );
//     }