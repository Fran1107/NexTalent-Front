import Estadisticas from "../../components/home-empresas/Estadisticas";
import HeroBanner from "../../components/home-empresas/HeroBanner";

export default function IndexEmpresasView() {

    return (
        <>
            <div className="w-full">
                <HeroBanner image="/img/people-background.jpg" />
            </div>
            <div className="bg-[#4D1874] w-full py-6">
                <div className="flex flex-col sm:flex-row sm:flex-wrap justify-around items-center gap-6 text-center">
                    <Estadisticas h2="+20.000" p="Empresas registradas" />
                    <Estadisticas h2="+50.000" p="CV cargados" />
                    <Estadisticas h2="+10.000" p="Postulaciones mensuales" />
                    <Estadisticas h2="+10.000" p="Avisos publicados" />
                </div>
            </div>

        </>
    )
}