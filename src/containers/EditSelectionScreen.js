import React from 'react';
import { LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';

import EditSelection from '../components/EditSelection';
import { getCoursesSortedByName } from '../reducers/courses';
import { removeCourse } from '../actions/course-actions';
import { COURSE_FORM } from '../screens';
import { navBar } from '../themes';
import { iconSources } from '../lib/iconSources';

const editAnimation = LayoutAnimation.create(100, 'linear', 'opacity');
const deleteAnimation = LayoutAnimation.create(80, 'linear', 'opacity');

class EditSelectionScreen extends React.Component {
    static navigatorStyle = navBar;
    static navigatorButtons = {
            leftButtons: [
                {
                id: 'cancel',
                icon: iconSources.close,
                },
            ],
            rightButtons: [
                {
                id: 'edit',
                title: 'edit',
                },
            ],
    }; 

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this._handleNavigatorEvent);
        this.state = {
          editing: false,
        };
    };

    _handleRemovePress = (courseId, appointmentIds) => {
        const { dispatch } = this.props;
        LayoutAnimation.configureNext(deleteAnimation);
        dispatch(removeCourse(courseId, appointmentIds));
    };

    _handleNavigatorEvent = (event) => {
        const { navigator } = this.props;
        if (event.type === 'NavBarButtonPress') {
          if (event.id === 'cancel') {
            navigator.dismissModal();
          }
          if (event.id === 'edit') {
            LayoutAnimation.configureNext(editAnimation);
    
            this.setState({ editing: !this.state.editing });
    
            const newTitle = this.state.editing ? 'done' : 'edit';
            this.props.navigator.setButtons({
              rightButtons: [
                {
                  id: 'edit',
                  title: i18n.t(newTitle),
                },
            ],
                animated: true,
            });
            }
        }
    };

    render() {
        const { courses, navigator } = this.props;
        return (
          <EditSelection
            courses={courses}
            showRemoveButtons={this.state.editing}
            onRemovePress={this._handleRemovePress}
            onPress={id =>
              navigator.push({
                screen: COURSE_FORM,
                title: 'course',
                backButtonTitle: 'cancel',
                passProps: {
                  courseId: id,
                },
              })
            }
          />
        );
    }

};