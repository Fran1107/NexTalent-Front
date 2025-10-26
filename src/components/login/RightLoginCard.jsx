
export default function RightLoginCard() {
    return (
          /* Columna derecha - Ilustración */
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-200">
            <div className="relative bg-gradient-to-b from-white via-purple-100 to-purple-600 h-full p-8 flex flex-col justify-between min-h-[600px]">
              {/* Ilustración */}
              <div className="mask-radial-at-top mask-radial-from-100% bg-[url(/img/chica-sentada.gif)] flex-1 flex items-center justify-center inset-0 bg-white rounded-full w-120 h-180 relative">
                {/* <div className=""> */}
                  {/* Círculo decorativo */}
                  
 

                {/* </div> */}
              </div>
              <div className=" "></div>

              {/* Texto de bienvenida */}
              <div className="text-center text-white mt-8">
                <h2 className="text-3xl font-bold mb-2">
                  ¡Te damos la bienvenida a
                </h2>
                <h2 className="text-3xl font-bold">
                  nuestro portal de pasantías!
                </h2>
              </div>
            </div>
          </div>
    )
}