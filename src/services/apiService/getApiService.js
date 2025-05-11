import axios from 'axios';
import Cookies from "js-cookie";
// export const defaultAPI = 'http://127.0.0.1:8000/api/v1/';
export const defaultAPI = 'https://awnams1.pythonanywhere.com/api/v1/';
axios.defaults.baseURL = defaultAPI;
export const token = Cookies.get('tokenOfUser')

export default axios.interceptors.request.use(
    (config) => {
        const token = Cookies.get("tokenOfUser"); // Get latest token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            config.headers["Content-Type"] = `application/json`;
            config.headers.Accept = `application/json`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export const fetchUsers = () => axios.get("user");
export const fetchUserID = (idUser) => axios.get(`user/${idUser}`);
export const addUser = () => axios.get(`user/`);
export const fetchAssets = () => axios.get("assets");
export const fetchAssetID = (idAsset) => axios.get(`assets/${idAsset}`);

export const fetchBrands = () => axios.get("brand");
export const fetchBrandID = (idBrand) => axios.get(`brand/${idBrand}`);
export const fetchCategories = () => axios.get("category");
export const fetchCategoryID = (idCategory) => axios.get(`category/${idCategory}`);
export const fetchCompanies = () => axios.get("company");
export const fetchCompanyID = (idCompany) => axios.get(`company/${idCompany}`);
export const fetchDepartments = () => axios.get("department");
export const fetchDepartmentID = (idDepartment) => axios.get(`department/${idDepartment}`);
export const fetchAssetsImages = () => axios.get("assets_images");

/*
export const fetchUsers = () => axios.get(`${defaultAPI}users`, {
    headers:{
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
    },

});

*/

export const fetchBranches = () => axios.get("branches");
export const fetchShifts = () => axios.get("shifts");
export const fetchInvoiceType = () => axios.get("invoice_types");
export const fetchRoles = () => axios.get("roles");
