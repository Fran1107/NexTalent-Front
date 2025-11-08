import React from 'react'
import { WhatsappLogoIcon } from '@phosphor-icons/react';


export default function ContactForm() {
    return (
        <section className="py-20 px-5 bg-[#F7F4FA] font-bold">
            <div className="container mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-3xl text-gray-800 mb-4">
                        ¿En qué podemos ayudarte?
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Déjanos tus datos y te contactaremos
                    </p>
                </div>
                <div className="mx-auto max-w-3xl flex flex-col md:flex-row rounded-2xl shadow-2x1 overflow-hidden border border-gray-100">
                    <div className="md:w-1/2">
                        <img
                            src="/img/formInicio..png"
                            alt="Formulario de contacto"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="md:w-1/2 flex items-center justify-center p-8 bg-[#744BA6]">
                        <form className="w-full max-w-md">
                            <div className="mb-6">
                                <label className="block text-white mb-2 font-medium">Email</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 rounded-lg bg-white border focus:outline-none focus:ring-2 focus:ring-[#4D1874]"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-white mb-2 font-medium">Mensaje</label>
                                <textarea
                                    rows="9"
                                    className="w-full px-5 py-3 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-[#4D1874] resize-none"
                                ></textarea>
                            </div>
                            
                            <button
                                type="submit"
                                className="w-full px-6 py-3 bg-white text-[#4D1874] rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 duration-300"
                            >
                                Enviar
                            </button>
                        </form>
                    </div>
                {/* <div className="absolute right-60 top-1/2 transform -translate-y-1/2 z-50 transition-transform hover:scale-125 duration-300 weight=fill">
                            <a href=""target="_blank" rel="noopener noreferrer"><WhatsappLogoIcon size={70} color='#4D1874'/></a>
                </div> */}
            </div>
            </div>
        </section>
    )
}