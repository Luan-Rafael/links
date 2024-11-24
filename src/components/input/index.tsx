import { TextInput, TextInputProps } from "react-native";
import { styles } from "./style";
import { colors } from "@/styles/colors";

export function Input(props: TextInputProps) {
  return (
    <TextInput
      style={styles.container}
      {...props}
      placeholderTextColor={colors.gray[400]}
    ></TextInput>
  );
}
