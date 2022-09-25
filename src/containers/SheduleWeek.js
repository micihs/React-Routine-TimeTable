import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { makeGetSortedAppointmentsPerDay } from '../reducers/appointments';
import TimetableDay from './TimetableDay';
import { AppointmentsPerDay } from '../reducers/appointments';

export class TimeTableWeek extends React.Component {
    componentDidMount() {
        if (this.props.shouldCloseLaunchScreen) {
            SplashScreen.hide();
        }
    }

    render() {
        const { AppointmentsPerDay, week } = this.props;
        return (
            <View>
                {appointmentsPerDay.map((appointmentsOfDay, index) => {
                const dateString = week
                    .clone()
                    .weekday(index)
                    .format('dddd, LL');
                return (
                    <TimetableDay
                    day={dateString}
                    appointmentsOfDay={appointmentsOfDay}
                    key={dateString}
                    />
                );
                })}
            </View>
        );
    }
};

function makeMapStateToProps() {
    const getSortedAppointmentsPerDay = makeGetSortedAppointmentsPerDay();
    const mapStateToProps = (state, ownProps) => ({
      appointmentsPerDay: getSortedAppointmentsPerDay(state, ownProps.week),
    });
    return mapStateToProps;
}
  
const ConnectedTimetableWeek = (props) => connect(
    makeMapStateToProps,
)(TimetableWeek);
  
export default ConnectedTimetableWeek;