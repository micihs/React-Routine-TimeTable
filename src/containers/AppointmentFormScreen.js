import * as React from 'react';
import { connect } from 'react-redux';
import { reduxForm, submit } from 'redux-form';
import moment from 'moment';
import AppointmentForm from '../components/AppointmentForm';
import validate from '../lib/validateAppointmentForm';
import { WEEKLY } from '../lib/recurrence';
import { RECURRENCE_PICKER } from '../screens';
import { navBar } from '../themes';


const DecoratedAppointmentForm = () => reduxForm({
    form: 'appointmentForm',
    validate,
  })(AppointmentForm);

  export class AppointmentFormScreen extends React.Component {
    static navigatorStyle = navBar;
    static navigatorButtons = {
      rightButtons: [
        {
          id: 'save',
          title: 'save',
        },
      ],
    };
  
    constructor(props) {
      super(props);
      this.props.navigator.setOnNavigatorEvent(this._handleNavigatorEvent);
    }
  
    _handleNavigatorEvent = event => {
      const { dispatch } = this.props;
      if (event.type === 'NavBarButtonPress') {
        if (event.id === 'save') {
          dispatch(submit('appointmentForm'));
        }
      }
    };
  
    _getInitialValues = (currentTime) => {
      const startOfHour = currentTime.clone().startOf('hour');
      const startOfDay = currentTime.clone().startOf('day');
      return {
        starttime: startOfHour,
        endtime: startOfHour.clone().add(1, 'hour'),
        startdate: startOfDay,
        enddate: startOfDay.clone().add(15, 'weeks'),
        recurrence: WEEKLY,
      };
    };
  
    render() {
      const { index, initialValues, navigator, onSubmit } = this.props;
      return (
        <DecoratedAppointmentForm
          onSubmit={values => onSubmit(values, index)}
          initialValues={{
            ...this._getInitialValues(moment()),
            ...initialValues,
          }}
          onRecurrencePress={input =>
            navigator.push({
              screen: RECURRENCE_PICKER,
              title: 'repeat',
              passProps: {
                input,
              },
            })
          }
        />
      );
    }
  }
  
  const ConnectedAppointmentFormScreen = (
    props,
  ) => connect()(AppointmentFormScreen);
  
  export default ConnectedAppointmentFormScreen;


