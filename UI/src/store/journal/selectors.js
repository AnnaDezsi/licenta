
import { createSelector } from 'reselect'

export const getJornalSelector = createSelector(
    [state => state], 
    state => state.journal 
)


  