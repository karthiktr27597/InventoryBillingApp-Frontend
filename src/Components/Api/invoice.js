import axios from "axios";

const url = "https://inventorybillingapp.onrender.com/invoice"

const token = localStorage.getItem("token")

const config = { headers: { "x-auth-token": token } }


export const generateInvoice = async (product) => {
    // console.log(product);
    return await axios.post(`${url}/generate`, product, config);
}

export const createOneInvoice = async (product) => {
    // console.log(product);
    return await axios.post(`${url}/create`, product, config);
}

export const salesPermonth = async () => {
    return await axios.get(`${url}/salesreport`, config)
}

export const selectedSalesPermonth = async (selectedYear, selectedMonth) => {
    return await axios.get(`${url}/selected-salesreport?year=${selectedYear}&month=${selectedMonth}`, config)
}