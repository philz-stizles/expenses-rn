import axios from 'axios';

const API_KEY = '';
const AUTH_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:';
const BACKEND_URL = 'https://devdezyn-f8967-default-rtdb.firebaseio.com';

export async function createUser(credentials) {
  const response = axios.post(`${AUTH_URL}/signUp?key=${API_KEY}`, {
    ...credentials,
    returnSecureToken: true,
  });

  console.log(response?.data);

  return response?.data?.name;
}

export async function storeExpense(data) {
  const response = axios.post(`${BACKEND_URL}/expenses.json`, data);

   console.log(response);

  return response?.data?.name;
}

export async function getExpenses() {
  const response = await axios.get(`${BACKEND_URL}/expenses.json`);

  return response && response.data
    ? Object.keys(response.data).map(
        (key) => ({ id: key, ...response.data[key] }))
    : [];
}

export async function updateExpense(id, data) {
  return axios.put(`${BACKEND_URL}/expenses/${id}.json`, data);
}

export async function deleteExpense(id) {
  return axios.delete(`${BACKEND_URL}/expenses/${id}.json`);
}
