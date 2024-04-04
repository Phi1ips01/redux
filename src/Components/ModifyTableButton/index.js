import React from 'react';
import edit from '../../images/edit.png';
import del from '../../images/delete.png';
import { useDispatch } from 'react-redux';

const ModifyTableButton = ({ rowID, deleteAction, showOneRow }) => {
const dispatch = useDispatch()

  const handleDelete = () => {
    const result = window.confirm('Are you sure to delete this row?');
    if (result) {
      if (deleteAction) {
        dispatch(deleteAction(rowID));
      }
    }
  };

  const handleEdit = () => {
    console.log("handleedit",rowID)
    if (showOneRow) {
      dispatch(showOneRow(rowID));
    }
  };

  return (
    <div className='modify-table-button'>
      <button type="button" className="btn btn-primary edit" onClick={handleEdit}>
        <img src={edit} alt="Edit"/>
      </button>
      <button type="button" className="btn btn-danger delete" onClick={handleDelete}>
        <img src={del} alt="Delete"/>
      </button>
    </div>
  );
};

export default ModifyTableButton;
