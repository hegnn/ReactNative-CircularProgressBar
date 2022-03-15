import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect } from "react";
import Svg, { Circle } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ReText } from "react-native-redash";

const BG_COLOR = "#444B6F";
const BG_STROKE_COLOR = "#303858";
const STROKE_COLOR = "#A6E1FA";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const CIRCLE_LENGTH = 1000;
const R = CIRCLE_LENGTH / (2 * Math.PI);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const App = () => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, { duration: 2000 });
  }, []);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}`;
  });

  const onPress = useCallback(() => {
    progress.value = withTiming(progress.value > 0 ? 0 : 1, { duration: 2000 });
  })

  return (
    <View style={styles.container}>
      <ReText style={styles.text} text={progressText} />
      <Svg style={{position:"absolute"}}>
        <Circle
          cx={WIDTH / 2}
          cy={"50%"}
          r={R}
          stroke={BG_STROKE_COLOR}
          strokeWidth={30}
        />
        <AnimatedCircle
          cx={WIDTH / 2}
          cy={"50%"}
          r={R}
          stroke={STROKE_COLOR}
          strokeWidth={15}
          strokeDasharray={CIRCLE_LENGTH}
          strokeLinecap={"round"}
          animatedProps={animatedProps}
        />
      </Svg>
      <Pressable style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Run</Text>
      </Pressable>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: BG_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 80,
    color: "white",
  },
  button:{
      backgroundColor: BG_STROKE_COLOR,
      position:"absolute",
      width: WIDTH * 0.7,
      height: 60,
      bottom:40,
      borderRadius: 25,
      alignItems:"center",
      justifyContent:"center"
  },
  buttonText:{
      color:"white",
      fontSize: 25,
      letterSpacing: 2
  }
});
