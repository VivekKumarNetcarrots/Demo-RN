import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface EmojiStickerProps {
  imgSize: any;
  stickerSrc: any;
}
export const EmojiSticker: React.FC<EmojiStickerProps> = ({
  imgSize,
  stickerSrc,
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const scaleImage = useSharedValue(imgSize);
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value !== imgSize * 2) {
        scaleImage.value = scaleImage.value * 2;
      } else {
        scaleImage.value = scaleImage.value / 2;
      }
    });
  const drag = Gesture.Pan().onChange((event) => {
    translateX.value += event.changeX;
    translateY.value += event.changeY;
  });
  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });
  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });
  return (
    <GestureDetector gesture={drag}>
      <Animated.View style={[containerStyle, { top: -350 }]}>
        <GestureDetector gesture={doubleTap}>
          <Animated.Image
            source={stickerSrc}
            resizeMode="contain"
            style={[imageStyle, { width: imgSize, height: imgSize }]}
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
};