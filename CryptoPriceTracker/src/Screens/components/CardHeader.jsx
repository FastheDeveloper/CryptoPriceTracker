import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import styles from '../CoinsDetails/styles'
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';


const CardHeader = (props) => {
    
    const {image,  symbol,marketCapRank}=props;
    return (
        <View>
             <View style={styles.iconView}>
                <Ionicons name="chevron-back-sharp" size={35} color="white" />
                <View style={styles.mid}>
                    <Image 
                    source={{uri:image}} style={{height:30,width:30}}
                    />
                    <Text style={styles.symbol}>{symbol.toUpperCase()}</Text>
                    <View>
                    <Text style={{color:'white',fontWeight:'bold',fontSize:14}}>#{marketCapRank}</Text>
                    </View>
                </View>
                <Fontisto name="user-secret" size={24} color="white" />
            </View>
        </View>
    );
};

export default CardHeader;