import React from "react";
import { Animated, Dimensions, FlatList, TouchableWithoutFeedback, ScrollView, View } from "react-native";
import moment from 'moment';
import i18n from 'react-native-i18n';
import { StyleSheet } from 'react-native';
import ScheduleWeek from '../containers/SheduleWeek';
import { AddButton, EditButton } from '../components/NavButtons';
import TaskFormScreen from '../containers/TaskFormScreen';
import { TASK_FORM, EDIT_SELECTION } from '../screens';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { colors, fonts } from '../../themes';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export const STATUSBAR_HEIGHT = isIphoneX() ? 44 : 20;
export const NAVBAR_HEIGHT = 44;

const SCREEN_WIDTH = Dimensions.get('window').width;
const START_YEAR = 2010;
const END_YEAR = 2050;
const START_MOMENT = moment()
  .year(START_YEAR)
  .startOf('year')
  .startOf('week');
const END_MOMENT = moment()
  .year(END_YEAR)
  .startOf('year')
  .startOf('week');

function getWeeks() {
    const weeks = [];
    const current = START_MOMENT.clone();
    while (current.isSameOrBefore(END_MOMENT)) {
      weeks.push(current.clone());
      current.add(1, 'week');
    }
    return weeks;
};

function getCurrentWeekIndex() {
    return moment()
    .startOf('week')
    .diff(START_MOMENT, 'weeks');
};

const WEEKS = getWeeks();

export default class TimeTableScreen extends React.Component {
    static navigatorStyle = {
        navBarhidden: true,
        satusBarBlue: true,
        statusBarTextColorScheme: 'light',
    };

    constructor(props) {
        super(props);
        this.state = {
            scrollAnimX: new Animated.Value(SCREEN_WIDTH * getCurrentWeekIndex())
        };
    };

    _scrollToCurrentWeek = () => {
        if (this._flatlist) {
            this._flatlist,getNode().scrollToIndex({index: getCurrentWeekIndex()});
        }
    };

    _renderButtons = () => (
        <View style={styles.buttonContainer}>
            <AddButton
            onPress={() =>
                this.props.navigator.showModal({
                screen: TASK_FORM,
                title: i18n.t('task'),
                navigatorButtons: {
                    ...TaskFormScreen.navigatorButtons,
                    leftButtons: [
                    {
                        id: 'cancel',
                        title: i18n.t('cancel'),
                    },
                    ],
                },
                })
            }
            />
            <EditButton
            onPress={() =>
                this.props.navigator.showModal({
                screen: EDIT_SELECTION,
                title: i18n.t('tasks'),
                })
            }
            />
        </View>
    );

    _renderNavBarTitle = (week, index) => {
        const offset = index * SCREEN_WIDTH;
        const navBarTitleOpacity = this.state.scrollAnimX.interpolate({
          inputRange: [
            offset - SCREEN_WIDTH / 2,
            offset - SCREEN_WIDTH / 4,
            offset,
            offset + SCREEN_WIDTH / 4,
            offset + SCREEN_WIDTH / 2,
          ],
          outputRange: [0.3, 0.9, 1, 0.9, 0.3],
          extrapolate: 'clamp',
        });
        const navBarTitle = `${week.format(i18n.t('month-day-format'))} - ${week
          .clone()
          .endOf('week')
          .format(i18n.t('month-day-format'))}`;

        return (
            <View style={styles.navBarTitleContainer}>
                <Animated.Text
                style={[styles.navBarTitle, { opacity: navBarTitleOpacity }]}
                >
                {navBarTitle}
                </Animated.Text>
            </View>
        );
    };

    _renderWeek = () => (
        <View>
            {this._renderNavBarTitle(week, index)}
            <ScrollView
            key={week.format('D MMM YYYY')}
            style={{ width: SCREEN_WIDTH }}
            scrollsToTop={false}
            >
            <TimetableWeek week={week} shouldCloseLaunchScreen={isCurrentWeek} />
            <View style={styles.bottomSpacer} />
            </ScrollView>
        </View>
    );

    render() {
        const currentWeekIndex = getCurrentWeekIndex();
        return (
            <View style={styles.container}>
                <View style={styles.statusbar} />
                <TouchableWithoutFeedback onPress={this._scrollToCurrentWeek}>
                <View style={styles.navBarBackground}>{this._renderButtons()}</View>
                </TouchableWithoutFeedback>
                <AnimatedFlatList
                ref={flatList => {
                    this._flatList = flatList;
                }}
                data={WEEKS}
                keyExtractor={month => month.format('D MMM YYYY')}
                renderItem={({ item, index }) =>
                    this._renderWeek(item, index, currentWeekIndex === index)
                }
                getItemLayout={(_, index) => ({
                    length: SCREEN_WIDTH,
                    offset: SCREEN_WIDTH * index,
                    index,
                })}
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                initialNumToRender={0}
                initialScrollIndex={currentWeekIndex}
                updateCellsBatchingPeriod={10}
                scrollEventThrottle={1}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: this.state.scrollAnimX } } }],
                    { useNativeDriver: true },
                )}
                style={styles.horizontalList}
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
  bottomSpacer: {
    height: 24,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  container: {
    flex: 1,
  },
  horizontalList: {
    backgroundColor: colors.background,
    overflow: 'visible',
  },
  navBarBackground: {
    backgroundColor: colors.primary500,
    height: NAVBAR_HEIGHT,
  },
  navBarTitle: {
    ...fonts.base,
    fontSize: fonts.sizes.heading,
    fontWeight: fonts.weights.medium,
    textAlign: 'center',
    lineHeight: fonts.sizes.heading,
    color: 'white',
  },
  navBarTitleContainer: {
    marginTop: -NAVBAR_HEIGHT,
    height: NAVBAR_HEIGHT,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusbar: {
    backgroundColor: colors.primary500,
    height: STATUSBAR_HEIGHT,
    zIndex: 1,
  },
});