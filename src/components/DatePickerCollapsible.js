import React from 'react';
import CollapsibleField from './CollapsibleField';
import DatePicker from './DatePicker';
import PropTypes from 'prop-types';

export default class DatePickerCollapsible extends React.Component {
    static PropTypes = {
        input: PropTypes.object,
        meta: PropTypes.object,
        onCollapse: PropTypes.func,
        onExpand: PropTypes.func,
    };

    static defaultProps = {
        onCollapse: () => {},
        onExpand: () => {},
    };


    collapse = () => {
        if (this._collapsibleRef) {
          this._collapsibleRef.collapse();
        }
      };
    
      expand = () => {
        if (this._collapsibleRef) {
          this._collapsibleRef.expand();
        }
      };
    
      render() {
        const { input, ...rest } = this.props;
        return (
          <CollapsibleField
            ref={(collapsible) => {
              this._collapsibleRef = collapsible;
            }}
            headerText={input.value.format('dddd, ll')}
            {...rest}
          >
            <DatePicker input={input} />
          </CollapsibleField>
        );
      }
};