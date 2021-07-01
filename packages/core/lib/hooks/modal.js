/* eslint-disable import/prefer-default-export */
import { useState } from 'react';

export function useModal() {
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(undefined);

  const handleShowModal = (id) => {
    setEditId(id);
    setShowModal(true);
  };

  const handleHideModal = () => setShowModal(false);

  return {
    showModal,
    editId,
    handleShowModal,
    handleHideModal,
  };
}
