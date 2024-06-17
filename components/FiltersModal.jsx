import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import React, { useMemo } from 'react'
import { StyleSheet, Text } from 'react-native'

const FiltersModal = ({modalRef}) => {
    const snapPoints = useMemo(() => ['75%'], []);
  return (
    <BottomSheetModal
    ref={modalRef}
    index={0}
    snapPoints={snapPoints}
  >
    <BottomSheetView style={styles.contentContainer}>
      <Text>Awesome 🎉</Text>
    </BottomSheetView>
  </BottomSheetModal>
  )
}

export default FiltersModal

const styles = StyleSheet.create({
    contentContainer:{
        textAlign:"center"
    }
})