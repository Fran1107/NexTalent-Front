const jobData = [
    { id: 1, title: "Pasante IT Project", company: "Puma Group", skills: "Pasantia - Full Time", ubicacion: "Buenos Aires, Martinez (Hibrido)", initials: "PG" },
    { id: 2, title: "Desarrollador Full Stack Jr.", company: "Tech Solutions S.A.", skills: "Pasantia - Part Time", salary: "$1,800/mes", initials: "TS" },
    { id: 3, title: "Diseñador UX/UI", company: "Creative Studio", skills: "Trainee - Full Time", salary: "$1,500/mes", initials: "CS" },
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
                                <div className="w-12 h-20 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                                    <span className="text-gray-500">{job.initials}</span>
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
            </div>
        </section>
    );
}