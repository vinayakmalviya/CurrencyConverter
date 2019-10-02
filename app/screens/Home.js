import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux'

import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { InputwithButton } from '../components/TextInput';
import { ClearButton } from '../components/Button';
import { LastConvert } from '../components/Text';
import { Header } from '../components/Header';
import { swapCurrency, changeCurrencyAmount } from '../actions/currencies';

const TEMP_BASE_CURRENCY = 'INR ';
const TEMP_QUOTE_CURRENCY = 'USD';
const TEMP_BASE_PRICE = '100';
const TEMP_QUOTE_PRICE = '1.41';
const TEMP_CONVERSION_RATE = 0.794;
const TEMP_CONVERSION_DATE = new Date();

class Home extends Component {
    static propTypes = {
        navigation: PropTypes.object,
        dispatch: PropTypes.func,
        baseCurrency: PropTypes.string,
        quoteCurrency: PropTypes.string,
    };
    handlePressBaseCurrency = () => {
        this.props.navigation.navigate('CurrencyList', { title: 'Base Currency' });
    };
    handlePressQuoteCurrency = () => {
        this.props.navigation.navigate('CurrencyList', { title: 'Quote Currency' });
    };
    handleTextChange = (amount) => {
        this.props.dispatch(changeCurrencyAmount(amount));
        //console.log(changeCurrencyAmount(amount));
    };
    handleSwap = () => {
        //console.log("Swap Currencies");
        this.props.dispatch(swapCurrency()); 
    };
    handleOptionsPress = () => {
        this.props.navigation.navigate('Options');
    };

    render() {
        return (
            <Container>
                <StatusBar barStyle = "light-content" translucent = {true} />
                <Header onPress = {this.handleOptionsPress} />
                <KeyboardAvoidingView behavior="padding">
                    <Logo />
                    <InputwithButton 
                        buttonText={this.props.baseCurrency}
                        onPress={this.handlePressBaseCurrency}
                        defaultValue={TEMP_BASE_PRICE}
                        keyboardType="numeric"
                        onChangeText={this.handleTextChange}
                    />
                    <InputwithButton 
                        buttonText={this.props.quoteCurrency}
                        onPress={this.handlePressQuoteCurrency}
                        editable={false}
                        value={TEMP_QUOTE_PRICE}
                    />
                    <LastConvert
                        base={this.props.baseCurrency}
                        quote={this.props.quoteCurrency}
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

const mapStateToProps = (state) => {
    const baseCurrency = state.currencies.baseCurrency;
    const quoteCurrency = state.currencies.quoteCurrency;
    return{
        baseCurrency,
        quoteCurrency,
    };
};

export default connect(mapStateToProps)(Home);