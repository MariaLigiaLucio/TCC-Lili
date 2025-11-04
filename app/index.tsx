import { useRouter } from "expo-router";
import { useState } from "react";
import {
	Keyboard,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import api from "@/utils/api";
import styles from "@/utils/styles";

export default function LoginScreen() {
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");

	const handleLogin = async () => {
		const res = await api.post("/auth", { email, senha });
		if (res.status === 200) {
			router.replace("/dashboard");
		} else {
			alert("Usuário ou senha inválidos!");
		}
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<Text style={styles.logo}>Classe A</Text>
				<Text style={styles.subtitle}>⭐ ⭐ ⭐ ⭐ ⭐</Text>
				<Text style={styles.title}>Login Administrativo</Text>

				<TextInput
					style={styles.input}
					placeholder="Email"
					placeholderTextColor="#666"
					value={email}
					onChangeText={setEmail}
				/>
				<TextInput
					style={styles.input}
					placeholder="Senha"
					placeholderTextColor="#666"
					secureTextEntry
					value={senha}
					onChangeText={setSenha}
				/>
				<TouchableOpacity style={styles.button} onPress={handleLogin}>
					<Text style={styles.buttonText}>Entrar</Text>
				</TouchableOpacity>
			</View>
		</TouchableWithoutFeedback>
	);
}
