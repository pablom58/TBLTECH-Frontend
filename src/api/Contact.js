import { ENTRYPOINT } from '../config/entrypoint'

export const getPage = page => {
    let token = localStorage.getItem('access_token')

    if(!token)
        return {
            status: 401,
            message: 'An error ocurred please logout and try again'
        }

    return fetch(`${ENTRYPOINT}/contact/list/${page}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                },
            })
                .then(response => response.json())
                .catch(error => console.error(error))
}

export const create = data => {
    let token = localStorage.getItem('access_token')

    if(!token)
        return {
            status: 401,
            message: 'An error ocurred please logout and try again'
        }

    return fetch(`${ENTRYPOINT}/contact`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .catch(error => console.error(error))
}

export const getContact = contact_id => {
    let token = localStorage.getItem('access_token')

    if(!token)
        return {
            status: 401,
            message: 'An error ocurred please logout and try again'
        }

    return fetch(`${ENTRYPOINT}/contact/item/${contact_id}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                },
            })
                .then(response => response.json())
                .catch(error => console.error(error))
}

export const update = data => {
    let token = localStorage.getItem('access_token')

    if(!token)
        return {
            status: 401,
            message: 'An error ocurred please logout and try again'
        }

    return fetch(`${ENTRYPOINT}/contact`,{
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

export const remove = contact_id => {
    let token = localStorage.getItem('access_token')

    if(!token)
        return {
            status: 401,
            message: 'An error ocurred please logout and try again'
        }

    return fetch(`${ENTRYPOINT}/contact`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                },
                body: JSON.stringify({
                    contact_id
                })
            })
                .then(response => response.json())
                .catch(error => console.error(error))
}

export const getContactFilter = (page,email) => {
    let token = localStorage.getItem('access_token')

    if(!token)
        return {
            status: 401,
            message: 'An error ocurred please logout and try again'
        }

    return fetch(`${ENTRYPOINT}/contact/search`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,                    
                },
                body: JSON.stringify({
                    page,
                    email
                })
            })
                .then(response => response.json())
                .catch(error => console.error(error))
}