import React, { Component } from 'react';
import { LayoutAnimation, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import defaultLayoutAnimation from '../lib/defaultLayoutAnimation';
import PropTypes from 'prop-types';
import { colors, metrics, fonts } from '../themes';

export default class TextField extends Component {
    static PropTypes = {
        isButton: PropTypes.bool,
        input: PropTypes.object,
        label: PropTypes.string,
        meta: PropTypes.object,
        onPress: PropTypes.func,
        placeHolderColor: PropTypes.string,
        value: PropTypes.string,
    };

    static defaultProps = {
        isButton: false,
        input: {
            onChange: () => {},
        },
        meta: {},
        onPress: () => {},
        value: '',
    };

    componentDidUpdate() {
        const meta = this.props.meta || {};
        const nextMeta = nextProps.meta || {};
        const showsError = Boolean(
          (meta.touched || meta.submitFailed) && meta.error,
        );
        const nextShowsError = Boolean(
          (nextMeta.touched || nextMeta.submitFailed) && nextMeta.error,
        );
        if (showsError !== nextShowsError) {
          LayoutAnimation.configureNext(defaultLayoutAnimation);
        }
    };

    render() {
        const {
            input = {},
            meta = {},
            label,
            value = '',
            isButton,
            onPress,
            placeHolderColor,
            ...rest
        } = this.props;
        const { error, submitFailed, touched } = meta;
        return (
            <View>
                <TouchableOpacity
                style={styles.labelAndFieldContainer}
                disabled={!isButton}
                onPress={onPress}
                >
                {label && <Text style={styles.label}>{label}</Text>}
                <View
                    style={styles.fieldContainer}
                    pointerEvents={isButton ? 'none' : 'auto'}
                >
                    <TextInput
                    style={(label && styles.textInputWithLabel) || styles.textInput}
                    placeholderTextColor={placeholderColor || colors.darkHint}
                    onChangeText={input.onChange}
                    onBlur={() => input.onBlur()}
                    onFocus={() => input.onFocus()}
                    value={input.value || value}
                    editable={!isButton}
                    clearButtonMode="while-editing"
                    {...rest}
                    />
                </View>
                {isButton && (
                    <View style={styles.chevronContainer}>
                    <Icon
                        name={'chevron-right'}
                        size={metrics.icons.small}
                        color={colors.darkHint}
                    />
                    </View>
                )}
                </TouchableOpacity>
                <View
                style={[
                    styles.horizontalLine,
                    {
                    backgroundColor:
                        ((touched || submitFailed) && error && colors.error) ||
                        colors.darkDivider,
                    },
                ]}
                />
                {(touched || submitFailed) &&
                error && <Text style={styles.error}>{error}</Text>}
            </View>
        );
    }
};

const baseFont = {
    ...fonts.base,
    fontSize: fonts.sizes.regular,
    fontWeight: fonts.weights.regular,
    lineHeight: fonts.sizes.regular,
  };
  
  const textInputBase = {
    ...baseFont,
    height: 28,
    alignItems: 'flex-end',
  };
  
  const styles = StyleSheet.create({
    chevronContainer: {
      marginRight: -8,
    },
    error: {
      ...fonts.base,
      fontSize: fonts.sizes.small,
      color: colors.secondaryA400,
      marginTop: 8,
    },
    label: {
      ...baseFont,
      color: colors.darkPrimary,
    },
    labelAndFieldContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    fieldContainer: {
      flex: 1,
  
    },
    textInput: {
      ...textInputBase,
      color: colors.darkPrimary,
    },
    textInputWithLabel: {
      ...textInputBase,
      color: colors.darkSecondary,
      textAlign: 'right',
    },
    horizontalLine: {
      height: 1,
    },
  });