export default function ContactList({ contatos, onDelete, onEdit }) {
  return (
    <ul className="max-w-6xl mx-auto p-4 space-y-4">
        <h1 className="text-3xl font-bold mb-5">Catálogo de Endereços</h1>
        {contatos.map(c => (
            <li
                key={c.id}
                className=" bg-white shadow-md rounded-lg p-4 flex flex-col md:min-w-[600px] md:flex-row md:items-center md:justify-between"
                >
                <div>
                    <strong className="text-lg font-semibold text-gray-800">{c.nomeEndereco}</strong>{' '}
                    <span className="text-gray-600">- {c.usuario}</span>
                    <p className="text-gray-500 mt-1">
                    {c.endereco.logradouro}, {c.endereco.localidade} - {c.endereco.uf}
                    </p>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-2">
                    <button
                    onClick={() => onEdit(c.id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                    Editar
                    </button>
                    <button
                    onClick={() => onDelete(c.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                    Excluir
                    </button>
                </div>
            </li>
        ))}
    </ul>
  );
}
