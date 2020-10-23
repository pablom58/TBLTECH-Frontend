import { ENTRYPOINT } from '../config/entrypoint'

export const register = data => {
    return fetch(`${ENTRYPOINT}/user`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .catch(error => console.error(error))
}

export const login = data => {
    return fetch(`${ENTRYPOINT}/user/login`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(error => console.error(error))
}

export const getUserInfo = () => {
    let token = localStorage.getItem('access_token')

    if(!token)
        return {
            status: 401,
            message: 'An error ocurred please logout and try again'
        }

    return fetch(`${ENTRYPOINT}/user`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                },
            })
                .then(response => response.json())
                .catch(error => console.error(error))
}

export const updateUser = data => {
    let token = localStorage.getItem('access_token')

    if(!token)
        return {
            status: 401,
            message: 'An error ocurred please logout and try again'
        }

    return fetch(`${ENTRYPOINT}/user`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .catch(error => console.error(error))
}