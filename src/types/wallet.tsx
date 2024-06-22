export interface walletProfile {
    wallet_address: string;
    balance: number;
    energy: number;
    recoveryDate: string;
    createdDate: string;
    latestDate: string;
    weeklyIncRFP: number;
    monthlyIncRFP: number;
    loading?: boolean; // Optional property
}
export interface walletStateProps {
    user: walletProfile;
    users: walletProfile[];
    currentDate: string;
    error: object | string | null;
}