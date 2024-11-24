import { categories } from "@/utils/categories";
import { Category } from "../category";
import { FlatList } from "react-native";
import { styles } from "./styles";

type Props = {
  selected: string;
  onChange: (category: string) => void;
};

export function Categories({ selected, onChange }: Props) {
  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={categories}
      renderItem={({ item }) => (
        <Category
          name={item.name}
          icon={item.icon}
          isSelected={item.name === selected}
          onPress={() => onChange(item.name !== selected ? item.name : "")}
        />
      )}
      horizontal
      style={styles.container}
      contentContainerStyle={styles.content}
    />
  );
}
