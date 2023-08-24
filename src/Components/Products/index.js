import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './products.css';
import { deleteOneProduct, getAllProduct } from '../Api/product';
import EditProduct from '../EditProduct';
import NavBar from '../NavBar';

function Products() {
    const [products, setProducts] = useState([]);
    const successMessage = sessionStorage.getItem("successMessage");
    const navigate = useNavigate()

    useEffect(() => {
        // Fetch products from the API when the component mounts
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const token = await localStorage.getItem("token")
            const config = { headers: { "x-auth-token": token } }
            const response = await getAllProduct(config) // Adjust the API endpoint

            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            if (error.response.data.message = "Invalid Authorization") {
                navigate("/")
            }
        }
    };

    const deleteProduct = async (productId) => {
        try {
            const token = await localStorage.getItem("token")
            const config = { headers: { "x-auth-token": token } }

            await deleteOneProduct(productId, config);
            fetchProducts(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    window.addEventListener('click', () => {
        sessionStorage.removeItem('successMessage');
    });

    return (
        <div className="products">
            <NavBar value={"invoice"} name={"Create Invoice"} />
            {successMessage && (
                <div className='alert alert-success' role="alert">
                    {successMessage}
                </div>
            )}

            <div className="container">
                <h2>Manage Products</h2>
                <Link to="/addproduct" className="btn btn-primary mb-3">Add New Product</Link>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>${product.price.toFixed(2)}</td>
                                <td>
                                    <EditProduct product={product} />
                                    <span style={{ marginRight: "20px" }}></span>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteProduct(product._id)}
                                    >
                                        <i className="bi bi-trash3"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <footer className="bg-light text-center py-3">
                {/* ... (footer content) */}
            </footer>
        </div>
    );
}

export default Products;
