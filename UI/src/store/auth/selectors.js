
import { createSelector } from 'reselect'

export const authProfileSelector = createSelector(
    [state => state], 
    state => state.profile 
)