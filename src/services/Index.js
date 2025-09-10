import requests from "./httpServices";
export const LoginUser = async (data) => {
  return await requests.post(`users/login`, data);
};

// =================product  Start ===========
export const GetProduct = async () => {
  return await requests.get(`products`);   ;
}; 

export const CreateProduct = async (data) => {
  return await requests.post(`products`, data);
};
export const UpdateProduct = async (id, data) => {
  return await requests.put(`products/${id}`, data);
};
export const DeleteProduct = async (id) => {
  return await requests.delete(`products/${id}`);
};

export const CheckoutProduct = async (data) => {
  return await requests.post(`sales`, data);
};

export const GetSales = async () => {
  return await requests.get(`sales`);   ;
}; 