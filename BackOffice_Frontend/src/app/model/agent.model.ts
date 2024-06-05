export interface Agent {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cinFront: File | null;
  cinBack: File | null;
}
