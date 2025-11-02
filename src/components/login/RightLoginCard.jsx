export default function RightLoginCard({ image }) {
  return (
    <div className="bg-purple rounded-3xl shadow-lg overflow-hidden border border-gray-200 h-full flex flex-col justify-between">
      <div className="relative bg-gradient-to-b from-white via-purple-100 to-purple-600 h-full p-8 flex flex-col justify-between">
        <div
          className="mask-radial-at-top bg-cover bg-center flex-1 flex items-center justify-center rounded-full relative"
          style={{ backgroundImage: `url(${image})` }}
        ></div>

        <div className="text-center text-white mt-8">
          <h2 className="text-3xl font-bold mb-2">¡Te damos la bienvenida a</h2>
          <h2 className="text-3xl font-bold">nuestro portal de pasantías!</h2>
        </div>
      </div>
    </div>
  );
}
