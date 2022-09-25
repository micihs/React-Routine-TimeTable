import * as R from 'ramda';
import Moment from 'moment';
import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';
import { extendMoment } from 'moment-range';

import { ADD_APPOINTMENTS, REMOVE_APPOINTMENTS } from '../actions/appointment-actions';
import { REMOVE_COURSE } from '../actions/course-actions';
import { WEEKLY, BIWEEKLY } from '../lib/recurrence';

const moment = extendMoment(Moment);

export const AppointmentsPerDay = [];

const INITITAL_STATE = {};

export default function reducer(
    state = INITITAL_STATE,
    action,
) {
    switch (action.type) {
      case ADD_APPOINTMENTS:
        return {
          ...state,
          ...action.appointments,
        };
      case REMOVE_APPOINTMENTS:
        return R.omit(action.appointmentIds, state);
      case REMOVE_COURSE:
        return R.omit(action.appointmentIds, state);
      default:
        return state;
    }
}

function isAppointmentOfWeek(appointment, weekStart) {
    const { startdate, enddate, recurrence } = appointment;
  
    const dayOfAppoinment = startdate.weekday();
    const appointmentRecursThisWeek =
      recurrence === WEEKLY ||
      (recurrence === BIWEEKLY &&
        weekStart
          .clone()
          .weekday(dayOfAppoinment)
          .diff(startdate, 'weeks') %
          2 ===
          0);
  
    const currentWeekRange = weekStart.clone().range('week');
    const appointmentRange = moment.range(startdate, enddate);
  
    return (
      currentWeekRange.overlaps(appointmentRange) && appointmentRecursThisWeek
    );
}


function getTimeOnFixedDate(time) {
    return time
      .clone()
      .year(2000)
      .month(1)
      .day(1);
}

function findFirstIndexLaterStart(
    appointmentArray,
    appointmentToInsert,
) {
    return appointmentArray.findIndex(appointment => {
      const currentStartTime = getTimeOnFixedDate(appointment.starttime);
      const toInsertStartTime = getTimeOnFixedDate(appointmentToInsert.starttime);
      if (currentStartTime.isSame(toInsertStartTime, 'minutes')) {
        const currentEndTime = getTimeOnFixedDate(appointment.endtime);
        const toInsertEndTime = getTimeOnFixedDate(appointmentToInsert.endtime);
        return currentEndTime.isAfter(toInsertEndTime, 'minutes');
      }
      return currentStartTime.isAfter(toInsertStartTime, 'minutes');
    });
}

function insertSortedByTime(
    appointmentArray,
    appointmentToInsert,
) {
    const insertIndex = findFirstIndexLaterStart(
      appointmentArray,
      appointmentToInsert,
    );
    if (insertIndex === -1) {
      appointmentArray.push(appointmentToInsert);
    } else {
      appointmentArray.splice(insertIndex, 0, appointmentToInsert);
    }
}

function mapAppointmentsToIndex(
    appointments,
    weekStart,
) {
    const days = Array(7)
      .fill(null)
      .map(() => []);
    R.values(appointments).forEach(appointment => {
      const dayOfAppoinment = appointment.startdate.weekday();
      if (isAppointmentOfWeek(appointment, weekStart)) {
        insertSortedByTime(days[dayOfAppoinment], appointment);
      }
    });
    return days;
}

const momentSelector = createMomentSelector(
    [(state, week) => week],
    (week) => week,
);

const createMomentSelector = createSelectorCreator(
    defaultMemoize,
    (a, b) => a.isSame(b, 'day'),
);

export function makeGetSortedAppointmentsPerDay() {
    
}