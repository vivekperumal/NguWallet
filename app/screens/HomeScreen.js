import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { format, fromUnixTime } from 'date-fns'

import Card from '../components/Card';
import Screen from '../components/Screen';
import OptionsButton from '../navigation/OptionsButton';
import { AppContext } from '../app_modules/appContext';
import priceApi from '../api/price'
import routes from '../navigation/routes';
import i18n from '../config/i18n';

const PRICE_CHANGE_IN_LAST_24HOUR_STRING = "{CURRENCY}_24h_change";
const LAST_UPDATED = "last_updated_at";

function HomeScreen({ navigation }) {
    const { preferredFiatCurrency, setLatestPrice } = useContext(AppContext);
    const [price, setPrice] = useState();

    useEffect(() => {
        getPrice();
    }, [])

    const getPrice = async () => {
        try {
            const result = await priceApi.getLatestMarketPrice(preferredFiatCurrency.endPointKey);

            if (result && result.ok) {
                const currency = preferredFiatCurrency.endPointKey.toLowerCase();
                const coinId = priceApi.COIN_ID;

                const data = result.data[coinId];
                setPrice(data[currency]);

                const replacedString = PRICE_CHANGE_IN_LAST_24HOUR_STRING.replace("{CURRENCY}", currency);
                const formatted = data[LAST_UPDATED] ? format(fromUnixTime(data[LAST_UPDATED]), 'p') : '';
                const latestPrice = {
                    price: data[currency],
                    lastUpdatedAt: formatted,
                    priceChangeFromLast24Hour: data[replacedString]
                };
                setLatestPrice(latestPrice);
            }
        }
        catch (ex) {
            throw new Error(`${i18n.t("priceErrorMessage")} ${preferredFiatCurrency.endPointKey}: ${ex.message}`);
        }
    }

    return (
        <Screen style={styles.container}>
            <OptionsButton onPress={() => navigation.navigate(routes.SETTINGS)} />
            <Card
                preferredCurrency={preferredFiatCurrency}
                value={price}
                onPress={() => navigation.navigate(routes.PRICE_HISTORY)} />
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default HomeScreen;