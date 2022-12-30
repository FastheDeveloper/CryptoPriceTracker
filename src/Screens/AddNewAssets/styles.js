import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    dropDownCotainer: {
        width: "100%",
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    itemStyle: {
        padding: 10,
        marginTop: 2,
        backgroundColor: "#1e1e1e",
        borderWidth: 1,
        borderColor: "#444444",
        borderRadius: 5,
    },
    ticker: {
        color: 'grey',
        fontWeight: '200',
        fontSize: 20,
        marginTop: 25,
        marginLeft: 5
    },
    boughtQuantity: {
        flex: 1,
        alignItems: 'center',
        marginTop: 50
    },
    buttonText: {

        fontSize: 17,
        fontWeight: '600'
    },
    buttonContainer: {

        padding: 10,
        alignItems: 'center',
        marginVertical: 30,
        marginHorizontal: 25,
        borderRadius: 5
    },
    pricePerCoin: {
        color: 'grey',
        fontWeight: '700',
        fontSize: 17,
        letterSpacing: 0.5
    }

});

export default styles;