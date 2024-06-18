import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import { captilize, hp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import { CommonFilterView, SectionView } from "./FilterView";
import { data } from "@/constants/data";

const FiltersModal = ({
  modalRef,
  filter,
  setfilter,
  onClose,
  onApply,
  onReset,
}) => {
  const snapPoints = useMemo(() => ["75%"], []);
  return (
    <BottomSheetModal
      ref={modalRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={customBackdrop}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.filterText}>Filters</Text>
          {Object.keys(sections).map((sectionName, index) => {
            let sectionView = sections[sectionName];
            let sectionData = data.filters[sectionName];
            let title = captilize(sectionName);
            return (
              <View key={sectionName}>
                <SectionView
                  title={title}
                  content={sectionView({ data: sectionData,filter,setfilter,filterName: sectionName })}
                />
              </View>
            );
          })}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};
const sections = {
  order: (props) => <CommonFilterView {...props} />,
  orientation: (props) => <CommonFilterView {...props} />,
  type: (props) => <CommonFilterView {...props} />,
  colors: (props) => <CommonFilterView {...props} />,
};

const customBackdrop = ({ animatedIndex, style }) => {
  const containerStyle = [StyleSheet.absoluteFill, style, styles.overlay];
  return (
    <View style={containerStyle}>
      <BlurView intensity="10" tint="dark" style={StyleSheet.absoluteFill} />
    </View>
  );
};
export default FiltersModal;

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    gap: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: "100%",
    // flex: 1,
    // backgroundColor: "red",
  },
  filterText: {
    fontSize: hp(4),
    fontWeight: "bold",
    color: theme.colors.neutral(0.8),
    marginBottom: 5,
  },
});
