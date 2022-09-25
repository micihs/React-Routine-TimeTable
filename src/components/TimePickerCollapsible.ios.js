import React from 'react';
import { View } from 'react-native';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';
import CollapsibleField from './CollapsibleField';
import styles from './styles/TimePickerCollapsible.styles';
import PropTypes from 'prop-types';

const MINUTE_INTERVAL = 5;

const Input = {
    value: Date,
    onChange: (value) => {},
}

const State = {
    minuteInterval: 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30 ,
};

export default class TimePickerCollapsible extends React.Component {
    static PropTypes = {
        onCollapse: PropTypes.func,
        onExpand: PropTypes.func,
        starttime: {
            input: PropTypes.object,
            meta: PropTypes.object
        },
        endtime: {
            input: PropTypes.object,
            meta: PropTypes.object
        },
    };

    static defaultProps = {
        onCollapse: () => {},
        onExpand: () => {},
    };

    componentDidMount() {
        this.setState({
            minuteInterval: MINUTE_INTERVAL,
        });
    }

    collapse = () => {
        if (this._collapsibleRef) {
            this._collapsibleRef.collapse();
        }
    };

    expand = () => {
        if (this._collapsibleRef) {
          this._collapsibleRef.expand();
        }
    };

    _collapsibleRef;

    render() {
        const { starttime, endtime, ...rest } = this.props;
        const { minuteInterval } = this.state;
        const headerText =
          starttime.input.value &&
          endtime.input.value &&
          `${moment(starttime.input.value).format('LT')} - ${moment(
            endtime.input.value,
          ).format('LT')}`;
    
        return (
          <CollapsibleField
            ref={(collapsible) => {
              this._collapsibleRef = collapsible;
            }}
            headerText={headerText}
            meta={endtime.meta}
            {...rest}
          >
            <View style={styles.pickerContainer}>
              {/* $FlowIssue */}
              <DatePickerIOS
                {...starttime.input}
                date={starttime.input.value}
                onDateChange={starttime.input.onChange}
                mode="time"
                minuteInterval={minuteInterval}
                style={styles.picker}
              />
              <View style={styles.dash} />
              <DatePickerIOS
                {...endtime.input}
                date={endtime.input.value}
                onDateChange={endtime.input.onChange}
                mode="time"
                minuteInterval={minuteInterval}
                style={styles.picker}
              />
            </View>
          </CollapsibleField>
        );
      }


};
