import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { salvarContatos, obterContatos } from './utils/storage';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import FilterBar from './components/FilterBar';
import EditModal from './components/EditModal';

function App() {
  const [contatos, setContatos] = useState(() => obterContatos());
  const [busca, setBusca] = useState('');
  const [contatoEditando, setContatoEditando] = useState(null);


  useEffect(() => {
    salvarContatos(contatos);
  }, [contatos]);

  function adicionarContato(novoContato) {
    setContatos(prev => [...prev, novoContato]);
  }

  function deletarContato(id) {
    setContatos(prev => prev.filter(c => c.id !== id));
  }

  function editarContato(id) {
    const contato = contatos.find(c => c.id === id);
    if (contato) setContatoEditando(contato);
  }

  function salvarEdicao(contatoAtualizado) {
    setContatos(prev =>
      prev.map(c => (c.id === contatoAtualizado.id ? contatoAtualizado : c))
    );
    setContatoEditando(null);
  }


  const contatosFiltrados = contatos.filter(c => {
    const termo = busca.toLowerCase();
    return (
      c.usuario.toLowerCase().includes(termo) ||
      c.endereco.localidade.toLowerCase().includes(termo) ||
      c.endereco.uf.toLowerCase().includes(termo) ||
      c.endereco.logradouro.toLowerCase().includes(termo) ||
      c.endereco.bairro.toLowerCase().includes(termo) ||
      c.nomeEndereco.toLowerCase().includes(termo)
    );
  });

  return (
    <>
      <FilterBar busca={busca} setBusca={setBusca} />
      <div className='flex flex-col items-center justify-center h-[80vh] w-full '>

        <div className='w-full flex justify-evenly flex-wrap mt-12 gap-8'>
          <ContactForm onAdd={adicionarContato} />
          <ContactList contatos={contatosFiltrados} onDelete={deletarContato} onEdit={editarContato} />
        </div>

        {contatoEditando && (
          <EditModal
            contato={contatoEditando}
            onClose={() => setContatoEditando(null)}
            onSave={salvarEdicao}
          />
        )}

        <ToastContainer />
      </div>
    </>
  );
}

export default App;
