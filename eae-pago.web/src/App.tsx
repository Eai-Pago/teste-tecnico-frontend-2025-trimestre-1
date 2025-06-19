import { useForm } from 'react-hook-form'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useContacts } from './hooks/useContacts'
import type { Contact } from './types/address'

interface FormData {
  username: string;
  displayName: string;
  cep: string;
}

function App() {
  const { register, handleSubmit } = useForm<FormData>()
  const {
    state,
    filteredContacts,
    handleSearchChange,
    handleFilterChange,
    handleEdit,
    handleEditingChange,
    handleUpdate,
    handleDelete,
    onSubmit
  } = useContacts()

  return (
    <div className="min-h-screen p-4 md:p-8 bg-background">
      <ToastContainer theme="dark" />
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="form-container h-fit">
            <h2>Cadastro de Endereço</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="input-group">
                <label htmlFor="username">Nome de Usuário</label>
                <input 
                  type="text"
                  id="username"
                  {...register('username', { required: true })}
                  className="input-field"
                  placeholder="Digite seu nome de usuário"
                />
              </div>

              <div className="input-group">
                <label htmlFor="displayName">Nome de Exibição</label>
                <input 
                  type="text"
                  id="displayName"
                  {...register('displayName', { required: true })}
                  className="input-field"
                  placeholder="Digite seu nome de exibição"
                />
              </div>

              <div className="input-group">
                <label htmlFor="cep">CEP</label>
                <input 
                  type="text"
                  id="cep"
                  {...register('cep', { required: true })}
                  className="input-field"
                  placeholder="Digite seu CEP"
                />
              </div>

              <button type="submit" className="form-button">
                Buscar e Salvar
              </button>
            </form>
          </div>

          <div className="form-container flex flex-col h-[calc(100vh-2rem)] md:h-[calc(100vh-4rem)]">
            <h2>Contatos</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="input-group">
                <input 
                  type="text"
                  placeholder="Buscar por nome"
                  value={state.search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="input-field"
                />
              </div>
              <div className="input-group">
                <input 
                  type="text"
                  placeholder="Filtrar por cidade"
                  value={state.filters.city}
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                  className="input-field"
                />
              </div>
              <div className="input-group">
                <input 
                  type="text"
                  placeholder="Filtrar por estado"
                  value={state.filters.state}
                  onChange={(e) => handleFilterChange('state', e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            <div className="flex-1 overflow-hidden">
              <div className="h-full overflow-auto">
                <table>
                  <thead>
                    <tr>
                      <th>Usuário</th>
                      <th>Nome de Exibição</th>
                      <th>Cidade</th>
                      <th>Estado</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.map((contact: Contact) => (
                      <tr key={contact.id}>
                        <td>{contact.username}</td>
                        <td>{contact.displayName}</td>
                        <td>{contact.address.localidade}</td>
                        <td>{contact.address.uf}</td>
                        <td>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(contact)}
                              className="table-button edit"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDelete(contact.id)}
                              className="table-button delete"
                            >
                              Excluir
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {state.editing && (
        <div className="fixed inset-0 modal-overlay flex items-center justify-center p-4">
          <div className="modal-content w-full max-w-[400px] p-6">
            <h3 className="text-xl font-bold mb-4">Editar Nome de Exibição</h3>
            <div className="space-y-4">
              <div className="input-group">
                <label htmlFor="editDisplayName">Novo Nome de Exibição</label>
                <input
                  id="editDisplayName"
                  value={state.editing.displayName}
                  onChange={(e) => handleEditingChange(e.target.value)}
                  className="input-field"
                  placeholder="Digite o novo nome de exibição"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handleEdit(null)}
                  className="table-button edit"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleUpdate}
                  className="table-button edit"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
