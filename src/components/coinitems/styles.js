import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    
    title:{
      color:'white',
      fontSize:16,
      fontWeight:'bold',
      
    },
    text:{
      color:'white',
      marginRight:5
    },
    row:{
      flexDirection:'row',
    },
    coinContainer:{
      flexDirection:'row',
      padding:12,
      borderBottomWidth:StyleSheet.hairlineWidth,
      borderBottomColor:'#d68c45'
    },
    rank:{
      fontWeight:'bold',
      color:'white'
    },
    rankContainer:{
      backgroundColor:'#d9d9d9',
      paddingHorizontal:5,
      borderRadius:5,
      marginRight:5
  
    }
  
  });
  export default styles;