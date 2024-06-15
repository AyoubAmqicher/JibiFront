export interface Agent {
  id: String;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  cinFront: File | null;
  cinBack: File | null;
  agence: {
    id: Number;
    name: String;
  };
  showDropdown: false;
}
