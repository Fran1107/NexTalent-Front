import { MapPin, Briefcase, Building, Calendar, Clock, ArrowBendDownRightIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export default function DetallePostulacion({ postulacion }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 overflow-auto max-h-screen">
      {/* Logo y título */}
      <div className="flex items-start gap-4 mb-6 pb-6 border-b">
        <div className="w-20 h-20 flex items-center justify-center bg-white border rounded-lg shadow-sm shrink-0">
          <img
            src={postulacion.logo || "https://via.placeholder.com/80"}
            alt="logo"
            className="w-16 h-16 object-contain"
          />
        </div>
        
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {postulacion.titulo}
          </h2>
          <p className="text-purple-600 font-medium flex items-center gap-2">
            <Building size={18} />
            {postulacion.empresa || "Empresa desconocida"}
          </p>
        </div>
      </div>

      {/* Información básica */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-2 text-gray-700">
          <Briefcase size={18} className="text-purple-500" />
          <span className="text-sm">{postulacion.modalidad}</span>
        </div>
        
        {postulacion.duracion && (
          <div className="flex items-center gap-2 text-gray-700">
            <Clock size={18} className="text-purple-500" />
            <span className="text-sm">{postulacion.duracion}</span>
          </div>
        )}
        
        {postulacion.lugar && (
          <div className="flex items-center gap-2 text-gray-700 col-span-2">
            <MapPin size={18} className="text-purple-500" />
            <span className="text-sm">
              {postulacion.lugar.provincia}, {postulacion.lugar.localidad}
            </span>
          </div>
        )}
      </div>

      {/* Estado */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full">
          <span className={`w-2 h-2 rounded-full ${
            postulacion.estado === "Activa" ? "bg-green-500" : "bg-gray-400"
          }`} />
          <span className="text-sm font-medium text-green-700">
            {postulacion.estado === "Activa" ? "Activa" : "Cerrada"}
          </span>
        </div>
      </div>

      {/* Descripción */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Descripción
        </h3>
        <p className="text-gray-600 leading-relaxed whitespace-pre-line">
          {postulacion.descripcion}
        </p>
      </div>

      {/* Requisitos si existen */}
      {postulacion.requisitos && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Requisitos
          </h3>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">
            {postulacion.requisitos}
          </p>
        </div>
      )}

      {/* Botones de acción */}
      <div className="flex gap-3 pt-6 border-t">
        <Link
          to={`/postulaciones/${postulacion._id}`}
          className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-md transition-colors"
        >
          Ver postulación completa
          <ArrowBendDownRightIcon size={18} weight="bold" />
        </Link>
      </div>
    </div>
  );
}