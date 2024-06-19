export interface walletProfile {
    wallet_address: string;
    balance: number;
    weekBalance: number;
    monthBalance: number;
    energy: number;
    recoveryDate: string;
    createdDate: string;
}
export interface walletStateProps {
    user: walletProfile;
    users: walletProfile[];
    currentDate: string;
    error: object | string | null;
}