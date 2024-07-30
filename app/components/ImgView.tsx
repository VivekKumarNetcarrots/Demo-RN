import React from "react";
import { Image, StyleSheet } from "react-native";

interface ImgViewerProps {
  placeholderImg: any;
  imgSrc: any;
}

export const ImgViewer: React.FC<ImgViewerProps> = ({
  placeholderImg,
  imgSrc,
}) => {
  const srcImg = imgSrc ? { uri: imgSrc } : placeholderImg;

  return <Image source={srcImg} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 420,
    borderRadius: 18,
  },
});
