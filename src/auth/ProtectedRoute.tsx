import { getToken } from "./auth.service";
import { Navigate } from 'react-router';


interface Props {
    children: React.ReactNode | React.ReactNode[]
}


export function ProtectedRoute( {children}: Props) {
    return (
        <>
        {getToken() && (
            children            
        )}
        {!getToken() && (
            <Navigate to="/" replace />
        )}
        </>
    )
}