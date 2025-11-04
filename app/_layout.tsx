import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BaseLayout() {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#0f172a" }}>
			<Stack
				screenOptions={{
					headerStyle: { backgroundColor: "#0a8754" },
					headerTintColor: "#fff",
					headerTitleAlign: "center",
					//headerBackTitleVisible: false, // remove texto do botão de voltar
				}}
			>
				{/* Aqui você pode definir títulos e opções individuais */}
				<Stack.Screen name="index" options={{ title: "Login" }} />
				<Stack.Screen name="(tabs)/dashboard" options={{ title: "Painel" }} />
				<Stack.Screen
					name="(tabs)/veiculos/index"
					options={{ title: "Veículos" }}
				/>
				<Stack.Screen
					name="(tabs)/veiculos/detalhes"
					options={{ title: "Detalhes Veículo" }}
				/>
				<Stack.Screen
					name="(tabs)/veiculos/adicionar"
					options={{ title: "Adicionar Veículo" }}
				/>
				<Stack.Screen
					name="(tabs)/manutencoes/index"
					options={{ title: "Manutenções" }}
				/>
				<Stack.Screen
					name="(tabs)/manutencoes/adicionar"
					options={{ title: "Adicionar Manutenção" }}
				/>

				<Stack.Screen
					name="(tabs)/relatorios"
					options={{ title: "Relatorios" }}
				/>
			</Stack>
		</SafeAreaView>
	);
}
