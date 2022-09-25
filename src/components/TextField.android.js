import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { MKTextField } from 'react-native-material-kit';

import { colors, fonts } from '../themes';

export default TextField = ({input, meta, value, ...rest}) => {

    const {error, submitFailed, touched} = meta;
    return (
        <View>
            <MKTextField
                style={styles.textField}
                textInputStyle={styles.textInput}
                highlightColor={colors.main}
                tintColor={
                    ((touched || submitFailed) && error && colors.error) ||
                    colors.darkDivider
                }
                placeholderTextColor={colors.darkHint}
                underlineSize={1}
                {...rest}
                onChangeText={input.onChange}
                onBlur={input.onBlur}
                value={input.value || value}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    error: {
      color: colors.error,
      marginTop: 8,
    },
    textfield: {
      height: 32,
    },
    textInput: {
      flex: 1,
      ...fonts.base,
      fontSize: fonts.sizes.regular,
      fontWeight: fonts.weights.regular,
      color: colors.darkPrimary,
    },
    spacer: {
      height: 8,
    },
  });
  