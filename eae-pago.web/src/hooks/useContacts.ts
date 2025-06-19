import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { fetchAddress } from '../services/viaCep';
import type { Contact } from '../types/address';

interface FormData {
  username: string;
  displayName: string;
  cep: string;
}

interface AppState {
  contacts: Contact[];
  search: string;
  filters: {
    city: string;
    state: string;
  };
  editing: Contact | null;
}

const STORAGE_KEY = 'contacts';

const initialState: AppState = {
  contacts: [],
  search: '',
  filters: {
    city: '',
    state: ''
  },
  editing: null
};

export function useContacts() {
  const [state, setState] = useState<AppState>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? {
      ...initialState,
      contacts: JSON.parse(stored)
    } : initialState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.contacts));
  }, [state.contacts]);

  const addContact = (contact: Contact) => {
    setState(prev => ({
      ...prev,
      contacts: [...prev.contacts, contact]
    }));
  };

  const updateContact = (id: string, displayName: string) => {
    setState(prev => ({
      ...prev,
      contacts: prev.contacts.map(contact =>
        contact.id === id ? { ...contact, displayName } : contact
      )
    }));
  };

  const deleteContact = (id: string) => {
    setState(prev => ({
      ...prev,
      contacts: prev.contacts.filter(contact => contact.id !== id)
    }));
  };

  const filterContacts = () => {
    return state.contacts.filter(contact => {
      const matchesSearch = contact.displayName.toLowerCase().includes(state.search.toLowerCase()) ||
                          contact.username.toLowerCase().includes(state.search.toLowerCase());
      const matchesCity = !state.filters.city || contact.address.localidade.toLowerCase() === state.filters.city.toLowerCase();
      const matchesState = !state.filters.state || contact.address.uf.toLowerCase() === state.filters.state.toLowerCase();
      
      return matchesSearch && matchesCity && matchesState;
    });
  };

  const onSubmit = async (data: FormData) => {
    try {
      const address = await fetchAddress(data.cep.replace(/\D/g, ''));
      const newContact: Contact = {
        id: crypto.randomUUID(),
        username: data.username,
        displayName: data.displayName,
        address,
        createdAt: new Date().toISOString()
      };
      addContact(newContact);
      toast.success('Endereço encontrado com sucesso!');
    } catch (error) {
      toast.error('Erro ao buscar endereço. Verifique o CEP informado.');
    }
  };

  const handleEdit = (contact: Contact | null) => {
    setState(prev => ({ ...prev, editing: contact }));
  };

  const handleUpdate = () => {
    if (state.editing) {
      updateContact(state.editing.id, state.editing.displayName);
      setState(prev => ({ ...prev, editing: null }));
      toast.success('Contato atualizado com sucesso!');
    }
  };

  const handleDelete = (id: string) => {
    deleteContact(id);
    toast.success('Contato excluído com sucesso!');
  };

  const handleSearchChange = (value: string) => {
    setState(prev => ({ ...prev, search: value }));
  };

  const handleFilterChange = (type: 'city' | 'state', value: string) => {
    setState(prev => ({
      ...prev,
      filters: { ...prev.filters, [type]: value }
    }));
  };

  const handleEditingChange = (value: string) => {
    setState(prev => ({
      ...prev,
      editing: prev.editing ? { ...prev.editing, displayName: value } : null
    }));
  };

  const filteredContacts = filterContacts();

  return {
    state,
    filteredContacts,
    handleSearchChange,
    handleFilterChange,
    handleEdit,
    handleEditingChange,
    handleUpdate,
    handleDelete,
    onSubmit
  };
} 