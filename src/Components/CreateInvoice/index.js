import React, { useState, useEffect } from 'react';
import './CreateInvoice.css';
import { getAllProduct } from '../Api/product';
import { createOneInvoice } from '../Api/invoice';
import NavBar from '../NavBar';
import { useNavigate } from 'react-router-dom';

function CreateInvoice() {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch products from the API when the component mounts
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const token = await localStorage.getItem("token")

            const config = { headers: { "x-auth-token": token } }
            const response = await getAllProduct(config)
            setProducts(response.data);

        } catch (error) {
            console.error('Error fetching products:', error);
            if (error.response.data.message = "Invalid Authorization") {
                navigate("/")
            }
        }
    };

    const addProductToInvoice = (product) => {
        const updatedSelectedProducts = { ...selectedProducts };
        //  console.log(updatedSelectedProducts[product._id])

        if (updatedSelectedProducts[product._id]) {
            updatedSelectedProducts[product._id].quantity++;
        } else {
            updatedSelectedProducts[product._id] = {
                ...product,
                quantity: 1
            };
        }

        setSelectedProducts(updatedSelectedProducts);
        setTotalAmount(totalAmount + product.price);
    };

    const createInvoice = async () => {
        try {
            const token = await localStorage.getItem("token")
            const config = { headers: { "x-auth-token": token } }
            const invoiceProducts = Object.values(selectedProducts);

            if (invoiceProducts.length) {
                const response = await createOneInvoice({
                    products: invoiceProducts,
                    totalAmount: totalAmount
                }, config);
                console.log('Invoice created:', response.data);
                // Reset the state and show success message
                alert("Invoice generated Successfully")
                setSelectedProducts([]);
                setTotalAmount(0);
            }
        } catch (error) {
            console.error('Error creating invoice:', error);
            if (error.response.data.error.includes("Insufficient quantity for product")) {
                alert(error.response.data.error)
            }
            if (error.response.data.error.includes("Product with ID")) {
                alert(error.response.data.error)
            }
        }
    };

    const handleAddQuantity = async (product) => {
        try {
            const quantity = window.prompt("Set Quantiry")
            if (Number(quantity)) {
                const editQuqantity = { ...selectedProducts }

                if (editQuqantity[product._id]) {
                    setTotalAmount(totalAmount - (editQuqantity[product._id].quantity * product.price) + (product.price * quantity))
                    editQuqantity[product._id].quantity = quantity;
                } else {
                    editQuqantity[product.id] = {
                        ...product,
                        quantity: quantity
                    }
                    setTotalAmount(totalAmount + quantity * product.price)
                }
                setSelectedProducts(editQuqantity)
            }


        } catch (error) {
            console.error('Error adding quantity:', error);
        }

    }

    // Filter products based on the search term
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="create-invoice">
            <NavBar value={"product"} name={"Go to Products"} />

            <div className="container">
                <h2>Create Invoice</h2>
                <hr></hr>
                <div className="row">
                    <div className="col-md-6 mb-5">
                        <div className="search-bar mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="container">
                            <div className="row">
                                {filteredProducts.map((product, index) => (
                                    <div key={product._id} className="col-md-6">
                                        <div className="product mb-3">
                                            <h4>{product.name} <i className="bi bi-plus-circle-dotted" style={{ cursor: "pointer" }} onClick={() => handleAddQuantity(product)}></i></h4>
                                            <p>Price: ${product.price.toFixed(2)}</p>
                                            <button className="btn btn-primary" onClick={() => addProductToInvoice(product)}>
                                                Add to Invoice
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="invoice-summary">
                            <h3>Invoice Summary</h3>
                            <ul>
                                {Object.entries(selectedProducts).map(([productId, productData]) => (
                                    <li key={productId}>
                                        {productData.name} - Quantity: {productData.quantity} - Subtotal: ${(
                                            productData.price * productData.quantity
                                        ).toFixed(2)}
                                    </li>
                                ))}
                            </ul>
                            <p>Total Amount: ${totalAmount.toFixed(2)}</p>
                            <button className="btn btn-success" onClick={createInvoice}>
                                Create Invoice
                            </button>
                        </div>
                    </div>
                    {/* <div className="vertical-line">
                    </div> */}
                </div>
            </div>

            {/* ... (footer) */}
        </div>
    );
}

export default CreateInvoice;

