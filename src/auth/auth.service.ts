import { httpClient } from "../api/http-client";

export type LoginCredentials = {
    username: string;
    password: string;
}

export type LoginResponse = {
    token: string;
    username: string;
}

const TOKEN_KEY = "token";

export function saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
}

export function removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
}


export async function login(credentials: LoginCredentials): Promise<LoginResponse> {

    const response = await httpClient.post<LoginResponse>(
        '/auth/login',
        credentials
    );
    saveToken(response.data.token)
    return response.data
}

export function logoutToken() {
    removeToken();

}

