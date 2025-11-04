import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8f5e9',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    logo: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#0a8754',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 18,
        color: '#0a8754',
        marginBottom: 30,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#0a8754',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#b2dfdb',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#0a8754',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    listItem: {
        backgroundColor: '#c8e6c9',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        width: '100%',
    },
    listText: {
        fontSize: 16,
        color: '#1b5e20',
    },
    info: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
});
export default styles;