import * as React from 'react';
import { Animated, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Textfield from './Textfield';
import PropTypes from 'prop-types';

export default class CollapsibleField extends React.Component {
    static PropTypes = {
        childre: PropTypes.node,
        headerText: PropTypes.string,
        meta: PropTypes.object,
        onCollapse: PropTypes.func,
        onExpand: PropTypes.func,
    };

    static defaultProps = {
        children: undefined,
        onCollapse: () => {},
        onExpand: () => {},
    };

    constructor(props) {
        super(props)

        this.state = {
            collapsibleHeight: new Animated.Value(0),
        };
        this._collapsed = true;
        this._childrenHeight = 0;
    }

    collapse = () => {
        this._animateCollapsibleHeight(0);
        this._collapsed = true;
    };

    expand = () => {
        this._animateCollapsibleHeight(this._childrenHeight);
        this._collapsed = false;
    };

    //toValue should only be a numerical value.
    _animateCollapsibleHeight = (toValue) => {
        Animated.timing(this.state.collapsibleHeight, {
          toValue,
          duration: 220,
        }).start();
    };

    _toggle = () => {
        const { onCollapse, onExpand } = this.props;
        if (this._collapsed) {
          this.expand();
          onExpand();
        } else {
          this.collapse();
          onCollapse();
        }
    };

    _setChildrenHeight = (event) => {
        this._childrenHeight = event.nativeEvent.layout.height;
      };
    
      _collapsed;
      _childrenHeight;
    
      render() {
        const { children, headerText, meta, ...rest } = this.props;
        // uses Textfield to have same look as other fields in forms
        return (
          <View style={styles.container}>
            <TouchableWithoutFeedback onPress={this._toggle}>
              <View>
                <Textfield
                  editable={false}
                  pointerEvents="none"
                  meta={meta}
                  value={headerText}
                  {...rest}
                />
              </View>
            </TouchableWithoutFeedback>
            <Animated.View
              style={[styles.container, { height: this.state.collapsibleHeight }]}
            >
              <View
                onLayout={this._setChildrenHeight}
                style={styles.childrenContainer}
              >
                {children}
              </View>
            </Animated.View>
          </View>
        );
    }
};


const styles = StyleSheet.create({
    container: {
      overflow: 'hidden',
    },
    childrenContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
    },
});