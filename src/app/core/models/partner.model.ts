export interface IPartner {
    id?: number;
    creationDate?: number;
    lastModified?: number;
    hash?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    status?: string;
    notificationType?: string[];
    type?: string;
    hasUserAccount?: boolean;
    originId?: number;
}
