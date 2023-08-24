import axios from "axios";

const url = "http://localhost:9000/product"

const token = localStorage.getItem("token")

const config = { headers: { "x-auth-token": token } }


export const addProduct = async (product) => {
    return await axios.post(`${url}/add`, product, config);
}

export const getAllProduct = async () => {
    return await axios.get(`${url}/getall`, config)
}

export const deleteOneProduct = async (productId) => {
    return await axios.delete(`${url}/deleteone/${productId}`, config)
}

export const editOneProduct = async (editedProduct, productId) => {
    console.log('check')
    return await axios.put(`${url}/editone/${productId}`, editedProduct, config)
}

export const findOneProduct = async (productId) => {
    return await axios.get(`${url}/findone/${productId}`, config)
}