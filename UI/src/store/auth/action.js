export const SET_AUTH_PROFILE = "SET_AUTH_PROFILE"
export const REMOVE_AUTH_PROFILE = "REMOVE_AUTH_PROFILE"

export const setAuthProfile = (payload) => ({
    type: SET_AUTH_PROFILE,
    payload
})

export const removeAuthProfile = () => ({
    type: REMOVE_AUTH_PROFILE
})