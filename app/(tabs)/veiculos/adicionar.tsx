import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import api from "@/utils/api";
import styles from "@/utils/styles";
import { useRouter } from "expo-router";

export default function AddVehicleScreen() {
	const [placa, setPlaca] = useState("");
	const [modelo, setModelo] = useState("");
	const [km, setKm] = useState("");

	const router = useRouter();

	const handleSave = async () => {
		if (!placa || !modelo || !km) {
			alert("Preencha todos os campos!");
			return;
		}
		try {
			await api.post("/veiculos/create", { placa, modelo, km: Number(km) });
			alert(`Veículo ${modelo} adicionado com sucesso!`);
			router.back(); // volta e atualiza automaticamente
		} catch (error) {
			alert("Erro ao salvar veículo");
			console.error(error);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Adicionar Veículo</Text>
			<TextInput
				style={styles.input}
				placeholder="Placa"
				value={placa}
				onChangeText={setPlaca}
			/>
			<TextInput
				style={styles.input}
				placeholder="Modelo"
				value={modelo}
				onChangeText={setModelo}
			/>
			<TextInput
				style={styles.input}
				placeholder="Km"
				keyboardType="numeric"
				value={km}
				onChangeText={setKm}
			/>
			<TouchableOpacity style={styles.button} onPress={handleSave}>
				<Text style={styles.buttonText}>Salvar</Text>
			</TouchableOpacity>
		</View>
	);
}
