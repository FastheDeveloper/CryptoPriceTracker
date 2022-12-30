import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    title: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        alignItems: 'flex-end'
    },
    ticker: {
        color: 'grey',
        fontWeight: '600'
    },
    coinContainer: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#121212'

    },
    quantityContainer: {
        marginLeft: 'auto',
        alignItems: 'flex-end',

    }
})

export default styles