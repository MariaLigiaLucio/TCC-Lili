import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import api from "@/utils/api";
import styles from "@/utils/styles";

export default function AddMaintenanceScreen() {
	const manutencao = useLocalSearchParams();

	const [tipo, setTipo] = useState((manutencao.tipo as string) || "");
	const [data, setData] = useState((manutencao.data as string) || "");
	const [custo, setCusto] = useState((manutencao.custo as string) || "");

	const router = useRouter();

	const handleSave = async () => {
		if (!tipo || !data || !custo) {
			alert("Preencha todos os campos!");
			return;
		}
		try {
			await api.post("/manutencoes/update", {
				id: manutencao.id,
				tipo,
				data,
				custo: Number(custo),
			});
			alert(`Manutenção ${tipo} editada com sucesso!`);
			router.back(); // volta e atualiza
		} catch {
			alert("Erro ao editar manutenção");
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Editar Manutenção</Text>
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
