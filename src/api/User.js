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