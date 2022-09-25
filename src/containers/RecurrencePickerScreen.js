import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import RecurrencePickerList from '../components/RecurrencePickerList';

const DecoratedRecurrencePicker = () => reduxForm({
        form: 'appointmentForm',
        destroyOnUnmount: false,
        forceUnregisterOnUnmount: true,
    })(RecurrencePickerList);
    
    const appointmentFormSelector = formValueSelector('appointmentForm');
    
    function mapStateToProps(
        state,
        { input, navigator },
    ) {
        return {
        onSelect = (value) => {
            input.onChange(value);
            navigator.pop();
        },
        selectedRecurrence: appointmentFormSelector(state, 'recurrence'),
        };
    }
  
export default connect(mapStateToProps)(DecoratedRecurrencePicker);