import React from 'react'

const EditableRow = ({ editFormData, handleEditFormChange, handleCancelClick}) => {
    return (
        <tr>
            <td>
                <input type="text"
                required="required"
                placeholder="Enter a ID..."
                name="nameId"
                value={editFormData.nameId}
                onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
            <input type="text"
                required="required"
                placeholder="Enter a title..."
                name="title"
                value={editFormData.title}
                onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
            <input type="text"
                required="required"
                placeholder="Enter an isbn number..."
                name="isbn"
                value={editFormData.isbn}
                onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
            <input type="author"
                required="required"
                placeholder="Enter an author..."
                name="author"
                value={editFormData.author}
                onChange={handleEditFormChange}
                ></input>
            </td>
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
        </tr>
    )
}

export default EditableRow;