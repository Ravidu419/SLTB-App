import React, { createContext, useContext, useState } from "react";

// User type definition
export interface User {
    id?: string;
    firstName: string;
    lastName: string;
    phone: string;
    email?: string;
}

// Context type definition
interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (phone: string, password: string) => Promise<{ success: boolean; message: string }>;
    register: (userData: Omit<User, 'id'> & { password: string }) => Promise<{ success: boolean; message: string }>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // TODO: Backend developer will replace with actual API call
    // Example: POST /api/auth/login
    const login = async (phone: string, password: string): Promise<{ success: boolean; message: string }> => {
        console.log("Login called with:", { phone, password });

        // TODO: Replace with actual API call
        // const response = await fetch('YOUR_BACKEND_URL/api/auth/login', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ phone, password })
        // });
        // const data = await response.json();

        // Temporary: Always succeed for testing UI
        setUser({ firstName: "Test", lastName: "User", phone });
        return { success: true, message: "Login successful! (Demo mode)" };
    };

    // TODO: Backend developer will replace with actual API call
    // Example: POST /api/auth/register
    const register = async (userData: Omit<User, 'id'> & { password: string }): Promise<{ success: boolean; message: string }> => {
        console.log("Register called with:", userData);

        // TODO: Replace with actual API call
        // const response = await fetch('YOUR_BACKEND_URL/api/auth/register', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(userData)
        // });
        // const data = await response.json();

        // Temporary: Always succeed for testing UI
        return { success: true, message: "Registration successful! (Demo mode)" };
    };

    // TODO: Backend developer will replace with actual logout logic
    const logout = async () => {
        console.log("Logout called");
        setUser(null);
        // TODO: Clear token, call logout endpoint if needed
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
