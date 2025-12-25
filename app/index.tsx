import { useRouter } from "expo-router";
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// SLTB Bus Logo
const logo = require("@/assets/SLTB_Pic/sltb_logo.png");

const StartScreen = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* Menu Icon */}
                <View style={styles.menuContainer}>
                    <View style={styles.menuLine} />
                    <View style={[styles.menuLine, styles.menuLineShort]} />
                </View>

                {/* Logo Section */}
                <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo} resizeMode="contain" />
                    <Text style={styles.title}>SLTB</Text>
                    <Text style={styles.subtitle}>SRI LANKA TRANSPORT BOARD</Text>
                </View>

                {/* Buttons Section */}
                <View style={styles.buttonContainer}>
                    <Pressable
                        style={styles.getStartedButton}
                        onPress={() => router.push("/login")}
                    >
                        <Text style={styles.getStartedText}>Get Started</Text>
                    </Pressable>

                    <Pressable onPress={() => router.push("/main")}>
                        <Text style={styles.buyTicketsText}>Buy tickets</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default StartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },
    content: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 20,
    },
    menuContainer: {
        alignItems: "flex-start",
        marginBottom: 40,
    },
    menuLine: {
        width: 30,
        height: 3,
        backgroundColor: "#333",
        marginBottom: 5,
        borderRadius: 2,
    },
    menuLineShort: {
        width: 20,
    },
    logoContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 200,
        height: 150,
        marginBottom: 20,
    },
    title: {
        fontSize: 48,
        fontWeight: "bold",
        color: "#84003A",
        letterSpacing: 4,
    },
    subtitle: {
        fontSize: 12,
        color: "#84003A",
        letterSpacing: 2,
        marginTop: 5,
    },
    buttonContainer: {
        paddingBottom: 40,
        alignItems: "center",
    },
    getStartedButton: {
        backgroundColor: "#84003A",
        paddingVertical: 15,
        paddingHorizontal: 60,
        borderRadius: 25,
        marginBottom: 15,
        width: "80%",
        alignItems: "center",
    },
    getStartedText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    buyTicketsText: {
        color: "#333",
        fontSize: 16,
        textDecorationLine: "underline",
    },
});
