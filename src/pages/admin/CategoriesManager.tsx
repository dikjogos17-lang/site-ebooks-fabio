import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';

const CategoriesManager = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', description: '' });
  const [isAdding, setIsAdding] = useState(false);
  const { token } = useAuth();

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      toast.error('Erro ao carregar categorias');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSave = async (id?: string) => {
    try {
      const slug = editForm.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
      const payload = { ...editForm, slug };
      
      const res = await fetch(id ? `/api/categories/${id}` : '/api/categories', {
        method: id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) throw new Error('Erro ao salvar');
      
      toast.success('Categoria salva com sucesso!');
      setIsEditing(null);
      setIsAdding(false);
      setEditForm({ name: '', description: '' });
      fetchCategories();
    } catch (error) {
      toast.error('Erro ao salvar categoria');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja deletar esta categoria?')) return;
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Erro ao deletar');
      toast.success('Categoria deletada!');
      fetchCategories();
    } catch (error) {
      toast.error('Erro ao deletar categoria');
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Gerenciar Categorias</h1>
        <button
          onClick={() => {
            setIsAdding(true);
            setIsEditing(null);
            setEditForm({ name: '', description: '' });
          }}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nova Categoria
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 font-medium">Nome</th>
              <th className="px-6 py-3 font-medium">Descrição</th>
              <th className="px-6 py-3 font-medium text-center">E-books</th>
              <th className="px-6 py-3 font-medium text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isAdding && (
              <tr className="bg-primary-50/50">
                <td className="px-6 py-4">
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-2 py-1 border border-slate-300 rounded"
                    placeholder="Nome da categoria"
                    autoFocus
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    value={editForm.description}
                    onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full px-2 py-1 border border-slate-300 rounded"
                    placeholder="Descrição..."
                  />
                </td>
                <td className="px-6 py-4 text-center">-</td>
                <td className="px-6 py-4 text-right space-x-2 flex justify-end">
                  <button onClick={() => handleSave()} className="p-1 text-green-600 hover:bg-green-50 rounded">
                    <Check className="w-5 h-5" />
                  </button>
                  <button onClick={() => setIsAdding(false)} className="p-1 text-red-600 hover:bg-red-50 rounded">
                    <X className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            )}
            
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-slate-50">
                {isEditing === cat.id ? (
                  <>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full px-2 py-1 border border-slate-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={editForm.description}
                        onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                        className="w-full px-2 py-1 border border-slate-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 text-center">{cat._count?.ebooks || 0}</td>
                    <td className="px-6 py-4 text-right space-x-2 flex justify-end">
                      <button onClick={() => handleSave(cat.id)} className="p-1 text-green-600 hover:bg-green-50 rounded">
                        <Check className="w-5 h-5" />
                      </button>
                      <button onClick={() => setIsEditing(null)} className="p-1 text-slate-500 hover:bg-slate-100 rounded">
                        <X className="w-5 h-5" />
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4 font-medium text-slate-900">{cat.name}</td>
                    <td className="px-6 py-4 text-slate-500">{cat.description}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                        {cat._count?.ebooks || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button 
                        onClick={() => {
                          setIsEditing(cat.id);
                          setEditForm({ name: cat.name, description: cat.description || '' });
                        }}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(cat.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriesManager;
