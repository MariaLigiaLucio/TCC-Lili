import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "@/utils/styles";
import { useState } from "react";
import api from "@/utils/api";

export default function VehicleDetailScreen() {
	const router = useRouter();
	const veiculo = useLocalSearchParams();

	const [placa, setPlaca] = useState<string>((veiculo.placa as string) || "");
	const [modelo, setModelo] = useState<string>(
		(veiculo.modelo as string) || "",
	);
	const [km, setKm] = useState<string>((veiculo.km as string) || "");

	const handleSave = async () => {
		if (!placa || !modelo || !km) {
			alert("Preencha todos os campos!");
			return;
		}
		try {
			await api.post("/veiculos/update", {
				id: veiculo.id,
				placa,
				modelo,
				km: Number(km),
			});
			router.back(); 
		} catch (error) {
			alert("Erro ao salvar veículo");
			console.error(error);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Editar Veículo</Text>
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
