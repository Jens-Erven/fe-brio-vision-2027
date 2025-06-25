import { tokenService } from './tokenService';

const service = new tokenService();

export async function getToken(): Promise<string | null> {
    return await service.getToken();;
}

export function clearToken() {
    service.clearToken();
}