import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HorizontalDividerList from './HorizontalDividerList';
import { WEEKLY, BIWEEKLY } from '../lib/recurrence';
import { colors, metrics, fonts } from '../themes';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class RecurrencePickerList extends React.Component {
    static PropTypes = {
        onSelect: PropTypes.string,
        selectedRecurrence: PropTypes.string,
    };

    static defaultProps = {
        onSelect: {value: 'WEEKLY'|'BIWEEKLY'},
        selectedRecurrence: 'WEEKLY'|'BIWEEKLY'
    };

    render() {
        const reccurrenceOptions = [WEEKLY, BIWEEKLY];
        return (
            <ScrollView style={styles.container}>
                <HorizontalDividerList dividerStyle={styles.divider}>
                {recurrenceOptions.map(recurrence => (
                    <TouchableOpacity
                    style={styles.row}
                    onPress={() => onSelect(recurrence)}
                    key={recurrence}
                    >
                    <View style={styles.checkmarkContainer}>
                        {selectedRecurrence === recurrence && (
                        <Icon
                            name={'check'}
                            size={metrics.icons.small}
                            color={colors.secondaryA200}
                        />
                        )}
                    </View>
                    <Text style={styles.text}>{recurrence}</Text>
                    </TouchableOpacity>
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
  row: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkmarkContainer: {
    flexDirection: 'row',
    width: 40,
    alignItems: 'center',
  },
  divider: {
    marginLeft: 40,
  },
  leftSpacer: {
    width: 16,
  },
  text: {
    ...fonts.base,
    fontSize: fonts.sizes.regular,
    fontWeight: fonts.weights.regular,
  },
});