import { NavLink } from 'react-router-dom'
import { WhatsappLogoIcon, FacebookLogoIcon, InstagramLogoIcon,EnvelopeSimpleIcon } from '@phosphor-icons/react';

export default function Footer() {
    return (
        <footer className="bg-white text-center text-black font-semibold border-y-3 border-[#4D1874]">
            <div className="py-4 max-w-5xl mx-auto px-4 text-center">
                <h2 className= "text-4xl font-bold my-4">Conectemos</h2>
                <div className="flex justify-center flex-wrap mb-8 py-4 gap-x-25 gap-y-10">
                            <a href=""className="transition-transform transform hover:scale-125 duration-300"><WhatsappLogoIcon size={32} color='#4D1874'/> </a>
                            <a href=""className="transition-transform transform hover:scale-125 duration-300"><FacebookLogoIcon size={32} color='#4D1874'/></a>
                            <a href=""className="transition-transform transform hover:scale-125 duration-300"><InstagramLogoIcon size={32} color='#4D1874'/></a>
                            <a href=""className="transition-transform transform hover:scale-125 duration-300"><EnvelopeSimpleIcon size={32} color='#4D1874'/></a>
                </div>
                <div className="border-y-2 border-[#4D1874] py-4">
                    <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-y-4 place-items-center font-bold text-center">
                        <li className='px-2'><NavLink to="/" className="block whitespace-nowrap hover:text-[#4D1874] transition-transform transform hover:scale-125 duration-300">Inicio</NavLink></li>
                        <li className='px-2'><NavLink to="/quienessomos" className="block whitespace-nowrap hover:text-[#4D1874] transition-transform transform hover:scale-125 duration-300">Quienes somos</NavLink></li>
                        <li className='px-2'><NavLink to="/preguntas" className="block whitespace-nowrap hover:text-[#4D1874] transition-transform transform hover:scale-125 duration-300">Preguntas frecuentes</NavLink></li>
                        <li className='px-2'><NavLink to="/oportunidades" className="block whitespace-nowrap hover:text-[#4D1874] transition-transform transform hover:scale-125 duration-300">Oportunidades</NavLink></li>
                        <li className='px-2'><NavLink to="/pasantias" className="block whitespace-nowrap hover:text-[#4D1874] transition-transform transform hover:scale-125 duration-300">Pasantías</NavLink></li>
                    </ul>   
                </div>  
            </div>
            <div className="bg-[#4D1874] text-center py-4 mt-8">
                <p className="text-white text-sm font-bold">
                    &copy; 2025 NexTalent. Todos los derechos reservados.
                </p>
            </div>
        </footer> 

)}