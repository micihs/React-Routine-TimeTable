import * as R from 'ramda';
import { createSelector } from 'reselect';
import { EDIT_TASK, REMOVE_TASK } from '../actions/task-actions';
import { REMOVE_APPOINTMENTS } from '../actions/appointment-actions';

const INITIAL_STATE = {};

export default function reducer(
    state = INITIAL_STATE,
    action,
) {
    switch (action.type) {
      case EDIT_COURSE:
        return {
          ...state,
          [action.course.id]: action.course,
        };
      case REMOVE_COURSE:
        return R.dissoc(action.courseId, state);
      case REMOVE_APPOINTMENTS:
        return R.evolve(
          {
            [action.courseId]: {
              appointments: R.without(action.appointmentIds),
            },
          },
          state,
        );
      default:
        return state;
    }
}

export const getCoursesSortedByName;