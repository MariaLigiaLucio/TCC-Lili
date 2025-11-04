import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "@/utils/styles";

export default function VehicleDetailScreen() {
	const router = useRouter();
	const veiculo = useLocalSearchParams();
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
		</View>
	);
}
