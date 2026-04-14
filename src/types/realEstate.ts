export interface RealEstate {
    id: number;
    title: string;
    description: string;
    price: number;
    location: string;
    beds: number;
    baths: number;
    estateType: string;
    images:string[];
    features: string[];
    transactionType: string; // Sale or Rent
}