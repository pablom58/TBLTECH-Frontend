import { ENTRYPOINT } from '../config/entrypoint'

export const requestResetPassword = data => {
    return fetch(`${ENTRYPOINT}/auth/request/reset`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .catch(error => console.error(error))
}

export const resetPassword = data => {
    return fetch(`${ENTRYPOINT}/auth/reset/password`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .catch(error => console.error(error))
}