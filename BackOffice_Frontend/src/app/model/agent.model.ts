export interface Agent {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  cinFront: File | null;
  cinBack: File | null;
}
