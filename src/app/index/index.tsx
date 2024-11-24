import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  Text,
  Alert,
  Linking,
} from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { Categories } from "@/components/categories";
import { Link } from "@/components/link";
import { Option } from "@/components/option";
import { useCallback, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import { LinkStorage, linkStorage } from "@/storage/link-storage";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [link, setLink] = useState<LinkStorage>({} as LinkStorage);
  const [category, setCategory] = useState("");
  const [links, setLinks] = useState<LinkStorage[]>([]);

  async function getLinks() {
    await linkStorage
      .get()
      .then((data) =>
        setLinks(data.filter((item) => !category || item.category === category))
      )
      .catch((error) => {
        Alert.alert("Erro", "Não foi possível listar os links");
        console.log(error);
      });
  }

  function handleDetails(selected: LinkStorage) {
    setShowModal(true);
    setLink(selected);
  }

  async function linkRemove() {
    try {
      await linkStorage.remove(link.id);
      getLinks();
      setShowModal(false);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível excluir");
      console.log(error);
    }
  }
  async function handleRemove() {
    Alert.alert("Exluir", "Deseja realmente excluir?", [
      { style: "cancel", text: "Não" },
      {
        text: "Sim",
        onPress: linkRemove,
      },
    ]);
  }

  async function handleOpen() {
    try {
      await Linking.openURL(link.url);
      setShowModal(false);
    } catch (error) {
      Alert.alert("Link", "Não foi possível abrir o link");
      console.log(error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getLinks();
    }, [category])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("@/assets/logo.png")} style={styles.logo} />

        <TouchableOpacity onPress={() => router.navigate("../add")}>
          <MaterialIcons
            name="add"
            color={colors.green[300]}
            size={32}
          ></MaterialIcons>
        </TouchableOpacity>
      </View>

      <Categories selected={category} onChange={setCategory} />

      <FlatList
        data={links}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link
            name={item.name}
            url={item.url}
            onDetails={() => handleDetails(item)}
          ></Link>
        )}
        style={styles.links}
        contentContainerStyle={styles.linksContent}
        showsVerticalScrollIndicator={false}
      ></FlatList>

      <Modal transparent visible={showModal} animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalCategory}>{link.category}</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <MaterialIcons
                  name="close"
                  size={20}
                  color={colors.gray[400]}
                ></MaterialIcons>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalLinkName}>{link.name}</Text>
            <Text style={styles.modalUrl}>{link.url}</Text>

            <View style={styles.modalFooter}>
              <Option
                name="Excluir"
                icon="delete"
                variant="secondary"
                onPress={handleRemove}
              ></Option>
              <Option
                name="Abrir"
                icon="language"
                onPress={handleOpen}
              ></Option>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
