import axios from 'axios';

export async function buscarEnderecoPorCEP(cep) {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    if (response.data.erro) {
      throw new Error('CEP não encontrado');
    }
    return response.data;
  } catch (err) {
    throw new Error('Erro ao buscar o endereço');
  }
}
