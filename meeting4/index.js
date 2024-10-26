let money = 0;
const currencyConversionRates = {
    "USD": 1,
    "IDR": 16000,
    "CNY": 7.2,
    "JPY": 145,
    "VND": 24000
};

document.addEventListener('DOMContentLoaded', function() {
    const moneyAmountElement = document.querySelector('.money-amount');
    const currentCurrencyElement = document.querySelector('.current-currency');
    const currencyInputElement = document.querySelector('.currency-input');
    const currencySelectElement = document.querySelector('.currency-select');
    const convertButton = document.querySelector('.convert');
    const amountCells = document.querySelectorAll('.amount');
    const conversionCells = document.querySelectorAll('.conversion');

    updateMoneyDisplay();

    convertButton.addEventListener('click', convertCurrency);
    currencyInputElement.addEventListener('input', updateConvertButtonState);
    currencySelectElement.addEventListener('change', updateCurrentCurrency);

    function updateMoneyDisplay() {
        moneyAmountElement.textContent = formatMoney(money, currentCurrencyElement.textContent);
    }

    function formatMoney(amount, currency) {
        return new Intl.NumberFormat(getLocale(currency), {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    }

    function getLocale(currency) {
        const localeMap = {
            'USD': 'en-US',
            'IDR': 'id-ID',
            'CNY': 'zh-CN',
            'JPY': 'ja-JP',
            'VND': 'vi-VN'
        };
        return localeMap[currency] || 'en-US';
    }

    function convertCurrency() {
        const inputAmount = parseFloat(currencyInputElement.value);
        if (isNaN(inputAmount) || inputAmount <= 0) {
            alert('Please enter a valid positive number');
            return;
        }

        const selectedCurrency = currencySelectElement.value;
        money = inputAmount;
        updateMoneyDisplay();

        updateCells(selectedCurrency);
    }

    function updateCells(selectedCurrency) {
        amountCells.forEach(cell => {
            cell.textContent = formatMoney(money, selectedCurrency);
        });

        conversionCells.forEach((cell, index) => {
            const currencyCode = cell.parentElement.querySelector('td:nth-child(4)').textContent;
            const conversionRate = currencyConversionRates[currencyCode] / currencyConversionRates[selectedCurrency];
            cell.textContent = formatMoney(money * conversionRate, currencyCode);
        });
    }

    function updateConvertButtonState() {
        const inputAmount = parseFloat(currencyInputElement.value);
        convertButton.disabled = isNaN(inputAmount) || inputAmount <= 0;
    }

    function updateCurrentCurrency() {
        currentCurrencyElement.textContent = currencySelectElement.value;
        updateMoneyDisplay();
    }
});