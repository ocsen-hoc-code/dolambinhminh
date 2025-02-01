import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./FancyForm.css";
import getCoins from "../../api/Coins";

const CustomOption = (props) => {
    const { data, innerRef, innerProps } = props;
    return (
        <div ref={innerRef} {...innerProps} className="custom-option d-flex align-items-center">
            <img src={`/tokens/${data.value.toUpperCase()}.SVG`} alt={data.label} className="me-2 icon-small" />
            {data.label}
        </div>
    );
};

const CustomSingleValue = (props) => {
    const { data } = props;
    return (
        <div className="custom-single-value d-flex align-items-center">
            <img src={`/tokens/${data.value.toUpperCase()}.SVG`} alt={data.label} className="me-2 icon-small" />
            {data.label}
        </div>
    );
};

const FancyForm = () => {
    const [coins, setCoins] = useState([]);
    const [amountToSend, setAmountToSend] = useState("");
    const [amountToReceive, setAmountToReceive] = useState("");
    const [currencyToSend, setCurrencyToSend] = useState(null);
    const [currencyToReceive, setCurrencyToReceive] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        getCoins().then(setCoins);
    }, []);

    useEffect(() => {
        if (currencyToSend && currencyToReceive && amountToSend) {
            updateAmountToReceive(amountToSend);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currencyToSend, currencyToReceive]);

    const handleAmountChange = (e) => {
        const newAmountToSend = e.target.value;
        if (newAmountToSend === "" || /^[0-9]*[.,]?[0-9]*$/.test(newAmountToSend)) {
            setAmountToSend(newAmountToSend);
            setError("");
        } else {
            setError("Please enter a valid number.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!currencyToSend || !currencyToReceive || currencyToSend === currencyToReceive) {
            alert("Please select different currencies for send and receive.");
            return;
        }
        if (error) {
            alert(error);
            return;
        }
        updateAmountToReceive(amountToSend);
    };

    const updateAmountToReceive = (amount, sendCurrency = currencyToSend, receiveCurrency = currencyToReceive) => {
        if (!sendCurrency || !receiveCurrency || !amount || isNaN(amount) || Number(amount) < 0) {
            setAmountToReceive("");
            return;
        }

        const sendCoin = coins.find(coin => coin.currency === sendCurrency.value);
        const receiveCoin = coins.find(coin => coin.currency === receiveCurrency.value);

        if (sendCoin && receiveCoin) {
            const calculatedAmount = (amount * sendCoin.price) / receiveCoin.price;
            setAmountToReceive(calculatedAmount.toFixed(10));
        } else {
            setAmountToReceive("");
        }
    };

    const handleSwap = () => {
        if (currencyToSend && currencyToReceive) {
            setCurrencyToSend(prev => {
                setCurrencyToReceive(prevCurrency => {
                    if (amountToSend) {
                        updateAmountToReceive(amountToSend, prev, prevCurrency);
                    }
                    return prev;
                });
                return currencyToReceive;
            });
        }
    };

    const formattedCoins = coins.map((coin) => ({
        value: coin.currency,
        label: coin.currency,
    }));

    const filteredCoinsForSend = formattedCoins.filter((coin) => coin.value !== currencyToReceive?.value);
    const filteredCoinsForReceive = formattedCoins.filter((coin) => coin.value !== currencyToSend?.value);

    const isButtonEnabled = amountToSend.trim() !== "" && currencyToSend && currencyToReceive && !error;

    return (
        <form onSubmit={handleSubmit} className="p-3 bg-white shadow rounded">
            <h3 className="text-center">Swap</h3>

            <label className="bot-label" htmlFor="currencyToSend">Currency to send</label>
            <Select
                id="currencyToSend"
                value={currencyToSend}
                onChange={(selected) => {
                    setCurrencyToSend(selected);
                    if (!selected) {
                        setAmountToReceive("");
                    }
                }}
                options={filteredCoinsForSend}
                placeholder="Select currency"
                components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                isClearable
            />

            <div className="swap-container">
                <button type="button" className="swap-button" onClick={handleSwap} disabled={!currencyToSend || !currencyToReceive}>
                    <span className="swap-arrow-vertical"></span>
                </button>
            </div>

            <label className="bot-label" htmlFor="currencyToReceive">Currency to receive</label>
            <Select
                id="currencyToReceive"
                value={currencyToReceive}
                onChange={(selected) => {
                    setCurrencyToReceive(selected);
                    if (!selected) {
                        setAmountToReceive("");
                    }
                }}
                options={filteredCoinsForReceive}
                placeholder="Select currency"
                components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                isClearable
            />

            <label htmlFor="amountToSend">Amount to send</label>
            <input
                id="amountToSend"
                value={amountToSend}
                onChange={handleAmountChange}
                type="text"
                className="form-control"
                pattern="[0-9]*[.,]?[0-9]*"
                title="Please enter a valid number."
            />
            {error && <p className="text-danger">{error}</p>}

            <label htmlFor="amountToReceive">Amount to receive</label>
            <input id="amountToReceive" value={amountToReceive} readOnly className="form-control" />

            <button type="submit" className="btn btn-primary w-100 mt-3" disabled={!isButtonEnabled}>
                CONFIRM SWAP
            </button>
        </form>
    );
};

export default FancyForm;
