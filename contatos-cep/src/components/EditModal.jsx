import { useState } from 'react';
import { buscarEnderecoPorCEP } from '../services/cepService';
import { toast } from 'react-toastify';

export default function EditModal({ contato, onClose, onSave }) {
  const [form, setForm] = useState({
    usuario: contato.usuario,
    nomeEndereco: contato.nomeEndereco,
    cep: contato.cep,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const endereco = await buscarEnderecoPorCEP(form.cep);
      const atualizado = {
        ...contato,
        ...form,
        endereco,
      };
      onSave(atualizado);
      onClose();
      toast.success('Contato atualizado!');
    } catch {
      toast.error('CEP inválido ou erro na consulta.');
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Editar Contato</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="usuario"
            value={form.usuario}
            onChange={handleChange}
            placeholder="Usuário"
            required
            className="w-full border p-2 rounded"
          />
          <input
            name="nomeEndereco"
            value={form.nomeEndereco}
            onChange={handleChange}
            placeholder="Nome do Endereço"
            required
            className="w-full border p-2 rounded"
          />
          <input
            name="cep"
            value={form.cep}
            onChange={handleChange}
            placeholder="CEP"
            required
            className="w-full border p-2 rounded"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
