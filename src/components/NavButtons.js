import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, metrics } from '../themes';

function NavButtonBase(name, onPress, color) {
    return (
        <TouchableOpacity
            onPress={onPress}
            hitSlop={{top: 12, bottom: 12, right: 12}}
        >
            <Icon name={name} size={metrics.icons.small} color={color}/>
        </TouchableOpacity>
    );
}

export default AddButton = ({color, onPress}) => {
    return NavButtonBase('add', onPress, color);
};

export default CloseButton = ({color, onPress}) => {
    return NavButtonBase('close', onPress, color);
};

export default EditButton = ({color, onPress}) => {
    return NavButtonBase('edit', onPress, color);
};

export default RemoveButton = ({color, onPress}) => {
    return NavButtonBase('remove-circle', onPress, color);
};

