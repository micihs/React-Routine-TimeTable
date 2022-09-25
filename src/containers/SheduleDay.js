import React from 'react';
import { connect } from 'react-redux';
import CourseAppointment from '../components/CourseAppointment';
import DayBorder from '../components/DayBorder';
import PropTypes from 'prop-types';

function renderTasksOfDay(props) {
    const { courses, appointmentsOfDay } = props;
    return appointmentsOfDay.map(appointment => {
      const course = courses[appointment.course];
      if (!course) {
        throw new Error(
          `The course of appointment ${appointment.id} does not exist`,
        );
      }
      return (
        <CourseAppointment
          name={course.name}
          starttime={appointment.starttime}
          endtime={appointment.endtime}
          location={appointment.location}
          type={appointment.type}
          key={appointment.id}
        />
      );
    });
};

export function TimetableDay(props) {
    const { appointmentsOfDay, day } = props;
    if (appointmentsOfDay.length !== 0) {
        return <DayBorder date={day}>{renderTasksOfDay(props)}</DayBorder>;
    }
    return null;
};

export default connect(mapStateToProps)(TimetableDay);