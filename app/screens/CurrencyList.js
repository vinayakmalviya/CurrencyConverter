import React from 'react';
import { View, FlatList, StatusBar, Text } from 'react-native';

import currencies from '../data/currencies';

const CurrencyList = () => (
    <View>
        <StatusBar translucent={false} barStyle="light-content" />
        <FlatList
            data={currencies}
            renderItem={({ item }) => <Text>{item}</Text>}
            keyExtractor={ item => item }
        />
    </View>
);

export default CurrencyList;