import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import type VeiculoType from "@/types/Veiculo";
import api from "@/utils/api";
import styles from "@/utils/styles";

export default function Veiculos() {
	const [veiculos, setVeiculos] = useState<VeiculoType[]>([]);
	const [loading, setLoading] = useState(true);

	const router = useRouter();

	// Sempre recarrega ao voltar pra tela
	useFocusEffect(
		useCallback(() => {
			carregarVeiculos();
		}, []),
	);

	const carregarVeiculos = async () => {
		try {
			setLoading(true);
			const response = await api.get("/veiculos");
			setVeiculos(response.data);
		} catch (error) {
			alert("Erro ao carregar veículos");
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	if (loading) return <ActivityIndicator size="large" color="#0a8754" />;

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Lista de Veículos</Text>
			<FlatList
				data={veiculos}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={styles.listItem}
						onPress={() =>
							router.push({
								pathname: "/veiculos/detalhes",
								params: { id: item.id },
							})
						}
					>
						<Text style={styles.listText}>
							{item.modelo} - {item.placa}
						</Text>
					</TouchableOpacity>
				)}
				ListEmptyComponent={
					<Text
						style={{
							fontSize: 18,
							fontWeight: "bold",
							textAlign: "center",
							marginTop: 20,
							marginBottom: 20,
						}}
					>
						Nenhum veículo cadastrado
					</Text>
				}
			/>
			<TouchableOpacity
				style={styles.button}
				onPress={() => router.push("/veiculos/adicionar")}
			>
				<Text style={styles.buttonText}>Adicionar Veículo</Text>
			</TouchableOpacity>
		</View>
	);
}
