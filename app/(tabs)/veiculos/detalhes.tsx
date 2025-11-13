import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import type VeiculoType from "@/types/Veiculo";
import api from "@/utils/api";
import styles from "@/utils/styles";

export default function VehicleDetailScreen() {
	const router = useRouter();
	const [veiculo, setVeiculo] = useState<VeiculoType | null>(null);
	const params = useLocalSearchParams();

	useFocusEffect(
		useCallback(() => {
			const fetchVeiculo = async () => {
				try {
					const response = await api.get("/veiculos");
					setVeiculo(
						response.data.find((v: VeiculoType) => v.id === params.id) || null,
					);
				} catch (error) {
					console.error("Erro ao buscar veículo:", error);
				}
			};

			fetchVeiculo();

			// opcional: cleanup quando sai da tela
			return () => {
				console.log("Saindo da tela de veículo");
			};
		}, [params.id]),
	);

	if (veiculo)
		return (
			<View style={styles.container}>
				<Text style={styles.title}>{veiculo.modelo}</Text>
				<Text style={styles.info}>Placa: {veiculo.placa}</Text>
				<Text style={styles.info}>Quilometragem: {veiculo.km} km</Text>
				<TouchableOpacity
					style={styles.button}
					onPress={() =>
						router.push({
							pathname: "/manutencoes",
							params: { ...veiculo },
						})
					}
				>
					<Text style={styles.buttonText}>Ver Manutenções</Text>
				</TouchableOpacity>
				<View style={{ flexDirection: "row", gap: "4%" }}>
					<TouchableOpacity
						style={{ ...styles.button, width: "48%" }}
						onPress={() =>
							router.push({
								pathname: "/veiculos/editar",
								params: { ...veiculo },
							})
						}
					>
						<Text style={styles.buttonText}>Editar</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{ ...styles.button_delete, width: "48%" }}
						onPress={() =>
							api
								.delete(`/veiculos/delete?id=${veiculo.id}`)
								.then(() => router.back())
								.catch((error) => console.error(error))
						}
					>
						<Text style={styles.buttonText}>Apagar</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	else {
		return <ActivityIndicator size="large" color="#0a8754" />;
	}
}
