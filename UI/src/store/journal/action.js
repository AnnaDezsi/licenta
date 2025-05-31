export const SET_INITIAL_MEDS = "SET_INITIAL_MEDS"
export const ADD_MED = "ADD_MED"
export const RESET_JOURNAL = "RESET_JOURNAL"


export const setInitialMeds = (payload) => ({
    type: SET_INITIAL_MEDS,
    payload
})

export const addMed = (payload) => ({
    type: ADD_MED,
    payload
})

export const resetJournal = () => ({
    type: RESET_JOURNAL
})



