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
export const CommonFilterView = ({data,filterName,filter,setFilter})=>{
    return(
      <View>
        {
            data && data.map((item,index)=>{
                return(
                    <Pressable>
                        <Text>{captilize(item)}</Text>
                    </Pressable>
                )
            })
        }
      </View>
    )
  }
const styles = StyleSheet.create({
  contentContainer: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: hp(2.4),
    color: theme.colors.neutral(0.8),
    fontWeight: "bold",
  },
});
