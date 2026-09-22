import { Navigate } from "react-router";
import { hasRole } from "./auth.service";

interface Props {
    children: React.ReactNode | React.ReactNode[]
    roles: string[]
}

export function RoleRoute({ children, roles }: Props) {
    const isAuthorized = roles.some((role) => hasRole(role));

    if (!isAuthorized) {
        return <Navigate to="/" replace />
    }
    return (
        <>
        {children}
        </>
    );
}