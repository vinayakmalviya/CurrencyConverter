import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Text } from 'react-native';
import styles from './styles';

const LastConvert = ({ base, quote, conversionRate, date}) => (
    <Text style={styles.smallText} >
        1 {base} = {conversionRate} {quote} as of {moment(date).format('MMMM D, YYYY')}
    </Text>
);

LastConvert.propTypes = {
    date: PropTypes.object,
    base: PropTypes.string,
    conversionRate: PropTypes.number,
    quote: PropTypes.string,
};

export default LastConvert;