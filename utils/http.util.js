import axios from 'axios';

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const API_URL = process.env.EXPO_PUBLIC_API_URL;
const AUTH_BASE_URL = process.env.EXPO_PUBLIC_AUTH_BASE_URL;

async function authenticate(mode, credentials) {
  const url = `${AUTH_BASE_URL}${mode}?key=${API_KEY}`;

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
  const response = await axios.post(`${API_URL}/expenses.json`, data);

  return response?.data?.name;
}

export async function getExpenses() {
  const response = await axios.get(`${API_URL}/expenses.json`);

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
  return axios.put(`${API_URL}/expenses/${id}.json`, data);
}

export async function deleteExpense(id) {
  return axios.delete(`${API_URL}/expenses/${id}.json`);
}
