import React from 'react'

const DeleteModal = ({setShowDeleteModal,handleDelete,bookTitle}) => {
  return (
    <div className='modal-wrapperr'>
    <div className='modall'>
        <h5>{bookTitle}Silmek Mi İstiyorsun?</h5>
        <button onClick={()=>setShowDeleteModal(false)} className='btn btn-warning'>Vazgeç</button>
        <button onClick={()=>handleDelete()} className='btn btn-success'>Onayla</button>
    </div>
    </div>
  )
}

export default DeleteModal