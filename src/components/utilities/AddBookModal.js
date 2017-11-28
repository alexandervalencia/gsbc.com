import React from 'react'
import ReactModal from 'react-modal'
import PropTypes from 'prop-types'
// import AddBookUtil from './AddBookUtil'

const AddBookModal = ({ book, handleAddBook, handleModalClose, showModal, onTitleChange }) => {
  return (
    <ReactModal
      contentLabel="Add Book Modal"
      isOpen={showModal}
    >
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="signInModalLabel">Add a Book to the Bookshelf</h5>

          <button aria-label="Close" className="close" onClick={handleModalClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <form id="addBookForm" onSubmit={handleAddBook}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="email">Book Title
                <input
                  className="form-control"
                  id="title"
                  name="title"
                  onChange={onTitleChange}
                  placeholder="Title"
                  required
                  type="title"
                  value={book}
                />
              </label>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-primary" type="submit">Add Book</button>
            <button className="btn btn-secondary" onClick={handleModalClose}>Cancel</button>
          </div>
        </form>
      </div>
    </ReactModal>
  )
}

AddBookModal.propTypes = {
  book: PropTypes.string,
  handleAddBook: PropTypes.func,
  handleModalClose: PropTypes.func,
  onTitleChange: PropTypes.func,
  showModal: PropTypes.bool,
}

export default AddBookModal
