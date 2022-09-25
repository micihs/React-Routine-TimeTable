import * as React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../../themes';

export default class HorizontalDividerList extends React.Component {
    static PropTypes = {
        children: PropTypes.node,
        dividerStyle: PropTypes.any,
        hasBottomDivider: PropTypes.bool,
    };

    static defaultProp = {
        children: undefined,
        dividerStyle: undefined,
        hasBottomDivider: false,
    };

    render() {
        const { children, dividerStyle, hasBottomDivider } = props;
        return (
            <View>
              {React.Children.toArray(children).reduce((elements, child, i, array) => {
                elements.push(child);
                if (
                  (hasBottomDivider && i < array.length) ||
                  (!hasBottomDivider && i < array.length - 1)
                ) {
                  elements.push(
                    <View
                      style={[styles.divider, dividerStyle]}
                      key={`${child.key} divider line`}
                    />,
                  );
                }
                return elements;
              }, [])}
            </View>
            );
    };
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    marginHorizontal: 0,
    backgroundColor: colors.darkDivider,
  },
});