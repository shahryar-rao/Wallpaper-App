import { theme } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";
import {
  Feather,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
} from "@expo/vector-icons";
import ImageGrid from "../components/ImageGrid";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { getPictures } from "../app/api/index";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Categories from "../components/Categories";
import { debounce } from "lodash";
import FiltersModal from "@/components/FiltersModal";

var page = 1;
const home = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 20 : 30;
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(null);
  const [filter, setfilter] = useState(null);
  const searchInputRef = useRef(null);
  const modalRef = useRef(null);

  const [images, setImages] = useState([]);
  const handleCategory = (cat) => {
    setCategory(cat);
    clearSearch();
    setImages([]);
    page = 1;
    let params = {
      page,
    };
    if (cat) params.category = cat;
    fetchImages(params, false);
  };
  useEffect(() => {
    fetchImages();
  }, []);
  const fetchImages = async (params = { page: 1 }, append = false) => {
    let res = await getPictures(params);
    if (res.success && res?.data?.hits) {
      if (append) setImages([...images, ...res.data.hits]);
      else setImages([...res.data.hits]);
    }
  };
  const handleSearch = (text) => {
    setCategory(null);

    setSearch(text);
    if (text.length > 2) {
      setImages([]);
      fetchImages({ page, q: text }, false);
    }
    if (text == "") {
      page = 1;
      searchInputRef?.current?.clear();
      setImages([]);
      fetchImages({ page }, false);
    }
  };
  const clearSearch = (text) => {
    setSearch(text);
    searchInputRef?.current?.clear();
  };
  const openFilterModal = ()=>{
    modalRef?.current?.present()
  }
  const closeFilterModal = ()=>{
    modalRef?.current?.close()
  }
  const applyFilters = ()=>{
    console.log("applyFilters");
    closeFilterModal()
  }
  const resetFilters = ()=>{
    console.log("resetFilters");
    closeFilterModal()
  }
  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);
  return (
    <>
      <StatusBar barStyle={"dark-content"} />
      <View style={[{ paddingTop }]}>
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable>
            <Text style={styles.title}>Pixels</Text>
          </Pressable>
          <Pressable onPress={openFilterModal}>
            <FontAwesome6
              name="bars-staggered"
              size={22}
              color={theme.colors.neutral(0.7)}
            />
          </Pressable>
        </View>
        <ScrollView contentContainerStyle={{ gap: 15 }} overScrollMode="never">
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
              onChangeText={handleTextDebounce}
              ref={searchInputRef}
            />

            {search && (
              <Pressable
                onPress={() => handleSearch("")}
                style={styles.closeIcon}
              >
                <Ionicons
                  name="close"
                  size={24}
                  color={theme.colors.neutral(0.6)}
                />
              </Pressable>
            )}
          </View>
          <Categories category={category} handleCategory={handleCategory} />
          <View>{images.length > 0 && <ImageGrid images={images} />}</View>
        </ScrollView>
        <FiltersModal modalRef={modalRef} filter={filter} setfilter={setfilter} onClose={closeFilterModal} onApply={applyFilters} onReset={resetFilters}/>
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
