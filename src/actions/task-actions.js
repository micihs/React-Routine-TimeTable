export const REMOVE_TASK = 'REMOVE_TASK';
export const EDIT_TASK = 'EDIT_TASK';

export function editCourse(name, taskId, appointmentIds) {
    return { type: EDIT_TASK, course: { id: courseId, appointments: appointmentIds, name } };
}

export function removeCourse(courseId, appointmentIds) {
    return { type: REMOVE_TASK, courseId, appointmentIds };
};