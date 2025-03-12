import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { updateStory } from '../services/stories';

const MySwal = withReactContent(Swal);

const EditStoryModal = ({ story, token, onUpdate }) => {
  const openModal = async () => {
    const { value: formValues } = await MySwal.fire({
      title: 'Edit Story',
      html: `
        <input id="swal-input-title" class="swal2-input" placeholder="Title" value="${story.title}">
        <textarea id="swal-input-description" class="swal2-textarea" placeholder="Description">${story.description}</textarea>
        <select id="swal-input-status" class="swal2-select">
          <option value="ongoing" ${story.status === "ongoing" ? "selected" : ""}>Ongoing</option>
          <option value="completed" ${story.status === "completed" ? "selected" : ""}>Completed</option>
        </select>
      `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          title: document.getElementById('swal-input-title').value,
          description: document.getElementById('swal-input-description').value,
          status: document.getElementById('swal-input-status').value,
        }
      },
      showCancelButton: true,
    });
    
    if (formValues) {
      try {
        const updatedStory = await updateStory(
          story._id,
          formValues.title,
          formValues.description,
          formValues.status,
          token
        );
        onUpdate(updatedStory);
        MySwal.fire('Updated!', 'Your story has been updated.', 'success');
      } catch (error) {
        MySwal.fire('Error!', 'There was an error updating the story.', 'error');
        console.error(error);
      }
    }
  };

  return (
    <button onClick={openModal}>
      Edit Story
    </button>
  );
};

export default EditStoryModal;
