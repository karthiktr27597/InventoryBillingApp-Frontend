import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { editOneProduct, findOneProduct } from '../Api/product';
import NavBar from '../NavBar';

function EditProductPage() {

    const { id } = useParams()
    const [editedProduct, setEditedProduct] = useState({
        name: '',
        description: '',
        quantity: 0,
        price: 0
    });

    const navigate = useNavigate();

    const fetchProduct = async (id) => {
        try {
            const token = await localStorage.getItem("token")

            const config = { headers: { "x-auth-token": token } }

            const response = await findOneProduct(id, config)
            setEditedProduct(...response.data);
            // console.log(response.data)
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };


    useEffect(() => {
        fetchProduct(id)
    }, [id]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleSaveEdit = async (e) => {
        try {
            e.preventDefault()
            
            const token = await localStorage.getItem("token")
            const config = { headers: { "x-auth-token": token } }

            const response = await editOneProduct(editedProduct, id, config);
            console.log('Product updated:', response.data);

            // Redirect back to product list with a success message
            sessionStorage.setItem("successMessage", "Product Updated Successfully")
            //  navigate("/products", { state: { successMessage: "Product updated successfully" } })
            navigate("/products")

        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div>
            <NavBar value={"invoice"} name={"Create Invoice"} />

            <div className="container mt-5">
                <h2>Edit Product</h2>
                {editedProduct ? (
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={editedProduct.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                value={editedProduct.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="quantity" className="form-label">Quantity</label>
                            <input
                                type="number"
                                className="form-control"
                                id="quantity"
                                name="quantity"
                                value={editedProduct.quantity}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price</label>
                            <input
                                type="number"
                                className="form-control"
                                id="price"
                                name="price"
                                value={editedProduct.price}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="button" className="btn btn-success" onClick={(e) => handleSaveEdit(e)}>
                            Save
                        </button>
                    </form>
                ) : (
                    <p>Loading product details...</p>
                )}
            </div>
        </div>
    );
}

export default EditProductPage;




