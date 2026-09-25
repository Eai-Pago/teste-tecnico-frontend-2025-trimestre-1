import { useState } from 'react';
import { buscarEnderecoPorCEP } from '../services/cepService';
import { toast } from 'react-toastify';

export default function ContactForm({ onAdd }) {
  const [form, setForm] = useState({ usuario: '', nomeEndereco: '', cep: '' });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const endereco = await buscarEnderecoPorCEP(form.cep);
      const novoContato = {
        id: crypto.randomUUID(),
        ...form,
        endereco,
      };
      onAdd(novoContato);
      toast.success('Endereço adicionado com sucesso!');
      setForm({ usuario: '', nomeEndereco: '', cep: '' });
    } catch {
      toast.error('Erro ao buscar o endereço.');
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-lg flex flex-col gap-4"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">Adicionar Contato</h2>

      <div className="flex flex-col">
        <label htmlFor="usuario" className="mb-1 text-sm font-medium text-gray-700">Usuário</label>
        <input
          id="usuario"
          name="usuario"
          value={form.usuario}
          onChange={handleChange}
          placeholder="Nome do usuário"
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="nomeEndereco" className="mb-1 text-sm font-medium text-gray-700">Nome do endereço</label>
        <input
          id="nomeEndereco"
          name="nomeEndereco"
          value={form.nomeEndereco}
          onChange={handleChange}
          placeholder="Casa, trabalho, etc."
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="cep" className="mb-1 text-sm font-medium text-gray-700">CEP</label>
        <input
          id="cep"
          name="cep"
          value={form.cep}
          onChange={handleChange}
          placeholder="00000-000"
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
      >
        Adicionar
      </button>
    </form>
  );
}
