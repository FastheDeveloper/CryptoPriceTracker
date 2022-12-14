import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    iconView:{
        marginTop:10,
        flexDirection:'row',
        
        alignItems:'center',
        justifyContent:'space-between'
    },
    mid:{
    flexDirection:'row',
    alignItems:'center',
    },
    symbol:{
        color:'white',
        fontWeight:'bold',
        marginHorizontal:6,
        fontSize:16
    },
   price: {
    color:'white',
    fontSize:30,
    fontWeight:'bold',
    letterSpacing:2
},
names:{
    color:'white',fontSize:15
},
input:{
    flex:1,
    
    height:40,
    margin:12,
    borderBottomWidth:1,
    borderBottomColor:'white',
    padding:10,
    fontSize:16,
    color:'white', 
    
}
  
  });

  export default styles;