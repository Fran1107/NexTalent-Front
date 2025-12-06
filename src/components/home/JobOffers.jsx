import { Link } from "react-router-dom";

const jobData = [ 
    { id: 1, title: "Pasante IT Project", company: "Puma Group", skills: "Pasantia - Full Time", ubicacion: "Buenos Aires, Martinez (Hibrido)", initials: "PG", logo: "/img/puma-logo.webp" },
    { id: 2, title: "Pasantía – Zona Sur", company: "BBVA Argentina", skills: "Pasantia - Part Time", ubicacion: "Buenos Aires, City Bell (Presencial)", initials: "BV", logo: "/img/bbva-logo.jpg" },
    { id: 3, title: "Pasante IT", company: "Siemens", skills: "Pasantia - Full Time", ubicacion: "Buenos Aires (Remoto)", initials: "CS", logo:"/img/siemens-logo.webp" },
];

export default function JobOffers() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">

                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                    Ofertas Recientes
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobData.map((job) => (
                        <div key={job.id} className="bg-white rounded-xl shadow-md border p-6 hover:shadow-lg transition">
                            <div className="flex items-center mb-4">
                                <div className="w-30 h-18 bg-gray-200 rounded-lg flex items-center justify-center mr-4 overflow-hidden">
                                    {job.logo ? (
                                        <img 
                                            src={job.logo} 
                                            alt={`${job.company} logo`}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'flex';
                                            }}
                                        />
                                    ) : null}

                                    <div 
                                        className={`w-full h-full items-center justify-center bg-gray-200 text-gray-500 font-bold ${job.logo ? 'hidden' : 'flex'}`}
                                    >
                                        {job.initials}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-lg">{job.title}</h3>
                                    <p className="text-violet-800">{job.company}</p>
                                </div>
                            </div>

                            <p className="text-gray-500 mb-4">
                                {job.skills.split(" - ").map((skill, index) => (
                                    <span
                                        key={index}
                                        className={`inline-block px-3 py-1 rounded-full mr-2 ${
                                            index === 0 ? "bg-green-200 text-black" : "bg-purple-200 text-black"
                                        }`}
                                    >
                                        {skill.trim()}
                                    </span>
                                ))}
                            </p>

                            <div className="flex justify-between items-center">
                                <span className="text-black-600 font-semibold">{job.ubicacion}</span>
                                <button className="bg-violet-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-violet-900 transition">
                                    Aplicar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <Link 
                        to="/ofertas"
                        className="bg-violet-800 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-violet-900 transition"
                    >
                        Ver más ofertas
                    </Link>
                </div>

            </div>
        </section>
    );
}