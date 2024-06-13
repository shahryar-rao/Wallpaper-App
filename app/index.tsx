import {
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { wp, hp } from "../helpers/common";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import { theme } from "../constants/theme";
import { useRouter } from "expo-router";
export default function Index() {
  const router = useRouter()
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"default"} />
      <Image
        resizeMode="cover"
        style={styles.bgImage}
        source={require("../assets/images/welcome1.png")}
      />
      <Animated.View entering={FadeInDown.duration(600)} style={{ flex: 1 }}>
        <LinearGradient
          colors={[
            "rgba(255,255,255,0)",
            "rgba(255,255,255,0.8)",
            "white",
            "white",
          ]}
          style={styles.gradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.8 }}
        />
        {/* content */}
        <View style={styles.contentContainer}>
          <Animated.Text entering={FadeInDown.delay(400).springify()} style={styles.title}>Pixels</Animated.Text>
          <Animated.Text entering={FadeInDown.delay(500).springify()} style={styles.punchLine}>Every Pixel tells a story</Animated.Text>
          <View>
            <Pressable onPress={()=> router.push('home')}style={styles.startButton}>
              <Animated.Text entering={FadeInDown.delay(600).springify()} style={styles.startText}>Start Explore</Animated.Text>
            </Pressable>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    width: wp(100),
    height: hp(100),
    position: "absolute",
  },
  gradient: {
    width: wp(100),
    height: hp(60),
    position: "absolute",
    bottom: 0,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 14,
  },
  title: {
    fontSize: hp(7),
    color: theme.colors.neutral(0.9),
    fontWeight: "bold",
  },
  punchLine: {
    fontSize: hp(2),
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 10,
  },
  startButton: {
    marginBottom: 50,
    backgroundColor: theme.colors.neutral(0.9),
    padding: 15,
    paddingHorizontal: 90,
    borderRadius: theme.radius.lg,
  },
  startText: {
    color: theme.colors.white,
    letterSpacing: 1,
    fontSize: hp(2),
    fontWeight: "semibold",
  },
});
