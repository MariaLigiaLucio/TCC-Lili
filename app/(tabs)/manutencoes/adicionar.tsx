import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import api from "@/utils/api";
import styles from "@/utils/styles";

export default function AddMaintenanceScreen() {
	const veiculo = useLocalSearchParams();
	const [tipo, setTipo] = useState("");
	const [data, setData] = useState("");
	const [custo, setCusto] = useState("");

	const router = useRouter();

	const handleSave = async () => {
		if (!tipo || !data || !custo) {
			alert("Preencha todos os campos!");
			return;
		}
		try {
			await api.post("/manutencoes/create", {
				veiculo_id: veiculo.id,
				tipo,
				data,
				custo: Number(custo),
			});
			alert(`Manutenção ${tipo} adicionada com sucesso!`);
			router.back(); // volta e atualiza
		} catch {
			alert("Erro ao adicionar manutenção");
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Adicionar Manutenção</Text>
			<TextInput
				style={styles.input}
				placeholder="Tipo"
				value={tipo}
				onChangeText={setTipo}
			/>
			<TextInput
				style={styles.input}
				placeholder="Data (DD/MM/AAAA)"
				value={data}
				onChangeText={setData}
			/>
			<TextInput
				style={styles.input}
				placeholder="Custo"
				keyboardType="numeric"
				value={custo}
				onChangeText={setCusto}
			/>
			<TouchableOpacity style={styles.button} onPress={handleSave}>
				<Text style={styles.buttonText}>Salvar</Text>
			</TouchableOpacity>
		</View>
	);
}
