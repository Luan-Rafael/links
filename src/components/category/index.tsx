import { Pressable, PressableProps, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { styles } from "./styles";

type CategoryProps = PressableProps & {
  name: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  isSelected: boolean;
};

export function Category({
  name,
  icon,
  isSelected,
  ...pressableProps
}: CategoryProps) {
  const color = isSelected ? colors.green[300] : colors.gray[400];

  return (
    <Pressable style={styles.container} {...pressableProps}>
      <MaterialIcons name={icon} size={16} color={color} />
      <Text style={[styles.name, { color }]}>{name}</Text>
    </Pressable>
  );
}
