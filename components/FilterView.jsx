import { theme } from "@/constants/theme";
import { captilize, hp } from "@/helpers/common";
import { Pressable, StyleSheet, Text, View } from "react-native";

export const SectionView = ({ title, content }) => {
  return (
    <View style={styles.contentContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View>{content}</View>
    </View>
  );
};
export const CommonFilterView = ({ data, filterName, filter, setfilter }) => {
  const onSelect = (item)=>{
    setfilter({...filter,[filterName]:item})
  }
  return (
    <View style={styles.flexRowWrap}>
      {data &&
        data.map((item, index) => {
          let isActive = filter && filter[filterName] == item;
          let backgroundColor = isActive ? theme.colors.neutral(0.7) : "white";
          let color = isActive ? theme.colors.white : theme.colors.neutral(0.8);
          return (
            <Pressable
            onPress={()=>onSelect(item)}
              key={index}
              style={[styles.outlinedButton, {backgroundColor}]}
            >
              <Text style={[styles.outlinedButtonText, {color}]}>
                {captilize(item)}
              </Text>
            </Pressable>
          );
        })}
    </View>
  );
};
export const ColorFilter = ({ data, filterName, filter, setfilter }) => {
  const onSelect = (item)=>{
    setfilter({...filter,[filterName]:item})
  }
  return (
    <View style={styles.flexRowWrap}>
      {data &&
        data.map((item, index) => {
          let isActive = filter && filter[filterName] == item;
          let borderColor = isActive? theme.colors.neutral(0.4) : "white"
          return (
            <Pressable
            onPress={()=>onSelect(item)}
              key={index}
            >
              <View style={[styles.colorWrapper,{borderColor}]}>
                <View style={[styles.color,{backgroundColor:item}]}></View>
              </View>
            </Pressable>
          );
        })}
    </View>
  );
};
const styles = StyleSheet.create({
  contentContainer: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: hp(2.4),
    color: theme.colors.neutral(0.8),
    fontWeight: "bold",
  },
  flexRowWrap: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  outlinedButton: {
    padding: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: theme.colors.grayBg,
    borderRadius: theme.radius.xs,
    borderCurve: "continuous",
  },outlinedButtonText:{
    
  },color:{
    borderCurve: "continuous",
    height: 30, width: 40, borderRadius: theme.radius.sm-3,
  },
  colorWrapper:{
    padding: 3,
    borderRadius: theme.radius.sm,
    borderWidth: 2,
    borderCurve: "continuous",
  }
});
