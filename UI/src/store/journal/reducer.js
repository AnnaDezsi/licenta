import { SET_INITIAL_MEDS, RESET_JOURNAL, ADD_MED } from './action'

const initialState = {
    activeMeds: [],
    retroMeds: [],
    analyzes: []
};

const splitMedsBasedOnDate = (meds) => {
    const activeMeds = [];
    const retroMeds = [];

    meds.forEach(med => {
        const currentDateTime = new Date();
        if (new Date(med.endDate) < currentDateTime) {
            retroMeds.push(med);
        } else {
            activeMeds.push(med);
        }
    })

    return { activeMeds, retroMeds }
}



const journalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIAL_MEDS: {
            const { activeMeds, retroMeds } = splitMedsBasedOnDate(action.payload);

            return {
                ...state,
                activeMeds,
                retroMeds,
            }
        }

        case ADD_MED: {
            const med = action.payload;
            const { activeMeds, retroMeds } = splitMedsBasedOnDate([med])
            return {
                ...state,
                activeMeds: activeMeds.length ? [activeMeds[0], ...state.activeMeds] : state.activeMeds,
                retroMeds: retroMeds.length ? [retroMeds[0], ...state.retroMeds] : state.retroMeds
            }

        }

        case RESET_JOURNAL: {
            return initialState;
        }


        default:
            return state;
    }
};

export default journalReducer;
