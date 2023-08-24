import React from 'react'
import { useNavigate } from 'react-router-dom'

function EditProduct({ product }) {
    const navigate = useNavigate();

    return (
        <button
            className="btn btn-info"
            onClick={() => navigate(`/edit-product/${product._id}`)}
        >
            <i className="bi bi-pencil-square"></i>
        </button>
    )
}

export default EditProduct
