
import { createSelector } from 'reselect'

export const profileEmailSelector = createSelector(
    [state => state.auth], 
    auth => auth.email
)