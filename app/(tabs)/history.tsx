import { View, FlatList, Alert } from "react-native";
import { useState, useEffect } from "react";
import { TextInput, Card, Text, List, IconButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HistoryScreen() {
  const [search, setSearch] = useState("");
  const [meals, setMeals] = useState([]);

  // Carregar refeições do AsyncStorage
  const loadMeals = async () => {
    try {
      const storedMeals = await AsyncStorage.getItem("meals");
      if (storedMeals) {
        setMeals(JSON.parse(storedMeals));
      } else {
        setMeals([]);
      }
    } catch (error) {
      console.error("Erro ao carregar refeições:", error);
    }
  };

  useEffect(() => {
    loadMeals();
  }, []);

  // Excluir refeição
  const deleteMeal = async (id) => {
    try {
      const updatedMeals = meals.filter((meal) => meal.id !== id);
      await AsyncStorage.setItem("meals", JSON.stringify(updatedMeals));
      setMeals(updatedMeals);
      Alert.alert("Sucesso", "Refeição excluída!");

      // Recarregar os dados para garantir que a lista seja atualizada
      loadMeals();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível excluir.");
    }
  };

  // Filtrar refeições pelo nome
  const filteredMeals = meals.filter((item) =>
    item.meal.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#F2F2F2" }}>
      <TextInput
        label="Filtrar por refeição"
        mode="outlined"
        placeholder="Ex: Almoço"
        value={search}
        onChangeText={setSearch}
        style={{ marginBottom: 10 }}
      />

      <FlatList
        data={filteredMeals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 10, padding: 10 }}>
            <List.Item
              title={`${item.date} - ${item.time} - ${item.meal}`}
              description={`Insulina: ${item.insulin}U | Glicemia: ${item.glucose} mg/dL`}
              left={(props) => <List.Icon {...props} icon="food" />}
              right={(props) => (
                <IconButton
                  {...props}
                  icon="delete"
                  onPress={() => deleteMeal(item.id)}
                />
              )}
            />
          </Card>
        )}
      />
    </View>
  );
}
