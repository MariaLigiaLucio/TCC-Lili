import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
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
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							borderColor: "#0a8754",
							borderWidth: 1,
							marginBottom: 10,
							padding: 10,
							borderRadius: 5,
						}}
					>
						<Text style={styles.listText}>
							{item.tipo} - {item.data} - R$ {item.custo}
						</Text>
						<TouchableOpacity
							style={{
								backgroundColor: "red",
								padding: 5,
								borderRadius: 5,
								marginLeft: 10,
							}}
							onPress={() => {
                                api.delete(`/manutencoes/delete?id=${item.id}`).then(() => {
                                    carregarManutencoes();
                                }).catch((error) => console.error(error));
							}}
						>
							<Text style={styles.buttonText}>Apagar</Text>
						</TouchableOpacity>
					</View>
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
