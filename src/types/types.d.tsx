declare type AddAppointmentsAction = {
    type: 'ADD_APPOINTMENTS',
    appointments: AppointmentsState,
  };
  
  declare type RemoveAppointmentsAction = {
    type: 'REMOVE_APPOINTMENTS',
    appointmentIds: Array<string>,
    courseId: string,
  };
  
  declare type EditCourseAction = {
    type: 'EDIT_COURSE',
    course: Course,
  };
  
  declare type RemoveCourseAction = {
    type: 'REMOVE_COURSE',
    courseId: string,
    appointmentIds: Array<string>,
  };
  
  declare type Action =
    | AddAppointmentsAction
    | RemoveAppointmentsAction
    | EditCourseAction
    | RemoveCourseAction;
  
  declare type ApplicationState = {
    form: Object,
    appointments: AppointmentsState,
    courses: CoursesState,
  };
  
  declare type AppointmentsState = { [id: string]: Appointment };
  
  declare type AppointmentInput = {
    startdate,
    enddate,
    starttime,
    endtime,
    recurrence: 'WEEKLY' | 'BIWEEKLY',
    location?: string,
    type?: string, // eg. lecture, tutorial
  };
  
  declare type Appointment = AppointmentInput & {
    id: string,
    course: string,
  };
  
  declare type CoursesState = { [id: string]: Course };
  
  declare type Course = {
    id: string,
    name: string,
    appointments: Array<string>,
  };
  
  declare type Weekday = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';