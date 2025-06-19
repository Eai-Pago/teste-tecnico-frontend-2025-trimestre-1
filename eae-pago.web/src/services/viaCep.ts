import axios from 'axios';
import type { Address } from '../types/address';

const api = axios.create({
  baseURL: 'https://viacep.com.br/ws'
});

export async function fetchAddress(cep: string): Promise<Address> {
  try {
    const { data } = await api.get(`/${cep}/json/`);

    if (data.erro) {
      throw new Error('CEP não encontrado');
    }

    return {
      cep: data.cep,
      logradouro: data.logradouro,
      complemento: data.complemento,
      bairro: data.bairro,
      localidade: data.localidade,
      uf: data.uf
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error('Falha ao buscar endereço');
    }
    throw error;
  }
}

export default api; 