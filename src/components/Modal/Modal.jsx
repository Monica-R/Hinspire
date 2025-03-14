import React, { useState } from 'react';
import './Modal.css';

function Modal({ story, token, onDelete, onUpdate, onConfirm, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: story.title,
    description: story.description,
  });

  // Determinar qué tipo de modal mostrar basado en qué función se pasó
  const isDeleteModal = !!onDelete;
  const isUpdateModal = !!onUpdate;
  const isConfirmModal = !!onConfirm;

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isDeleteModal) {
      await onDelete(story._id, token);
    } else if (isUpdateModal) {
      // Pasar los datos del formulario a la función de actualización
      await onUpdate(story._id, formData.title, formData.description, token);
    } else if (isConfirmModal) {
      await onConfirm(story._id, token);
    }
    
    closeModal();
  };

  return (
    <>
      {/* Ahora usamos children como trigger para abrir el modal */}
      <div onClick={openModal} className="modal-trigger">
        {children || (isDeleteModal ? "🗑️ Eliminar" : "✏️ Editar")}
      </div>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>×</button>
            
            {isDeleteModal && (
              <div className="delete-confirmation">
                <h3>¿Estás seguro de que quieres eliminar esta historia?</h3>
                <p>Título: {story.title}</p>
                <div className="modal-buttons">
                  <button className='cancel' onClick={closeModal}>Cancelar</button>
                  <button className="delete-confirm" onClick={handleSubmit}>Eliminar</button>
                </div>
              </div>
            )}
            
            {isUpdateModal && (
              <form className='form-upd' onSubmit={handleSubmit}>
                <h3>Actualizar historia</h3>
                <div className="form-group">
                  <label htmlFor="title">Título:</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Contenido:</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="modal-buttons">
                  <button type="button" onClick={closeModal}>Cancelar</button>
                  <button type="submit">Actualizar</button>
                </div>
              </form>
            )}

            {isConfirmModal &&
              <div className="delete-confirmation">
              <h3>¿Estás seguro de que quieres terminar la historia?</h3>
                <div className="modal-buttons">
                  <button onClick={closeModal}>Cancelar</button>
                  <button className="finish-confirm" onClick={handleSubmit}>Terminar</button>
                </div>
              </div>
            }
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;