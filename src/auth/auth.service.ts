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
function decodeJwtPayload(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64). split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload)
}
export function getRoles(): string [] {
    const token = getToken();
    if (!token) {
        return [];
    }
    const paylaod = decodeJwtPayload(token);
    return paylaod.scope ?? [];
}

export function hasRole(role: string): boolean {
    return getRoles().includes(role)
}