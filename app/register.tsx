import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Platform,
    Pressable,
    ScrollView,
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

const RegisterScreen = () => {
    const router = useRouter();
    const { register } = useAuth();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{
        firstName?: string;
        lastName?: string;
        phone?: string;
        password?: string;
        confirmPassword?: string;
    }>({});

    // Validate form inputs
    const validateForm = (): boolean => {
        const newErrors: typeof errors = {};

        if (!firstName.trim()) {
            newErrors.firstName = "First name is required";
        }

        if (!lastName.trim()) {
            newErrors.lastName = "Last name is required";
        }

        if (!phone) {
            newErrors.phone = "Phone number is required";
        } else if (!/^\d{9}$/.test(phone)) {
            newErrors.phone = "Enter valid 9-digit phone number";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async () => {
        console.log("Register button clicked!");
        if (!validateForm()) {
            console.log("Validation failed:", errors);
            return;
        }

        setIsLoading(true);
        console.log("Attempting registration for:", firstName, lastName, phone);
        try {
            const result = await register({
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                phone,
                password,
            });
            console.log("Registration result:", result);

            if (result.success) {
                showAlert("Success", result.message, () => router.replace("/login"));
            } else {
                showAlert("Registration Failed", result.message);
            }
        } catch (error) {
            console.error("Registration error:", error);
            showAlert("Error", "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleClear = () => {
        setFirstName("");
        setLastName("");
        setPhone("");
        setPassword("");
        setConfirmPassword("");
        setErrors({});
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.card}>
                    {/* Header */}
                    <Text style={styles.title}>Register for SLTB</Text>

                    {/* First Name Input */}
                    <View style={[styles.inputContainer, errors.firstName && styles.inputError]}>
                        <Ionicons name="person" size={20} color="#84003A" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="First Name"
                            placeholderTextColor="#999"
                            value={firstName}
                            onChangeText={(text) => {
                                setFirstName(text);
                                if (errors.firstName) setErrors({ ...errors, firstName: undefined });
                            }}
                        />
                    </View>
                    {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

                    {/* Last Name Input */}
                    <View style={[styles.inputContainer, errors.lastName && styles.inputError]}>
                        <Ionicons name="person" size={20} color="#84003A" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Last Name"
                            placeholderTextColor="#999"
                            value={lastName}
                            onChangeText={(text) => {
                                setLastName(text);
                                if (errors.lastName) setErrors({ ...errors, lastName: undefined });
                            }}
                        />
                    </View>
                    {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

                    {/* Phone Input */}
                    <View style={[styles.inputContainer, errors.phone && styles.inputError]}>
                        <Ionicons name="call" size={20} color="#84003A" style={styles.inputIcon} />
                        <Text style={styles.prefix}>+94</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="7*********"
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

                    {/* Confirm Password Input */}
                    <View style={[styles.inputContainer, errors.confirmPassword && styles.inputError]}>
                        <Ionicons name="lock-closed" size={20} color="#84003A" style={styles.inputIcon} />
                        <TextInput
                            style={[styles.input, { flex: 1 }]}
                            placeholder="Confirm Password..."
                            placeholderTextColor="#999"
                            value={confirmPassword}
                            onChangeText={(text) => {
                                setConfirmPassword(text);
                                if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined });
                            }}
                            secureTextEntry={!showConfirmPassword}
                        />
                        <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                            <Ionicons
                                name={showConfirmPassword ? "eye" : "eye-off"}
                                size={20}
                                color="#84003A"
                            />
                        </Pressable>
                    </View>
                    {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

                    {/* Register Button */}
                    <Pressable
                        style={[styles.registerButton, isLoading && styles.buttonDisabled]}
                        onPress={handleRegister}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.registerButtonText}>Register</Text>
                        )}
                    </Pressable>

                    {/* Clear Button */}
                    <Pressable style={styles.clearButton} onPress={handleClear}>
                        <Text style={styles.clearButtonText}>Clear</Text>
                    </Pressable>

                    {/* Login Link */}
                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>Already have an account? </Text>
                        <Pressable onPress={() => router.push("/login")}>
                            <Text style={styles.loginLink}>Log in</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingVertical: 30,
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
        marginBottom: 30,
        textAlign: "center",
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
    registerButton: {
        backgroundColor: "#84003A",
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: "center",
        marginTop: 15,
        marginBottom: 10,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    registerButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    clearButton: {
        backgroundColor: "#fff",
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: "center",
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#84003A",
    },
    clearButtonText: {
        color: "#84003A",
        fontSize: 16,
        fontWeight: "600",
    },
    loginContainer: {
        flexDirection: "row",
        justifyContent: "center",
    },
    loginText: {
        fontSize: 14,
        color: "#666",
    },
    loginLink: {
        fontSize: 14,
        color: "#84003A",
        fontWeight: "600",
        textDecorationLine: "underline",
    },
});
