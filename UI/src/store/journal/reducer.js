import { SET_INITIAL_MEDS, RESET_JOURNAL, ADD_MED, SET_ANALYZE_CATEGORIES, SET_INITIAL_ANALYSES    } from './action'

const initialState = {
    medicamentatie: {
        activeMeds: [],
        retroMeds: []
    },

    analyzes: {
        categoriiMedicale: [],
        submitted: []
    }
};

export const splitMedsBasedOnDate = (meds) => {
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
                medicamentatie: {
                    ...state.medicamentatie,
                    activeMeds: [...activeMeds],
                    retroMeds: [...retroMeds],
                },
            }
        }

        case ADD_MED: {
            const med = action.payload;
            const { activeMeds, retroMeds } = splitMedsBasedOnDate([med])
            return {
                ...state,
                medicamentatie: {
                    ...state.medicamentatie,
                    activeMeds: activeMeds.length ? [activeMeds[0], ...state.medicamentatie.activeMeds] : state.medicamentatie.activeMeds,
                    retroMeds: retroMeds.length ? [retroMeds[0], ...state.medicamentatie.retroMeds] : state.medicamentatie.retroMeds
                }
            }

        }

        case RESET_JOURNAL: {
            return initialState;
        }

        case SET_ANALYZE_CATEGORIES: {
            console.log(action.payload)
            return {
                ...state,
                analyzes: {
                    ...state.analyzes,
                    categoriiMedicale: action.payload
                }
            }
        }

        case SET_INITIAL_ANALYSES: {
            return {
                ...state,
                analyzes: {
                    ...state.analyzes,
                    submitted: action.payload
                }
            }
        }


        default:
            return state;
    }
};

export default journalReducer;
