import React from 'react';
import { Alert, LayoutAnimation, ScrollView, View, TouchableOpacity, Text, Styles } from 'react-native';
import { Field, FieldArray } from 'redux-form';
import ElevatedView from 'react-native-elevated-view';
import Textfield from './Textfield';
import RemoveButtonRow from './RemoveButtonRow';
import defaultLayoutAnimation from '../lib/defaultLayoutAnimation';
import { WEEKLY } from '../lib/recurrence';
import { colors } from '../themes';
import PropTypes from 'prop-types';
import { colors, fonts } from '../../themes';

export default RemoveCourseButton = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <ElevatedView elevation={2} style={styles.removeCourseButton}>
            <Text style={styles.removeCourseButtonText}>
                {'remove-course'}
            </Text>
            </ElevatedView>
        </TouchableOpacity>
    );
};

export default Appointments = ({fields, meta, navigateToAppointmentForm}) => {
    return (
        <View style={styles.appointmentListContainer}>
          {fields.map((field, index) => {
            const values = fields.get(index);
            const { startdate, enddate, starttime, endtime, recurrence } = values;
            const recurrenceText =
              (recurrence === WEEKLY && 'every') || 'every-2nd';
            return (
              <View key={field}>
                <RemoveButtonRow
                  onRemovePress={() => {
                    LayoutAnimation.configureNext(defaultLayoutAnimation);
                    fields.remove(index);
                  }}
                  onRowPress={() => navigateToAppointmentForm(values, index)}
                >
                  <View style={styles.appointmentTextContainer}>
                    <Text style={styles.primaryText}>
                      {`${recurrenceText} ${startdate.format('dddd')}, `}
                    </Text>
                    <Text style={styles.primaryText}>
                      {`${starttime.format('LT')} - ${endtime.format('LT')},`}
                    </Text>
                  </View>
                  <Text style={styles.primaryText}>{`${startdate.format(
                    'L',
                  )} - ${enddate.format('L')}`}</Text>
                </RemoveButtonRow>
                <View style={styles.shortHorizontalLine} />
              </View>
            );
          })}
          <Textfield
            isButton
            onPress={() => navigateToAppointmentForm()}
            editable={false}
            placeholder={'add-appointment'}
            placeholderColor={colors.darkSecondary}
            meta={meta}
          />
        </View>
    );
};

export default class TaskForm extends React.Component {
    static PropTypes = {
        error: PropTypes.any,
        hasRemoveButtonRow: PropTypes.bool,
        navigateToAppointmentForm: PropTypes.func,
        onRemoveCourse: PropTypes.func,
        onSubmit: PropTypes.func,
    };

    static defaultProps = {
        navigateToAppointmentForm: (values, index) => {},
        onRemoveCourse: () => {},
        onSubmit: (input) => {},
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.navBarSpacer} />
                <Field name="name" component={Textfield} placeholder={'title'} />
                <View style={styles.spacer} />
                <FieldArray
                    name="appointments"
                    component={Appointments}
                    navigateToAppointmentForm={navigateToAppointmentForm}
                />
                <View style={styles.spacer} />
                {hasRemoveButton && (
                    <RemoveCourseButton
                    onPress={() => {
                        Alert.alert(
                        'remove-course',
                        'remove-course-alert',
                        [
                            {
                            text: 'delete',
                            onPress: onRemoveCourse,
                            style: 'destructive',
                            },
                            { text: 'cancel', style: 'cancel' },
                        ],
                        );
                    }}
                    />
                )}
            </ScrollView>
          );
    };
};

const baseFont = {
  ...fonts.base,
  fontSize: fonts.sizes.regular,
  fontWeight: fonts.weights.regular,
  lineHeight: fonts.sizes.regular,
};

const horizontalLine = {
  height: 1,
  backgroundColor: colors.darkDivider,
  marginTop: 4,
  marginBottom: 12,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.cardBackground,
        paddingHorizontal: 16,
    },
    appointmentListContainer: {
        flex: 1,
    },
    appointmentTextContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    primaryText: {
        ...baseFont,
        color: colors.darkPrimary,
        lineHeight: baseFont.lineHeight + 4,
    },
    secondaryText: {
        ...baseFont,
        color: colors.darkSecondary,
    },
    hintText: {
        ...baseFont,
        color: colors.darkHint,
    },
    error: {
        ...fonts.base,
        fontSize: fonts.sizes.small,
        color: colors.secondaryA400,
        marginTop: -8,
    },
    horizontalLine,
    shortHorizontalLine: {
        ...horizontalLine,
        marginLeft: 42,
    },
    removeTaskButton: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.secondaryA200,
        height: 32,
    },
    removeTaskButtonText: {
        ...fonts.base,
        fontSize: fonts.sizes.regular,
        fontWeight: fonts.weights.medium,
        color: 'white',
        marginHorizontal: 16,
    },
    spacer: {
        height: 48,
    },
    navBarSpacer: {
        height: 32,
    },
});
