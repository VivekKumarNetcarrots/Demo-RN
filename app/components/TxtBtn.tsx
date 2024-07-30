import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface BtnProps {
  label: string;
  theme: string;
  onPress: any;
}
export const BtnView: React.FC<BtnProps> = ({ label, theme, onPress }) => {
  if (theme === "primary") {
    return (
      <View
        style={[
          styles.btnContainer,
          {
            borderWidth: 4,
            borderColor: "#ffd33d",
            borderRadius: 18,
            marginTop: 18,
          },
        ]}
      >
        <Pressable
          style={[styles.btn, { backgroundColor: "#ffffff" }]}
          onPress={onPress}
        >
          <FontAwesome
            name="picture-o"
            size={18}
            color="#25292e"
            style={styles.buttonIcon}
          />
          <Text style={[styles.btnLabel, { color: "#25292e" }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }
  return (
    <View style={styles.btnContainer}>
      <Pressable style={styles.btn} onPress={onPress}>
        <Text style={styles.btnLabel}>{label}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  btn: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  btnLabel: {
    fontSize: 16,
    color: "#ffffff",
  },
  buttonIcon: {
    paddingRight: 8,
  },
});
