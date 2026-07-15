import Modal from './Modal.jsx';
import { IconTrash } from './Icons.jsx';

const ConfirmDialog = ({ title, message, confirmLabel = 'Elimina', onConfirm, onCancel }) => (
  <Modal title={title} onClose={onCancel}>
    <p>{message}</p>
    <div className="modal-actions">
      <button className="btn btn-outline" onClick={onCancel}>
        Annulla
      </button>
      <button className="btn btn-danger-solid" onClick={onConfirm}>
        <IconTrash size={16} /> {confirmLabel}
      </button>
    </div>
  </Modal>
);

export default ConfirmDialog;
