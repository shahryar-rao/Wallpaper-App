import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native'
import {data} from "../constants/data"
import { hp, wp } from '@/helpers/common'
import { theme } from '@/constants/theme'

const Categories = ({category,handleCategory}) => {
  return (
    <>
  <FlatList
  horizontal
  data={data.categories}
  contentContainerStyle={styles.flatListContainer}
  showsHorizontalScrollIndicator={false}
  keyExtractor={item=>item}
  renderItem={({item,index})=>(
    <CategoryItem 
    isActive={category === item}
    handleCategory={handleCategory}
    title={item} 
    index={index}/>
  )}
  />
    </>
  )
}

export default Categories


const CategoryItem=({title,index,handleCategory})=>{
    return(
        <View>
            <Pressable onPress={()=>handleCategory(isActive? null : title)} style={[styles.category]}>
            <Text style={[styles.title]}>{title}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    flatListContainer:{
        paddingHorizontal:wp(4),
       gap:8
    },
    category:{
        padding:10,
        borderWidth:1,
        borderColor: theme.colors.grayBg,
        borderRadius: theme.radius.lg,
        // backgroundColor: theme.colors.white
    },
    title:{
        fontSize: hp(1.8),
        fontWeight:"semibold"

    }
})