// In your React component
import React, { useState } from 'react';
import { addProduct } from '../Api/product';
import NavBar from '../NavBar';

function AddProduct() {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: 0,
        quantity: 0,
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        // console.log(e.target)
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await localStorage.getItem("token")
            const config = { headers: { "x-auth-token": token } }

            const response = await addProduct(product, config)
            console.log('Product added:', response.data);
            // Clear the form or show a success message

            setProduct({
                name: '',
                description: '',
                price: 0,
                quantity: 0,
            })

            setSuccessMessage('Product added successfully')
            setErrorMessage(''); // Clear any previous error message

        } catch (error) {
            console.error('Error adding product:', error);
            // Show an error message
            setErrorMessage(error.response.data.message);
            setSuccessMessage(''); // Clear any previous success message
        }
    };

    return (
        <div>
            <NavBar value={"invoice"} name={"Create Invoice"} />

            <div className="container mt-5">
                <h2 className="mb-4">Add Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={product.name}
                            onChange={handleInputChange}
                            placeholder="Product Name"
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="Description" className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            name="description"
                            value={product.description}
                            onChange={handleInputChange}
                            placeholder="Product Description"
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input
                            type="number"
                            className="form-control"
                            name="price"
                            value={product.price}
                            onChange={handleInputChange}
                            placeholder="Product Price"
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="quantity" className="form-label">Quantity</label>
                        <input
                            type="number"
                            className="form-control"
                            name="quantity"
                            value={product.quantity}
                            onChange={handleInputChange}
                            placeholder="Product Quantity"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mt-2">Add Product</button>
                </form>

                {successMessage && <p className="mt-3 text-success">{successMessage}</p>}
                {errorMessage && <p className="mt-3 text-danger">{errorMessage}</p>}
            </div>
        </div>
    );
}

export default AddProduct;





