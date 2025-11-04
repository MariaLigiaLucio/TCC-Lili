import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import type ManutencaoType from "@/types/Manutencao";
import type VeiculoType from "@/types/Veiculo";
import api from "@/utils/api";

export default function ReportsScreen() {
	const [veiculos, setVeiculos] = useState<VeiculoType[]>([]);
	const [manutencoes, setManutencoes] = useState<ManutencaoType[]>([]);

	useEffect(() => {
		(async () => {
			const veiculos = await api.get("/veiculos");
			const manutencoes = await api.get("/manutencoes");
			setVeiculos(veiculos.data);
			setManutencoes(manutencoes.data);
		})();
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Relatórios</Text>

			<View style={styles.cardContainer}>
				<View style={styles.card}>
					<Text style={styles.cardValue}>{veiculos.length}</Text>
					<Text style={styles.cardLabel}>Veículos</Text>
				</View>

				<View style={styles.card}>
					<Text style={styles.cardValue}> {manutencoes.length}</Text>
					<Text style={styles.cardLabel}>Manutenções</Text>
				</View>

				<View style={styles.card}>
					<Text style={styles.cardValue}>
						R$ {/* Formatar 0.000.000.000.... */}
						{manutencoes
							.reduce((acc, manutencao) => acc + manutencao.custo, 0)
							.toFixed(2)
							.replace(".", ",")
							.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
					</Text>
					<Text style={styles.cardLabel}>Custo Total</Text>
				</View>
			</View>

			<Text style={styles.footer}>Atualizado em 27/10/2025</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#e8f5e9",
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},

	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#0a8754",
		marginBottom: 20,
		textAlign: "center",
	},

	cardContainer: {
		width: "100%",
		alignItems: "center",
		gap: 16,
	},

	card: {
		width: "90%",
		backgroundColor: "#c8e6c9",
		paddingVertical: 18,
		paddingHorizontal: 24,
		borderRadius: 14,
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#a5d6a7",
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowOffset: { width: 0, height: 3 },
		shadowRadius: 4,
		elevation: 3,
	},

	cardValue: {
		fontSize: 26,
		fontWeight: "bold",
		color: "#1b5e20",
	},

	cardLabel: {
		fontSize: 15,
		color: "#2e7d32",
		marginTop: 4,
		textTransform: "uppercase",
		letterSpacing: 0.8,
	},

	footer: {
		color: "#4e6c50",
		fontSize: 12,
		marginTop: 30,
	},
});
