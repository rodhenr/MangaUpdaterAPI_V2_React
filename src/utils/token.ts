import { jwtDecode, JwtPayload } from "jwt-decode";

type OptionalTokenProperties = {
    role?: string;
}

type TokenType = OptionalTokenProperties & JwtPayload;

export const getTokenAdminClaim = (token: string): boolean => {
    const decoded = jwtDecode<TokenType>(token);
    
    if(!decoded.role || decoded.role !== "Admin") return false;

    return true;
}
