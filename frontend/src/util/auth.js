import { redirect } from "react-router-dom"

export function getTokenDuration() {
    //get remaining lifetime of token
    const storedExpirationDate = localStorage.getItem('expiration')
    //convert to date object from isostring
    const expirationDate = new Date(storedExpirationDate)

    const now = new Date()

    const duration = expirationDate.getTime() - now.getTime() //ms

    return duration
}

export function getAuthToken() {
    const token = localStorage.getItem('token')
    const tokenDuration = getTokenDuration()

    if (!token) {
        return null
    }

    if (tokenDuration < 0) {
        return 'EXPIRED'
    }



    return token
}

export function tokenLoader() {
    return getAuthToken()
}

export function checkAuthLoader() {
    const token = getAuthToken()
    if (!token) {
        return redirect('/auth')
    }
    return null
}