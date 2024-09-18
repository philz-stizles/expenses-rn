import axios from 'axios';

const API_KEY = 'AIzaSyDRsXcf-_W-ej2sKPXVFTjX0dcZa9HqQgE';
const BACKEND_URL = 'https://devdezyn-f8967-default-rtdb.firebaseio.com';

async function authenticate(mode, credentials) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: credentials?.email,
    password: credentials?.password,
    returnSecureToken: true,
  });

  return response.data.idToken;
}

export async function createUser(credentials) {
  return authenticate('signUp', credentials);
}

export async function login(credentials) {
  return authenticate('signInWithPassword', credentials);
}

export async function storeExpense(data) {
  const response = await axios.post(`${BACKEND_URL}/expenses.json`, data);

  return response?.data?.name;
}

export async function getExpenses() {
  const response = await axios.get(`${BACKEND_URL}/expenses.json`);

  return response?.data
    ? Object.keys(response.data).map((key) => {
        const data = response.data[key];
        return {
          id: key,
          ...data,
          date: new Date(data.date),
        };
      })
    : [];
}

export async function updateExpense(id, data) {
  return axios.put(`${BACKEND_URL}/expenses/${id}.json`, data);
}

export async function deleteExpense(id) {
  return axios.delete(`${BACKEND_URL}/expenses/${id}.json`);
}
