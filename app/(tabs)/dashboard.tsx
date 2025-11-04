import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "@/utils/styles";

export default function Dashboard() {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Painel Administrativo</Text>
            <TouchableOpacity style={styles.button} onPress={() => router.push("/veiculos")}>
                <Text style={styles.buttonText}>Gerenciar Veículos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => router.push("/relatorios")}>
                <Text style={styles.buttonText}>Relatórios</Text>
            </TouchableOpacity>
        </View>
    );
}