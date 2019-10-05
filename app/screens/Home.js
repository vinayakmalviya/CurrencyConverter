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
import { swapCurrency, changeCurrencyAmount, getInitialConversion } from '../actions/currencies';
import { connectAlert } from '../components/Alert';

class Home extends Component {
    static propTypes = {
        navigation: PropTypes.object,
        dispatch: PropTypes.func,
        baseCurrency: PropTypes.string,
        quoteCurrency: PropTypes.string,
        amount: PropTypes.number,
        conversionRate: PropTypes.number,
        isFetching: PropTypes.bool,
        lastconversionDate: PropTypes.object,
        primaryColor: PropTypes.string,
        alertWithType: PropTypes.func,
        currencyError: PropTypes.string,
    };

    componentWillMount() {
        this.props.dispatch(getInitialConversion());
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.currencyError && nextProps.currencyError != this.props.currencyError) {
            this.props.alertWithType('error', 'Error', nextProps.currencyError);
        }
    }

    handlePressBaseCurrency = () => {
        this.props.navigation.navigate('CurrencyList', { title: 'Base Currency', type: 'base' });
    };
    handlePressQuoteCurrency = () => {
        this.props.navigation.navigate('CurrencyList', { title: 'Quote Currency', type: 'quote' });
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
        let quotePrice = "...";
        if(!this.props.isFetching) {
            quotePrice = (this.props.amount * this.props.conversionRate).toFixed(2);
        }

        return (
            <Container backgroundColor={this.props.primaryColor} >
                <StatusBar barStyle = "light-content" translucent = {true} />
                <Header onPress = {this.handleOptionsPress} />
                <KeyboardAvoidingView behavior="padding">
                    <Logo tintColor={this.props.primaryColor} />
                    <InputwithButton 
                        buttonText={this.props.baseCurrency}
                        onPress={this.handlePressBaseCurrency}
                        defaultValue={this.props.amount.toString()}
                        keyboardType="numeric"
                        onChangeText={this.handleTextChange}
                        textColor={this.props.primaryColor}
                    />
                    <InputwithButton 
                        buttonText={this.props.quoteCurrency}
                        onPress={this.handlePressQuoteCurrency}
                        editable={false}
                        value={quotePrice}
                        textColor={this.props.primaryColor}
                    />
                    <LastConvert
                        base={this.props.baseCurrency}
                        quote={this.props.quoteCurrency}
                        conversionRate={this.props.conversionRate}
                        date={this.props.lastconversionDate}
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
    const conversionSelector = state.currencies.conversions[baseCurrency] || {};
    const rates = conversionSelector.rates || {};
    return{
        baseCurrency,
        quoteCurrency,
        amount: state.currencies.amount,
        conversionRate: rates[quoteCurrency] || 0,
        isFetching: conversionSelector.isFetching,
        lastconversionDate: conversionSelector.date ? new Date(conversionSelector.date) : new Date(),
        primaryColor: state.theme.primaryColor,
        currencyError: state.currencies.error,
    };
};

export default connect(mapStateToProps)(connectAlert(Home));