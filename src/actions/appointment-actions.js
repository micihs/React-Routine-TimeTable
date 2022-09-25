// @flow
export const REMOVE_APPOINTMENTS = 'REMOVE_APPOINTMENTS';
export const ADD_APPOINTMENTS = 'ADD_APPOINTMENTS';

export function appAppointments(appointments) {
    return {type: ADD_APPOINTMENTS, appointments};
}

export function removeAppointments(appointmentIds, courseId) {
    return { type: REMOVE_APPOINTMENTS, appointmentIds, courseId }
};