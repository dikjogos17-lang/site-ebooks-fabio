import { useState, useEffect } from 'react';
import { Book, Tags, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEbooks: 0,
    totalCategories: 0,
    totalViews: 0,
  });
  const [recentEbooks, setRecentEbooks] = useState<any[]>([]);

  useEffect(() => {
    // Fetch stats
    Promise.all([
      fetch('/api/ebooks').then(r => r.json()),
      fetch('/api/categories').then(r => r.json())
    ]).then(([ebooksData, categoriesData]) => {
      if (!ebooksData.error && !categoriesData.error) {
        const totalViews = ebooksData.reduce((acc: number, curr: any) => acc + curr.views, 0);
        setStats({
          totalEbooks: ebooksData.length,
          totalCategories: categoriesData.length,
          totalViews
        });
        setRecentEbooks(ebooksData.slice(0, 5));
      }
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center shrink-0">
            <Book className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total de E-books</p>
            <p className="text-2xl font-bold text-slate-900">{stats.totalEbooks}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
            <Tags className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Categorias</p>
            <p className="text-2xl font-bold text-slate-900">{stats.totalCategories}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Visualizações Totais</p>
            <p className="text-2xl font-bold text-slate-900">{stats.totalViews}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">E-books Adicionados Recentemente</h2>
          <Link to="/admin/ebooks" className="text-sm font-medium text-primary-600 hover:text-primary-700">
            Ver todos
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 font-medium">Título</th>
                <th className="px-6 py-3 font-medium">Categoria</th>
                <th className="px-6 py-3 font-medium text-right">Visitas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentEbooks.map((ebook) => (
                <tr key={ebook.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">{ebook.title}</td>
                  <td className="px-6 py-4">{ebook.category?.name || ebook.category}</td>
                  <td className="px-6 py-4 text-right">{ebook.views}</td>
                </tr>
              ))}
              {recentEbooks.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-slate-500">
                    Nenhum e-book encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
