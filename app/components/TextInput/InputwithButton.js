import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableHighlight, TextInput} from 'react-native';
import color from 'color';

import styles from './styles';

const InputwithButton = (props) => {
    const { onPress, buttonText, editable = true, textColor } = props;

    const underlayColor = color(styles.$buttonBackgroundColorBase).darken(styles.$buttonBackgroundColorModifier);
    const containerStyle = [styles.container];
    if( editable === false ) {
        containerStyle.push(styles.containerDisabled);
    }
    const buttonTextStyle = [styles.buttonText];
    if(textColor) {
        buttonTextStyle.push({ color: textColor });
    }
    return(
        <View style={containerStyle}>
            <TouchableHighlight underlayColor={underlayColor} style={styles.buttonContainer} onPress={onPress}>
                <Text style={buttonTextStyle}>{buttonText}</Text>
            </TouchableHighlight>
            <View style={styles.border} />
            <TextInput style={styles.input} {...props} />
        </View>
    );
};

InputwithButton.propTypes = {
    onPress: PropTypes.func,
    buttonText: PropTypes.string,
    editable: PropTypes.bool,
    textColor: PropTypes.string,
};

export default InputwithButton;