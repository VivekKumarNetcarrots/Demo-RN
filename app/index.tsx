import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, View } from "react-native";
import { ImgViewer } from "./components/ImgView";
import { BtnView } from "./components/TxtBtn";
import * as ImagePicker from "expo-image-picker";
import { useRef, useState } from "react";
import { IconBtn } from "./components/IconBtn";
import { CircleBtn } from "./components/CircleBtn";
import { EmojiPicker } from "./components/EmojiPicker";
import { EmojiList } from "./components/EmojiList";
import { EmojiSticker } from "./components/EmojiSticker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import domtoimage from "dom-to-image";

const PlaceholderImage = require("./../assets/images/background-image.png");

export default function Index() {
  const [selectedImg, setSelectedImg] = useState("");
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const imageRef = useRef<View>(null);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  if (status === null) {
    requestPermission();
  }

  const pickImgAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      console.log("Result:>>>", result);
      setSelectedImg(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("You did not select any image.");
    }
  };
  const onReset = () => {
    setShowAppOptions(false);
  };
  const onAddStiker = () => {
    setIsModalVisible(true);
  };
  const onSaveImageAsync = async () => {
    if (Platform.OS !== "web") {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });
        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert("Saved successfully.");
        }
        console.log("Saved:>>>", localUri);
      } catch (error) {
        console.log("SavingErr:>>>", error);
      }
    } else {
      if (imageRef.current) {
        try {
          const dataUrl = await domtoimage.toJpeg(
            imageRef.current as unknown as HTMLElement,
            {
              quality: 0.95,
              width: 320,
              height: 440,
            }
          );
          let link = document.createElement("a");
          link.download = "vsking-smash.jpeg";
          link.href = dataUrl;
          link.click();
        } catch (error) {
          console.log("SavingErr:>>>", error);
        }
      }
    }
  };
  const onModalClose = () => {
    setIsModalVisible(false);
  };
  return (
    <GestureHandlerRootView style={styles.container}>
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImgViewer placeholderImg={PlaceholderImage} imgSrc={selectedImg} />
          {pickedEmoji && (
            <EmojiSticker imgSize={40} stickerSrc={pickedEmoji}></EmojiSticker>
          )}
        </View>
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconBtn icon="refresh" label="Reset" onPress={onReset}></IconBtn>
            <CircleBtn onPress={onAddStiker}></CircleBtn>
            <IconBtn
              icon="save-alt"
              label="Save"
              onPress={onSaveImageAsync}
            ></IconBtn>
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <BtnView
            label="Choose a photo"
            theme="primary"
            onPress={pickImgAsync}
          />
          <BtnView
            label="Use this photo"
            theme=""
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#25292e",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    color: "#ffffff",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 50,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionsContainer: {
    position: "absolute",
    bottom: 60,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
