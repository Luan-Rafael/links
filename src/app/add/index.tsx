import { MaterialIcons } from "@expo/vector-icons";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { colors } from "@/styles/colors";
import { Categories } from "@/components/categories";
import { router } from "expo-router";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { useState } from "react";
import { linkStorage } from "@/storage/link-storage";

export default function Add() {
  const [isDisabled, setIsDisabledy] = useState(false);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  async function handleAdd() {
    if (!category) {
      return Alert.alert("Categoria", "Selecione a categoria");
    }
    if (!name.trim()) {
      return Alert.alert("Nome", "Informe o nome");
    }
    if (!url.trim()) {
      return Alert.alert("URL", "Informe a URL");
    }

    setIsDisabledy(true);

    await linkStorage
      .save({
        id: new Date().getTime().toString(),
        category,
        name,
        url,
      })
      .then(() => {
        Alert.alert("Salvo", "Novo link adicionado", [
          { text: "ok", onPress: () => router.back() },
        ]);
      })
      .catch((error) => {
        Alert.alert("Erro", "Não foi possível salvar o link");
        console.log(error);
      })
      .finally(() => {
        setIsDisabledy(false);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={32} color={colors.gray[200]} />
        </TouchableOpacity>

        <Text style={styles.title}>Novo</Text>
      </View>

      <Text style={styles.label}>Selecione uma categoria</Text>

      <Categories onChange={setCategory} selected={category} />

      <View style={styles.form}>
        <Input
          value={name}
          placeholder="Nome"
          onChangeText={(value) => setName(value.trim())}
          autoCorrect={false}
        />
        <Input
          value={url}
          placeholder="URL"
          onChangeText={(value) => setUrl(value.trim())}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <Button title="Adicionar" onPress={handleAdd} disabled={isDisabled} />
      </View>
    </View>
  );
}
