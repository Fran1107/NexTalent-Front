export default function Header() {
const logoUrl = new URL('../assets/NexTalent-logo.png', import.meta.url).href;

return (
    <header className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-2">
                <a href="/" aria-label="Ir al inicio">
                    <img
                        src={logoUrl}
                        alt="NexTalent logotipo con la palabra NexTalent en morado y un emblema estilizado en N sobre fondo blanco, transmite una identidad profesional y moderna"
                        className="h-8 w-auto"
                    />
                </a>
                
            </div>

            <div className="flex items-center gap-6">
                <span className="text-sm font-semibold text-black">
                    Cuenta empresa
                </span>

                <div className="flex items-center gap-3">
                    <button className="bg-purple-900 text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-purple-800 transition">
                        Ingresar
                    </button>
                    <button className="border border-purple-900 text-purple-700 text-sm font-medium px-5 py-2 rounded-full hover:bg-purple-50 transition">
                        Crear cuenta
                    </button>
                </div>
            </div>
        </div>
    </header>
);
}
