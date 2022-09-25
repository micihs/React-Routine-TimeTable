import * as React from 'react';
import { Text, View } from 'react-native';
import ElevatedView from 'react-native-elevated-view';
import HorizontalDividerList from './HorizontalDividerList';
import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../themes';

export default DayBorder = ({date, children}) => {
    return (
      <View>
        <View style={styles.sectionTitle}>
          <Text style={styles.dateText}>{date}</Text>
        </View>
        <ElevatedView elevation={2} style={styles.appointmentsContainer}>
          <HorizontalDividerList dividerStyle={styles.dividerStyle}>
            {children}
          </HorizontalDividerList>
        </ElevatedView>
      </View>
    );
}

const styles = StyleSheet.create({
  appointmentsContainer: {
    backgroundColor: colors.cardBackground,
  },
  sectionTitle: {
    justifyContent: 'center',
    height: 48,
    marginLeft: 16,
  },
  dateText: {
    ...fonts.base,
    fontSize: fonts.sizes.small,
    fontWeight: fonts.weights.medium,
    color: colors.darkSecondary,
  },
  dividerStyle: {
    height: 1,
    marginHorizontal: 16,
  },
});