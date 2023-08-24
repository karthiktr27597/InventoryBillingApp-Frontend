import axios from "axios";

const url = "https://inventorybillingapp.onrender.com/product"


export const addProduct = async (product, config) => {
    return await axios.post(`${url}/add`, product, config);
}

export const getAllProduct = async (config) => {
    return await axios.get(`${url}/getall`, config)
}

export const deleteOneProduct = async (productId, config) => {
    return await axios.delete(`${url}/deleteone/${productId}`, config)
}

export const editOneProduct = async (editedProduct, productId, config) => {
    return await axios.put(`${url}/editone/${productId}`, editedProduct, config)
}

export const findOneProduct = async (productId, config) => {
    return await axios.get(`${url}/findone/${productId}`, config)
}