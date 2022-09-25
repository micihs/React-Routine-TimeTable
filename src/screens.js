import { Navigation } from "react-native-navigation";
import { AppointmentFormScreen } from "./containers/AppointmentFormScreen";
import TaskFormScreen from "./containers/TaskFormScreen";
import EditSelectionScreen from "./containers/EditSelectionScreen";
import ReccurrencePickerScreen from "./containers/RecurrencePickerScreen";
import TimetableScreen from "./components/TimetableScreen";

export const APPOINTMENT_FORM = 'APPOINTMENT_FORM';
export const TASK_FORM = 'TASK_FORM';
export const EDIT_SELECTION = 'EDIT_SELECTION';
export const RECURRENCE_PICKER = 'RECURRENCE_PICKER';
export const TIMETABLE = 'TIMETABLE';

export default function registerScreens(store, Provider) {
    Navigation.registerComponent(APPOINTMENT_FORM, () => AppointmentFormScreen, store, Provider);
    Navigation.registerComponent(COURSE_FORM, () => TaskFormScreen, store, Provider);
    Navigation.registerComponent(EDIT_SELECTION, () => EditSelectionScreen, store, Provider);
    Navigation.registerComponent(RECURRENCE_PICKER, () => RecurrencePickerScreen, store, Provider);
    Navigation.registerComponent(TIMETABLE, () => TimetableScreen, store, Provider);
}