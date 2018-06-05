import { IAgent } from './agent.model';
import { IPartner } from './partner.model';

export interface IListingObject {
    id?: number;
    creationDate?: number;
    lastModified?: number;
    mlsListingId?: string | number;
    mlsId?: string | number;
    streetName?: string;
    streetNumber?: string;
    unitNumber?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    address?: string;
    price?: string;
    baths?: number;
    bedrooms?: number;
    squareFootage?: number;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    status?: string;
    sellerClient?: IPartner;
    sellerAgent?: IAgent;
    confirmationStrategy?: string;
    type?: string;
    hasGarage:	boolean;
    hasBasement: boolean;
    showingInstructions?: string;
    hasDailyNotice:	boolean;
    autoConfirmationEnabled: boolean;
    hasDailyNoticeAsPrimitive: boolean;
}

