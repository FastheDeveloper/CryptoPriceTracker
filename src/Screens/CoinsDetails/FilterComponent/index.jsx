import { View, Text,Pressable } from "react-native";
import React,{memo} from "react";
import styles from "../styles";

const Filters = (props) => {
  const { filterDay, filterText, selectedRange,setSelectedRange } = props;
  const isfilterSelected = (filter) => filter === selectedRange;
  return (
    <Pressable
      style={{
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 5,
        backgroundColor:isfilterSelected(filterDay) ? "#1e1e1e" :'transparent'
      }}
      onPress={()=>setSelectedRange(filterDay)}
    >
      <Text style={{ color: isfilterSelected(filterDay) ?  "white": 'grey' }}>{filterText}</Text>
    </Pressable>
  );
};

export default memo(Filters);
