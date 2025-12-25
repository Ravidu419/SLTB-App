import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "@/context/AuthContext";

// Platform-aware alert function
const showAlert = (title: string, message: string, onOk?: () => void) => {
    if (Platform.OS === 'web') {
        window.alert(`${title}: ${message}`);
        if (onOk) onOk();
    } else {
        const { Alert } = require('react-native');
        Alert.alert(title, message, [{ text: "OK", onPress: onOk }]);
    }
};

const LoginScreen = () => {
    const router = useRouter();
    const { login } = useAuth();

    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{ phone?: string; password?: string }>({});

    // Validate form inputs
    const validateForm = (): boolean => {
        const newErrors: { phone?: string; password?: string } = {};

        // Phone validation (9 digits for Sri Lankan format)
        if (!phone) {
            newErrors.phone = "Phone number is required";
        } else if (!/^\d{9}$/.test(phone)) {
            newErrors.phone = "Enter valid 9-digit phone number";
        }

        // Password validation
        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async () => {
        console.log("Login button clicked!");
        if (!validateForm()) {
            console.log("Validation failed:", errors);
            return;
        }

        setIsLoading(true);
        console.log("Attempting login with:", phone);
        try {
            const result = await login(phone, password);
            console.log("Login result:", result);

            if (result.success) {
                showAlert("Success", result.message, () => router.replace("/main"));
            } else {
                showAlert("Login Failed", result.message);
            }
        } catch (error) {
            console.error("Login error:", error);
            showAlert("Error", "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                {/* Header */}
                <Text style={styles.title}>Welcome back</Text>
                <Text style={styles.subtitle}>Log into your account</Text>

                {/* Phone Input */}
                <View style={[styles.inputContainer, errors.phone && styles.inputError]}>
                    <Ionicons name="call" size={20} color="#84003A" style={styles.inputIcon} />
                    <Text style={styles.prefix}>+94</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="7********"
                        placeholderTextColor="#999"
                        value={phone}
                        onChangeText={(text) => {
                            setPhone(text);
                            if (errors.phone) setErrors({ ...errors, phone: undefined });
                        }}
                        keyboardType="phone-pad"
                        maxLength={9}
                    />
                </View>
                {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

                {/* Password Input */}
                <View style={[styles.inputContainer, errors.password && styles.inputError]}>
                    <Ionicons name="lock-closed" size={20} color="#84003A" style={styles.inputIcon} />
                    <TextInput
                        style={[styles.input, { flex: 1 }]}
                        placeholder="Password..."
                        placeholderTextColor="#999"
                        value={password}
                        onChangeText={(text) => {
                            setPassword(text);
                            if (errors.password) setErrors({ ...errors, password: undefined });
                        }}
                        secureTextEntry={!showPassword}
                    />
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons
                            name={showPassword ? "eye" : "eye-off"}
                            size={20}
                            color="#84003A"
                        />
                    </Pressable>
                </View>
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                {/* Remember Me */}
                <Pressable
                    style={styles.rememberContainer}
                    onPress={() => setRememberMe(!rememberMe)}
                >
                    <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                        {rememberMe && <Ionicons name="checkmark" size={14} color="#fff" />}
                    </View>
                    <Text style={styles.rememberText}>Remember me</Text>
                </Pressable>

                {/* Login Button */}
                <Pressable
                    style={[styles.loginButton, isLoading && styles.buttonDisabled]}
                    onPress={handleLogin}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.loginButtonText}>Login</Text>
                    )}
                </Pressable>

                {/* Forgot Password */}
                <Pressable style={styles.forgotContainer}>
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                </Pressable>

                {/* Register Link */}
                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>Don't have an account? </Text>
                    <Pressable onPress={() => router.push("/register")}>
                        <Text style={styles.registerLink}>Register Now</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 30,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderStyle: "dashed",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#84003A",
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        color: "#666",
        marginBottom: 40,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#84003A",
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginBottom: 5,
    },
    inputError: {
        borderColor: "#FF3B30",
    },
    inputIcon: {
        marginRight: 10,
    },
    prefix: {
        color: "#333",
        fontSize: 16,
        marginRight: 5,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#333",
    },
    errorText: {
        color: "#FF3B30",
        fontSize: 12,
        marginBottom: 10,
        marginLeft: 5,
    },
    rememberContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 25,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: "#84003A",
        borderRadius: 4,
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    checkboxChecked: {
        backgroundColor: "#84003A",
    },
    rememberText: {
        fontSize: 14,
        color: "#333",
    },
    loginButton: {
        backgroundColor: "#84003A",
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: "center",
        marginBottom: 15,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    loginButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    forgotContainer: {
        alignItems: "flex-end",
        marginBottom: 30,
    },
    forgotText: {
        color: "#84003A",
        fontSize: 14,
        textDecorationLine: "underline",
    },
    registerContainer: {
        flexDirection: "row",
        justifyContent: "center",
    },
    registerText: {
        fontSize: 14,
        color: "#666",
    },
    registerLink: {
        fontSize: 14,
        color: "#84003A",
        fontWeight: "600",
        textDecorationLine: "underline",
    },
});
