import { View, Alert, Keyboard, TouchableOpacity } from "react-native";
import { useState } from "react";
import { TextInput, Button, Card, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function HomeScreen() {
  const [meal, setMeal] = useState("");
  const [insulin, setInsulin] = useState("");
  const [time, setTime] = useState("");
  const [glucose, setGlucose] = useState("");
  const [date, setDate] = useState(new Date()); // Data padrão é o dia atual
  const [showPicker, setShowPicker] = useState(false);

  // Função para salvar no AsyncStorage
  const saveMeal = async () => {
    if (!meal || !insulin || !time || !glucose) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    try {
      const newRecord = { 
        id: Date.now().toString(), 
        date: date.toLocaleDateString(), // Salvar data formatada
        time, 
        meal, 
        insulin, 
        glucose 
      };

      const existingRecords = await AsyncStorage.getItem("meals");
      const updatedRecords = existingRecords ? JSON.parse(existingRecords) : [];
      updatedRecords.push(newRecord);

      await AsyncStorage.setItem("meals", JSON.stringify(updatedRecords));
      Alert.alert("Sucesso", "Refeição salva com sucesso!");

      // Fechar teclado e limpar os campos após salvar
      Keyboard.dismiss();
      setMeal("");
      setInsulin("");
      setTime("");
      setGlucose("");
      setDate(new Date()); // Reseta a data para o dia atual
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar.");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#F2F2F2" }}>
      <Card style={{ padding: 20, borderRadius: 10 }}>
        <Text variant="titleLarge" style={{ marginBottom: 10 }}>
          Registrar Refeição
        </Text>

        {/* Campo de Data */}
        <TouchableOpacity onPress={() => setShowPicker(true)}>
          <TextInput
            label="Data"
            mode="outlined"
            value={date.toLocaleDateString()}
            editable={false} // Impede a edição manual
            style={{ marginBottom: 10 }}
          />
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowPicker(false);
              if (selectedDate) {
                setDate(selectedDate);
              }
            }}
          />
        )}

        <TextInput
          label="Horário da refeição"
          mode="outlined"
          placeholder="Ex: 12:00"
          value={time}
          onChangeText={setTime}
          style={{ marginBottom: 10 }}
        />

        <TextInput
          label="Refeição"
          mode="outlined"
          placeholder="Ex: Almoço"
          value={meal}
          onChangeText={setMeal}
          style={{ marginBottom: 10 }}
        />

        <TextInput
          label="Insulina Aplicada (U)"
          mode="outlined"
          keyboardType="numeric"
          placeholder="Ex: 5"
          value={insulin}
          onChangeText={setInsulin}
          style={{ marginBottom: 10 }}
        />

        <TextInput
          label="Glicemia (mg/dL)"
          mode="outlined"
          keyboardType="numeric"
          placeholder="Ex: 110"
          value={glucose}
          onChangeText={setGlucose}
          style={{ marginBottom: 10 }}
        />

        <Button
          mode="contained"
          onPress={saveMeal}
          style={{ marginTop: 10, borderRadius: 10 }}
        >
          Salvar Refeição
        </Button>
      </Card>
    </View>
  );
}
