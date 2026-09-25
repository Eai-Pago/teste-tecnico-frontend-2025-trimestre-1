const STORAGE_KEY = 'contatos';

export function salvarContatos(contatos) {
  try {
    const json = JSON.stringify(contatos);
    localStorage.setItem(STORAGE_KEY, json);
  } catch (error) {
    console.error('Erro ao salvar no localStorage:', error);
  }
}

export function obterContatos() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erro ao ler do localStorage:', error);
    return [];
  }
}
