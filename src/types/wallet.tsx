export interface walletProfile {
    ranking: number;
    wallet_address: string;
    balance: number;
    energy: number;
    level: number;
    recoveryEnergyTime: string;
    createdDate: string;
}
export interface walletStateProps {
    user: walletProfile;
    users: walletProfile[];
    error: object | string | null;
}