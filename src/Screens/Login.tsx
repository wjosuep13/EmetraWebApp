// src/screens/LoginScreen.tsx
import React, { useState } from "react";
import { Box, Button, Input, Text, Heading, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/auth.service";

const LoginScreen: React.FC = () => {
    const [username, setusername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        setLoading(true);

        const payload = { username, password };

        try {
            const response = await AuthService.login(payload);
            console.log("Login success:", response);

            // Guardar tokens en localStorage o cookie
            localStorage.setItem("accessToken", response.access_token);
            // if (response.refreshToken) {
            //     localStorage.setItem("refreshToken", response.refreshToken);
            // }

            // Redirigir a dashboard o página principal
            navigate("/photos");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minH="100vh"
            bg="gray.50"
        >
            <Box bg="black" p={8} rounded="lg" shadow="md" w="sm">
                <Heading mb={6} size="lg" textAlign="center">
                    Login
                </Heading>
                <form onSubmit={handleSubmit}>
                    <VStack gap={4} align="stretch" as="div">
                        <Box>
                            <Text mb={1} fontWeight="medium">
                                Número de empleado
                            </Text>
                            <Input
                                type="text"
                                placeholder="Número de empleado "
                                value={username}
                                onChange={(e) => setusername(e.target.value)}
                                required
                            />
                        </Box>

                        <Box>
                            <Text mb={1} fontWeight="medium">
                               Contraseña
                            </Text>
                            <Input
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Box>

                        <Button type="submit" colorScheme="blue" w="full" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                        {error && <p style={{ color: "red" }}>{error}</p>}

                    </VStack>
                </form>
            </Box>
        </Box>
    );
};

export default LoginScreen;
