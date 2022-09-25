import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { metrics } from '../themes';

export default ArrowButton = ({color, type, onPress}) => {
    const iconName = type === 'back' ? 'arrow-back' : 'arrow-forward';
    return (
      <TouchableOpacity onPress={onPress}>
        <Icon name={iconName} size={metrics.icons.small} color={color} />
      </TouchableOpacity>
    );
};