import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import type ManutencaoType from "@/types/Manutencao";
import api from "@/utils/api";
import styles from "@/utils/styles";

export default function Manutencoes() {
	const veiculo = useLocalSearchParams();
	const [manutencoes, setManutencoes] = useState<ManutencaoType[]>([]);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	// Recarrega toda vez que a tela voltar
	useFocusEffect(
		useCallback(() => {
			carregarManutencoes();
		}, []),
	);

	const carregarManutencoes = async () => {
		try {
			setLoading(true);
			const response = await api.get(`/manutencoes?id=${veiculo.id}`);
			setManutencoes(response.data);
		} catch {
			alert("Erro ao carregar manutenções");
		} finally {
			setLoading(false);
		}
	};

	if (loading) return <ActivityIndicator size="large" color="#0a8754" />;

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Manutenções - {veiculo.modelo}</Text>
			<FlatList
				data={manutencoes}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<View style={localStyles.card}>
						<View style={{ flex: 1 }}>
							<Text style={localStyles.tipo}>{item.tipo}</Text>
							<Text style={localStyles.infoText}>Data: {item.data}</Text>
							<Text style={localStyles.infoText}>Custo: R$ {item.custo}</Text>
						</View>

						<View style={localStyles.actions}>
							<TouchableOpacity
								style={[
									localStyles.actionButton,
									{ backgroundColor: "#0a8754" },
								]}
								onPress={() =>
									router.push({
										pathname: "/manutencoes/editar",
										params: {
											id: item.id,
											tipo: item.tipo,
											data: item.data,
											custo: item.custo,
										},
									})
								}
							>
								<Text style={localStyles.actionText}>Editar</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									localStyles.actionButton,
									{ backgroundColor: "#e53935" },
								]}
								onPress={() => {
									api
										.delete(`/manutencoes/delete?id=${item.id}`)
										.then(() => carregarManutencoes())
										.catch(console.error);
								}}
							>
								<Text style={localStyles.actionText}>Apagar</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}
				ListEmptyComponent={
					<Text style={localStyles.emptyText}>
						Nenhuma manutenção cadastrada
					</Text>
				}
			/>
			<TouchableOpacity
				style={styles.button}
				onPress={() =>
					router.push({
						pathname: "/manutencoes/adicionar",
						params: { ...veiculo },
					})
				}
			>
				<Text style={styles.buttonText}>Adicionar Manutenção</Text>
			</TouchableOpacity>
		</View>
	);
}

const localStyles = StyleSheet.create({
	card: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: "#c8e6c9",
		padding: 15,
		marginVertical: 6,
		borderRadius: 10,
		width: "100%",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	tipo: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#0a8754",
		marginBottom: 5,
	},
	infoText: {
		color: "#1b5e20",
		fontSize: 15,
	},
	actions: {
		flexDirection: "column",
		gap: 6,
	},
	actionButton: {
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 6,
		alignItems: "center",
	},
	actionText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 14,
	},
	emptyText: {
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
		marginVertical: 20,
		color: "#555",
	},
});
