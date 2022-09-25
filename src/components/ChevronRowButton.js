import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, metrics } from '../themes';
import { StyleSheet } from 'react-native';

export default function ChevronRowButton({ children, height, onPress }) {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.container, { height }]}>
        <View style={styles.childrenContainer}>{children}</View>
        <View style={styles.chevronContainer}>
          <Icon
            name={'chevron-right'}
            size={metrics.icons.small}
            color={colors.darkHint}
          />
        </View>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  childrenContainer: {
    flexShrink: 1,
  },
  chevronContainer: {
    marginRight: -8,
  },
});





