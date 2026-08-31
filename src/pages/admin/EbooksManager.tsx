import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Image as ImageIcon, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';

const EbooksManager = () => {
  const [ebooks, setEbooks] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { token } = useAuth();
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const initialFormState = {
    title: '', author: '', categoryId: '', description: '', fullDescription: '',
    rating: 5, pages: 0, language: 'Português', format: 'PDF', publishDate: new Date().toISOString().split('T')[0],
    capa: '', featured: false
  };
  const [form, setForm] = useState(initialFormState);
  const [uploading, setUploading] = useState(false);

  const fetchData = async () => {
    try {
      const [ebRes, catRes] = await Promise.all([
        fetch('/api/ebooks'),
        fetch('/api/categories')
      ]);
      const ebData = await ebRes.json();
      const catData = await catRes.json();
      setEbooks(ebData);
      setCategories(catData);
    } catch (error) {
      toast.error('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setForm({ ...form, capa: data.url });
      toast.success('Imagem enviada!');
    } catch (error) {
      toast.error('Erro no upload');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.categoryId) {
      toast.error('Selecione uma categoria');
      return;
    }

    try {
      const slug = form.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\W+/g, '-').substring(0, 100) + '-' + Date.now();
      const payload = { ...form, slug, pages: Number(form.pages), rating: Number(form.rating) };

      const res = await fetch(editingId ? `/api/ebooks/${editingId}` : '/api/ebooks', {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) throw new Error('Erro ao salvar');
      
      toast.success(`E-book ${editingId ? 'atualizado' : 'criado'} com sucesso!`);
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      toast.error('Erro ao salvar e-book');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja deletar este E-book?')) return;
    try {
      const res = await fetch(`/api/ebooks/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Erro ao deletar');
      toast.success('E-book deletado!');
      fetchData();
    } catch (error) {
      toast.error('Erro ao deletar e-book');
    }
  };

  const openModal = (ebook?: any) => {
    if (ebook) {
      setEditingId(ebook.id);
      setForm({
        ...ebook,
        publishDate: new Date(ebook.publishDate).toISOString().split('T')[0]
      });
    } else {
      setEditingId(null);
      setForm(initialFormState);
    }
    setIsModalOpen(true);
  };

  const handleCsvImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const toastId = toast.loading('Importando CSV...');
    try {
      const res = await fetch('/api/ebooks/import', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast.success(data.message, { id: toastId });
      fetchData();
    } catch (error: any) {
      toast.error(error.message || 'Erro na importação', { id: toastId });
    }
    
    // Reset file input
    e.target.value = '';
  };

  const filteredEbooks = ebooks.filter(e => e.title.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Gerenciar E-books</h1>
        
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64 min-w-[200px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input 
              type="text" 
              placeholder="Buscar..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <label className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer shrink-0">
            <span className="hidden sm:inline text-sm font-medium">Importar CSV</span>
            <input type="file" accept=".csv" className="hidden" onChange={handleCsvImport} />
          </label>
          
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shrink-0"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Novo E-book</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 font-medium">Capa</th>
                <th className="px-6 py-3 font-medium">Título & Autor</th>
                <th className="px-6 py-3 font-medium">Categoria</th>
                <th className="px-6 py-3 font-medium">Views</th>
                <th className="px-6 py-3 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEbooks.map((ebook) => (
                <tr key={ebook.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <img src={ebook.capa} alt="Capa" className="w-10 h-14 object-cover rounded shadow-sm" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900 line-clamp-1">{ebook.title}</div>
                    <div className="text-slate-500 text-xs">{ebook.author}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                      {ebook.category?.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">{ebook.views}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button onClick={() => openModal(ebook)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(ebook.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredEbooks.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    Nenhum e-book encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-[60] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold">{editingId ? 'Editar E-book' : 'Novo E-book'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <form id="ebook-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Título *</label>
                      <input required type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Autor *</label>
                      <input required type="text" value={form.author} onChange={e => setForm({...form, author: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Categoria *</label>
                      <select required value={form.categoryId} onChange={e => setForm({...form, categoryId: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500">
                        <option value="">Selecione...</option>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Páginas</label>
                        <input type="number" value={form.pages} onChange={e => setForm({...form, pages: Number(e.target.value)})} className="w-full px-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Data Publicação</label>
                        <input type="date" value={form.publishDate} onChange={e => setForm({...form, publishDate: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} className="rounded text-primary-600" />
                      <label htmlFor="featured" className="text-sm font-medium text-slate-700">Destaque na Home</label>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Capa (Upload) *</label>
                      <div className="flex items-start gap-4">
                        <div className="w-24 h-32 bg-slate-100 rounded border border-slate-300 flex items-center justify-center shrink-0 overflow-hidden">
                          {form.capa ? <img src={form.capa} alt="Preview" className="w-full h-full object-cover" /> : <ImageIcon className="w-8 h-8 text-slate-400" />}
                        </div>
                        <div className="flex-1">
                          <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
                          <p className="text-xs text-slate-500 mt-2">{uploading ? 'Enviando...' : 'Formato JPG ou PNG.'}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Resumo Curto *</label>
                      <textarea required value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={2} className="w-full px-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500"></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Descrição Completa</label>
                      <textarea value={form.fullDescription} onChange={e => setForm({...form, fullDescription: e.target.value})} rows={5} className="w-full px-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500"></textarea>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-slate-200 flex justify-end gap-3 bg-slate-50 rounded-b-xl shrink-0">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 bg-white hover:bg-slate-50 font-medium">
                Cancelar
              </button>
              <button type="submit" form="ebook-form" className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium shadow-sm">
                Salvar E-book
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EbooksManager;
