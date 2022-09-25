import React from 'react';
import { Picker, View } from 'react-native';
import moment from 'moment';
import { createSelector } from 'reselect';
import { StyleSheet } from 'react-native';

const START_YEAR = 1970;
const END_YEAR = 2100;

const YEARS = (() => {
    const years = [];
    for (let i = START_YEAR; i <= END_YEAR; i += 1) {
        years.push(i);
    }
    return years;
})();

const getDates = (year) => createSelector(
    year => year,
    year => {
        const dates = [];
        const current = moment()
          .year(year)
          .startOf('year');
        const end = moment()
          .year(year)
          .endOf('year');
        while (current.isSameOrBefore(end)) {
          dates.push(current.clone());
          current.add(1, 'day');
        }
        return dates;
    },
);

export default class DatePicker extends React.Component {
    static PropTypes = {
        input: PropTypes.Object,
    };

    render() {
        const { onChange, value } = props;
        return (
            <View style={styles.container}>
                <View style={styles.spacer} />
                <Picker
                onValueChange={(date) => onChange(moment(date))}
                selectedValue={value.toISOString()}
                style={styles.datePicker}
                >
                {getDates(value.year()).map(date => (
                    <Picker.Item
                    label={date.format('ddd, MMM D')}
                    value={date.toISOString()}
                    key={date.toISOString()}
                    />
                ))}
                </Picker>
                <Picker
                onValueChange={year => onChange(value.clone().year(year))}
                selectedValue={value.year()}
                style={styles.yearPicker}
                >
                {YEARS.map((year) => (
                    <Picker.Item label={String(year)} value={year} key={year} />
                ))}
                </Picker>
                <View style={styles.spacer} />
            </View>
        );
    };
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  datePicker: {
    flex: 4,
  },
  yearPicker: {
    flex: 3,
  },
  spacer: {
    flex: 1,
  },
});