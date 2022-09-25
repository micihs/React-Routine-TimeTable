import * as React from 'react';
import { View } from 'react-native';
import { RemoveButton } from './NavButtons';
import ChevronRowButton from './ChevronRowButton';
import { colors } from '../themes';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class RemoveButtonRow extends React.Component {
    static PropTypes = {
        children: PropTypes.node,
        height: PropTypes.number,
        onRemovePress: PropTypes.func,
        onRowPress: PropTypes.func,
        showRemoveButton: PropTypes.bool,
    };

    static defaultProps = {
        onRemovePress: () => {},
        onRowPress: () => {},
    };

    render() {
        const {

        } = props;

        return (
            <View style={styles.rowContentContainer}>
                {showRemoveButton && (
                <RemoveButton onPress={onRemovePress} color={colors.secondaryA200} />
                )}
                {showRemoveButton && <View style={styles.removeButtonSpacer} />}
                <ChevronRowButton onPress={onRowPress} height={height}>
                {children}
                </ChevronRowButton>
            </View>
        );
    };
};

const styles = StyleSheet.create({
  removeButtonSpacer: {
    width: 16,
  },
  rowContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});