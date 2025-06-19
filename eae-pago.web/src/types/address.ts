export interface Address {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export interface Contact {
  id: string;
  username: string;
  displayName: string;
  address: Address;
  createdAt: string;
} 