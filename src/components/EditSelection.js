import React from 'react';
import { ScrollView, Text } from 'react-native';
import RemoveButtonRow from './RemoveButtonRow';
import HorizontalDividerList from './HorizontalDividerList';
import { StyleSheet } from 'react-native';
import { colors, fonts } from '../themes';
import PropTypes from 'prop-types';

export default class EditSelection extends React.Component {
    static PropTypes = {
        courses: PropTypes.object,
        onPress: PropTypes.func,
        onRemovePress: PropTypes.func,
        showRemoveButtons: PropTypes.bool,
    };

    static defaultProps = {
        courses: [],
        onPress: (id) => {},
        onRemovePress: (id, apppointmentIds) => {},
    };

    render() {
        const { courses, onPress, onRemovePress, showRemoveButtons } = props;
        return (
            <ScrollView style={styles.container}>
                <HorizontalDividerList hasBottomDivider>
                {courses.map(course => (
                    <RemoveButtonRow
                    height={48}
                    onRowPress={() => onPress(course.id)}
                    onRemovePress={() => onRemovePress(course.id, course.appointments)}
                    showRemoveButton={showRemoveButtons}
                    key={course.id}
                    >
                    <Text style={styles.text}>{course.name}</Text>
                    </RemoveButtonRow>
                ))}
                </HorizontalDividerList>
            </ScrollView>
        );
    };
};

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 16,
    },
    text: {
      ...fonts.base,
      fontSize: fonts.sizes.heading,
      fontWeight: fonts.weights.regular,
      color: colors.primary700,
    },
  });