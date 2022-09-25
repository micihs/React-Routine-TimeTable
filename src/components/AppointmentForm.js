import React, { createRef } from 'react';
import { Keyboard, View } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Field, Fields } from 'redux-form';
import moment from 'moment';
import DatePickerCollapsible from './DatePickerCollapsible';
import Textfield from "./Textfield";
import TimePickerCollapsible from './TimePickerCollapsible';
import styles from './styles/AppointmentForm.styles';
import PropTypes from 'prop-types';

import { Collapsible } from './collapsible';

export default class ReccurrenceRow extends React.Component {
    static PropTypes = {
        onPress: PropTypes.func,
        value: PropTypes.any,
    };

    static defaultProps = {
        onPress: () => {},
    };
    
    render() {
        return (
            <Textfield
            isButton
            onPress={() => onRecurrencePress(input)}
            editable={false}
            value={input.value}
            label={'repeat'}
            />
        );
    }
};

export default class AppointmentForm extends React.Component {
    static PropTypes = {
        onRecurrencePress: PropTypes.func,
    };

    static defaultProps = {
        onRecurrencePress: (input) => {},
    };

    _fieldRefs = {};

    _closeExpandedField = () => {
        if (this._lastExpandedField) {
            this._lastExpandedField.getRenderedComponent().collapse();
        }
        this._lastExpandedField = null;
    };

    _handleExpand = (fieldRef) => {
        if (fieldRef !== null) {
            if (this._lastExpandedField !== fieldRef) {
              this._closeExpandedField();
            }
            Keyboard.dismiss();
            this._lastExpandedField = fieldRef;
        }
    };

    _lastExpandedField = getRenderedComponent = () => Collapsible;

    _fieldRefs = {
        timeRef = getRenderedComponent = () => Collapsible,
        startdateRef = getRenderedComponent = () => Collapsible,
        enddateRef =  getRenderedComponent = () => Collapsible,
    };

    render() {
        const { onRecurrencePress } = this.props;
        const { timeRef, startdateRef, enddateRef } = this._fieldRefs;
        return (
            <KeyboardAwareScrollView
                style={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.navBarSpacer} />
                <Fields
                withRef
                ref={field => {
                    this._fieldRefs.timeRef = field;
                }}
                names={['starttime', 'endtime']}
                component={TimePickerCollapsible}
                label={'time'}
                parse={(value) => value && moment(value)}
                format={(value) => value && value.toDate()}
                onExpand={() => this._handleExpand(timeRef)}
                />
                <View style={styles.spacer} />
                <Field
                withRef
                ref={field => {
                    this._fieldRefs.startdateRef = field;
                }}
                name={'startdate'}
                component={DatePickerCollapsible}
                label={'starts'}
                onExpand={() => this._handleExpand(startdateRef)}
                />
                <View style={styles.spacer} />
                <Field
                withRef
                ref={field => {
                    this._fieldRefs.enddateRef = field;
                }}
                name={'enddate'}
                component={DatePickerCollapsible}
                label={'ends'}
                onExpand={() => this._handleExpand(enddateRef)}
                />
                <View style={styles.spacer} />
                <Field
                name={'recurrence'}
                component={RecurrenceRow}
                onRecurrencePress={onRecurrencePress}
                />
                <View style={styles.spacer} />
                <View style={styles.spacer} />
                <Field
                name={'location'}
                component={Textfield}
                placeholder={'location'}
                onFocus={this._closeExpandedField}
                />
                <View style={styles.spacer} />
                <Field
                name={'type'}
                component={Textfield}
                placeholder={'type'}
                onFocus={this._closeExpandedField}
                />
            </KeyboardAwareScrollView>
        );
    };


};




