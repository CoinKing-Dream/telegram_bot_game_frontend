export interface walletProfile {
    wallet_address: string;
    balance: number;
    energy: number;
    recoveryDate: string;
    createdDate: string;
    latestDate: string;
    weeklyIncRFP: number;
    monthlyIncRFP: number
}
export interface walletStateProps {
    user: walletProfile;
    users: walletProfile[];
    currentDate: string;
    loading: boolean;
    error: object | string | null;
}