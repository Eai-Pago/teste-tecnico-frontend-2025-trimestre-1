import { FaSearch } from 'react-icons/fa';

export default function FilterBar({ busca, setBusca }) {
  return (
    <div className="w-full max-w-md mx-auto p-8">
      <div className="flex items-center bg-white border border-gray-300 rounded-full shadow-sm px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition">
        <FaSearch className="text-gray-500 mr-3" />
        <input
          type="text"
          placeholder="Pesquise aqui..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
          className="w-full bg-transparent focus:outline-none text-gray-700"
        />
      </div>
    </div>
  );
}
