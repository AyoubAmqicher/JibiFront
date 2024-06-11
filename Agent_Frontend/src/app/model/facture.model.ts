export interface Facture {
    id: number;
    clientId: string;
    operateurId: number;
    reference: string;
    description: string;
    amount: string;
    paid: boolean;
  }
  