import axios from "axios"

const url = "http://localhost:9000"


export const login = async (payload) => {
    return await axios.post(`${url}/login`, payload)
}

export const authLogin = async (payloadToken) => {
    return await axios.post(`${url}/invoice/create`, payloadToken)
}