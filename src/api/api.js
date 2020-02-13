import env from 'react-native-config'
import axios from 'react-native-axios'

export const login = async (body) => {
    const url = `${env.API_URL}/users/authenticate`
    return axios.post(url, body)
} 

export const register = async (body) => {
    const url = `${env.API_URL}/users/register`
    return axios.post(url, body)
} 

export const createTask = async (body, token) => {
    const url = `${env.API_URL}/tasks`
    const config = { 
        headers: {
            Authorization: `Bearer ${token}` 
        }
    }
    return axios.post(url, body, config)
}

export const updateTask = async (id, body, token) => {
    const url = `${env.API_URL}/tasks/${id}`
    const config = { 
        headers: {
            Authorization: `Bearer ${token}` 
        }
    } 
    return axios.patch(url, body, config)
}