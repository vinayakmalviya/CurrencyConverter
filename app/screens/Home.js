import React, { Component } from 'react';
import { View, StatusBar, KeyboardAvoidingView } from 'react-native';

import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { InputwithButton } from '../components/TextInput';
import { ClearButton } from '../components/Button';
import { LastConvert } from '../components/Text';
import { Header } from '../components/Header';

const TEMP_BASE_CURRENCY = 'INR ';
const TEMP_QUOTE_CURRENCY = 'USD';
const TEMP_BASE_PRICE = '100';
const TEMP_QUOTE_PRICE = '1.41';
const TEMP_CONVERSION_RATE = 0.794;
const TEMP_CONVERSION_DATE = new Date();

class Home extends Component {
    handlePressBaseCurrency = () => {
        console.log("Press Base");
    };
    handlePressQuoteCurrency = () => {
        console.log("Press Quote");
    };
    handleTextChange = (text) => {
        console.log("Keyboard Typed", text);
    };
    handleSwap = () => {
        console.log("Swap Currencies");
    };
    handleOptionsPress = () => {
        console.log("Options Pressed");
    };

    render() {
        return (
            <Container>
                <StatusBar barStyle = "light-content" translucent = {true} />
                <Header onPress = {this.handleOptionsPress} />
                <KeyboardAvoidingView behavior="padding">
                    <Logo />
                    <InputwithButton 
                        buttonText={TEMP_BASE_CURRENCY}
                        onPress={this.handlePressBaseCurrency}
                        defaultValue={TEMP_BASE_PRICE}
                        keyboardType="numeric"
                        onChangeText={this.handleTextChange}
                    />
                    <InputwithButton 
                        buttonText={TEMP_QUOTE_CURRENCY}
                        onPress={this.handlePressQuoteCurrency}
                        editable={false}
                        value={TEMP_QUOTE_PRICE}
                    />
                    <LastConvert
                        base={TEMP_BASE_CURRENCY}
                        quote={TEMP_QUOTE_CURRENCY}
                        conversionRate={TEMP_CONVERSION_RATE}
                        date={TEMP_CONVERSION_DATE}
                    />
                    <ClearButton
                        onPress={this.handleSwap}
                        text="Reverse Currencies"
                    />
                </KeyboardAvoidingView>
            </Container>
        );
    }
}


export default Home;