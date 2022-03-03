import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../config/Colors';
import Screen from './Screen';
import i18n from '../config/i18n';

function Card({ onPress, preferredCurrency, value }) {
    return (
        <Screen style={styles.screen}>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image resizeMode='contain'
                            style={styles.image}
                            source={require("../assets/bitcoin.png")}
                        ></Image>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.text}>{i18n.t('bitcoin')}</Text>
                        <Text style={[styles.text, styles.bottomRowText]}>{i18n.t('btc')}</Text>
                    </View>
                    <View style={[styles.detailsContainer, styles.balanceContainer]}>
                        <Text style={[styles.text, styles.textAlign]}>{preferredCurrency.symbol}{value}</Text>
                        <Text style={[styles.text, styles.textAlign, styles.bottomRowText]}>{preferredCurrency.endPointKey}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Screen >
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.cardBackground,
        height: 110,
        borderRadius: 5,
        flexDirection: 'row'
    },
    screen: {
        padding: 20,
    },
    imageContainer: {
        marginTop: 35,
        marginLeft: 10
    },
    image: {
        height: 40,
        width: 60,
    },
    detailsContainer: {
        justifyContent: 'center',
        padding: 10
    },
    balanceContainer: {
        flex: 1,
        marginRight: 10
    },
    text: {
        color: '#fff',
        fontSize: 20,
        padding: 5
    },
    textAlign: {
        textAlign: 'right'
    },
    bottomRowText: {
        color: '#6d767f'
    }
});

export default Card;