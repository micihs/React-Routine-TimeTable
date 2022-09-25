import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts } from '../../themes';
import PropTypes from 'prop-types';
import Moment from 'moment';

export default class TaskAppointment extends React.Component {
    static PropTypes = {
        name: PropTypes.string,
        starttime: Moment,
        endtime: Moment,
        location: PropTypes.string,
        type: PropTypes.string,
    };

    static PropTypes = {
        location: undefined,
        type: undefined,
    };

    render() {
        const { starttime, endtime, name, location, type } = props;
        const start = starttime.format('H:mm');
        const end = endtime.format('H:mm');
        const secondaryInfo = (location || type) && `${location || ''}${(location && type && ', ') || ''}${type || ''}`;

        return (
            <View style={styles.container}>
                <View style={styles.infoSpacer}>
                <View style={styles.timeContainer}>
                    <Text style={[styles.time, styles.secondaryText]}>{start}</Text>
                    <View style={styles.dash} />
                    <Text style={[styles.time, styles.secondaryText]}>{end}</Text>
                </View>
                </View>
                <View style={styles.infoContainer}>
                <Text style={styles.title}>{name}</Text>
                {secondaryInfo && (
                    <View style={styles.lineSpacer}>
                    <Text style={styles.secondaryText}>{secondaryInfo}</Text>
                    </View>
                )}
                </View>
            </View>
        );
    };
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 72,
    alignItems: 'center',
  },
  timeContainer: {
    left: 16,
    justifyContent: 'center',
  },
  time: {
    textAlign: 'center',
  },
  infoSpacer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: 72,
  },
  infoContainer: {
    justifyContent: 'center',
  },
  title: {
    ...fonts.base,
    fontSize: fonts.sizes.heading,
    fontWeight: fonts.weights.regular,
    color: colors.primary700,
  },
  secondaryText: {
    ...fonts.base,
    fontSize: fonts.sizes.regular,
    fontWeight: fonts.weights.regular,
    color: colors.darkSecondary,
  },
  lineSpacer: {
    marginTop: 6,
  },
  dash: {
    height: 1.5,
    width: 5,
    backgroundColor: colors.darkSecondary,
    alignSelf: 'center',
    marginVertical: 4,
  },
});