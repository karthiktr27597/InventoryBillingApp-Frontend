import axios from "axios";

const url = "https://inventorybillingapp.onrender.com/invoice"


export const createOneInvoice = async (product, config) => {
    return await axios.post(`${url}/create`, product, config);
}

export const salesPermonth = async (config) => {
    return await axios.get(`${url}/salesreport`, config)
}

export const selectedSalesPermonth = async (selectedYear, selectedMonth, config) => {
    return await axios.get(`${url}/selected-salesreport?year=${selectedYear}&month=${selectedMonth}`, config)
}