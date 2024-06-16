import { theme } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";
import {
  Feather,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
} from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {getPictures} from "../app/api/index"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Categories from "../components/Categories"
const home = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 20 : 30;
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(null)
  const searchInputRef = useRef(null)

  const [images,setImages] = useState([])
  const handleCategory = (cat) =>{
    setCategory(cat)
  }
  useEffect(()=>{
  fetchImages()
  },[])
  const fetchImages= async (params={page:1},append=true)=>{
    let res = await getPictures(params)
     if(res.success && res?.data?.hits){
      if(append)
           setImages([...images,...res.data.hits])
      else
           setImages([...res.data.hits])
     }
  }
  return (
    <>
      <View style={[{ paddingTop }]}>
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable>
            <Text style={styles.title}>Pixels</Text>
          </Pressable>
          <Pressable>
            <FontAwesome6
              name="bars-staggered"
              size={22}
              color={theme.colors.neutral(0.7)}
            />
          </Pressable>
        </View>
        <ScrollView contentContainerStyle={{ gap: 15 }}>
          {/* SEARCH BAR */}
          <View style={styles.searchBar}>
            <View style={styles.searchIcon}>
              <Feather
                name="search"
                size={24}
                color={theme.colors.neutral(0.4)}
              />
            </View>
            <TextInput
              placeholder="Search for photos..."
              style={styles.searchInput}
              value={search}
              onChangeText={search=>setSearch(search)}
              ref={searchInputRef}
            />

           {search && <Pressable style={styles.closeIcon}>
              <Ionicons
                name="close"
                size={24}
                color={theme.colors.neutral(0.6)}
              />
            </Pressable>}
          </View>
          <Categories category={category} handleCategory={handleCategory}/>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: wp(4),
  },
  title: {
    fontSize: hp(4),
    fontWeight: "bold",
    color: theme.colors.neutral(0.9),
  },
  searchBar: {
    marginHorizontal: wp(4),
    marginTop: hp(1.2),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: theme.radius.lg,
    padding: 6,
    paddingLeft: 10,
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.grayBg,
  },
  searchIcon: {
    padding: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: hp(2),
    paddingVertical: 10,
  },
  closeIcon: {
    backgroundColor: theme.colors.neutral(0.1),
    padding: 8,
    borderRadius: theme.radius.sm,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default home;
