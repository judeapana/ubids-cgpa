export default {
    name: 'GPA',
    namespaced: true,
    state() {
        return {
            valid: false,
            loading: false,
            initialState: {
                index: 1,
                courseName: 'Course',
                creditHours: 0,
                score: 0,
                gradePoint: 0
            },
            form: [
                {
                    index: 1,
                    courseName: 'Course',
                    creditHours: 0,
                    score: 0,
                    gradePoint: 0
                }
            ]
        }
    },
    getters: {
        getForm(state) {
            return state.form
        },
        getCourseNames(state) {
            return state.form.map(x => x.courseName)
        },
        getInitialState(state) {
            return state.initialState
        },
        getLoading(state) {
            return state.loading
        }
    },
    mutations: {
        setValid(state, payload) {
            state.valid = payload
        },
        setForm(state, payload) {
            state.form.push(payload)
        },
        setLoading(state, payload) {
            state.loading = payload
        },
        setRemove(state, payload) {
            state.form.splice(payload, 1)
        },
        setReset(state) {
            state.form = [state.initialState]
        }

    },
    actions: {
        a_Reset({commit}) {
            commit('setLoading', true)
            return new Promise(((resolve, reject) => {
                try {
                    commit('setLoading', false)
                    commit('setReset')
                    resolve(true)
                } catch (e) {
                    reject(e)
                }
            }))
        },
        a_AddForm({commit}, payload) {
            commit('setLoading', true)
            return new Promise(((resolve, reject) => {
                try {
                    commit('setForm', payload)
                    commit('setLoading', false)
                    resolve()
                } catch (e) {
                    commit('setLoading', false)
                    reject(e)
                }
            }))
        },
        a_RemoveForm({commit}, payload) {
            commit('setLoading', false)
            return new Promise((((resolve, reject) => {
                try {
                    commit('setRemove', payload)
                    resolve()
                } catch (e) {
                    reject(e)
                }
            })))

        },
        a_GetClass({commit}, payload) {
            commit('setLoading', true)
            return new Promise(((resolve, reject) => {
                try {
                    if (payload <= 1.49) {
                        commit('setLoading', false)
                        return "Failed";
                    } else if (payload <= 1.99) {
                        commit('setLoading', false)
                        return "Passed";
                    } else if (payload <= 2.49) {
                        commit('setLoading', false)
                        return "Third Class";
                    } else if (payload <= 3.49) {
                        commit('setLoading', false)
                        return "Second Class Lower";
                    } else if (payload <= 4.49) {
                        commit('setLoading', false)
                        return "Second Class Upper";
                    } else if (payload <= 5.0 && payload >= 4.5) {
                        commit('setLoading', false)
                        return "First Class";
                    } else {
                        commit('setLoading', false)
                        return "Not Found!!";
                    }
                } catch (e) {
                    reject(e)
                }
            }))
        },
        a_GetGPA({commit, state}, payload) {
            commit('setLoading', true)
            return new Promise(((resolve, reject) => {
                let totalCreditsHours, totalGradePoints;
                totalCreditsHours = state.form.reduce((total, x) => total + x.creditHours, 0);
                totalGradePoints = state.form.reduce((total, x) => total + (payload({score: x.score}) * x.creditHours), 0)
                console.log(totalCreditsHours)
                console.log(totalGradePoints)
                try {
                    commit('setLoading', false)
                    resolve((totalGradePoints / totalCreditsHours).toFixed(3))
                } catch (e) {
                    commit('setLoading', false)
                    reject(e)
                }
            }))
        }
    }
}
