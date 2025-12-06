import React, { useState } from 'react';

const ReviewForm = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        role: 'Full Stack Developer',
        comment: '',
        rating: 5
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: name === 'rating' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

    try {
        const response = await fetch('http://localhost:3000/api/resenas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (!response.ok) {
        throw new Error(data.message || 'Error al enviar la reseña');
    }

      // Llamar al callback con la nueva reseña
        onSubmit(data.review);
        onClose();
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
};

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Dejar una Reseña</h2>
            <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl leading-none"
            >
            ×
            </button>
        </div>

        {/* Error Message */}
        {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
            </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre *
                </label>
                <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Ej: María García"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
            </div>

          {/* Rol */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Rol o Posición
            </label>
            <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Ej: Frontend Developer"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
            </div>

          {/* Comentario */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Comentario *
            </label>
            <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                required
                rows="4"
                minLength="10"
                maxLength="500"
                placeholder="Cuéntanos sobre tu experiencia..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">
                {formData.comment.length}/500 caracteres (mínimo 10)
            </p>
            </div>

          {/* Rating */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Calificación *
            </label>
            <select
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            >
                <option value="5">⭐⭐⭐⭐⭐ - Excelente (5.0)</option>
                <option value="4">⭐⭐⭐⭐ - Muy bueno (4.0)</option>
                <option value="3">⭐⭐⭐ - Bueno (3.0)</option>
                <option value="2">⭐⭐ - Regular (2.0)</option>
                <option value="1">⭐ - Malo (1.0)</option>
            </select>
            </div>

          {/* Buttons */}
            <div className="flex gap-3 pt-4">
            <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-medium"
            >
                Cancelar
            </button>
            <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed transition-colors font-medium"
            >
                {loading ? 'Enviando...' : 'Enviar Reseña'}
            </button>
            </div>
        </form>
      </div>
    </div>
    );
};

export default ReviewForm;
