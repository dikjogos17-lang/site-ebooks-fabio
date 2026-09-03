import React, { useState, useEffect } from 'react';
import { Star, MessageCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  isLocalUser?: boolean;
}

interface Props {
  ebookId: string;
  baseRating: number;
}

const EbookReviews: React.FC<Props> = ({ ebookId, baseRating }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [hasReviewed, setHasReviewed] = useState(false);

  useEffect(() => {
    // Load local reviews for this ebook
    const localReviews = JSON.parse(localStorage.getItem('reviews_' + ebookId) || '[]');
    setHasReviewed(localReviews.some((r: any) => r.isLocalUser));
    
    
    setReviews([...localReviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, [ebookId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      toast.error('Preencha seu nome e comentário.');
      return;
    }
    
    const newReview = {
      id: Date.now().toString(),
      name,
      rating,
      comment,
      date: new Date().toISOString(),
      isLocalUser: true
    };
    
    const localReviews = JSON.parse(localStorage.getItem('reviews_' + ebookId) || '[]');
    localReviews.push(newReview);
    localStorage.setItem('reviews_' + ebookId, JSON.stringify(localReviews));
    
    setReviews([newReview, ...reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    setHasReviewed(true);
    setComment('');
    setName('');
    toast.success('Avaliação enviada com sucesso!');
  };

  const avgRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : baseRating.toFixed(1);

  return (
    <div className="mt-12 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-primary-600" />
          Avaliações dos Leitores
        </h2>
        
        <div className="flex flex-col md:flex-row gap-10">
          {/* Rating Summary */}
          <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl border border-slate-100">
            <div className="text-5xl font-black text-slate-900 mb-2">{avgRating}</div>
            <div className="flex mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`w-5 h-5 ${star <= parseFloat(avgRating) ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300 fill-slate-300'}`} 
                />
              ))}
            </div>
            <p className="text-slate-500 text-sm font-medium">{reviews.length} avaliações</p>
          </div>
          
          {/* Add Review Form */}
          <div className="w-full md:w-2/3">
            {!hasReviewed ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Deixe sua avaliação</h3>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm font-medium text-slate-600 mr-2">Sua nota:</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star 
                          className={`w-6 h-6 ${star <= (hoverRating || rating) ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300'}`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <input
                    type="text"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                    required
                  />
                </div>
                
                <div>
                  <textarea
                    placeholder="O que você achou deste E-book?"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all resize-none"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-colors shadow-sm"
                >
                  Publicar Avaliação
                </button>
              </form>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-6 bg-green-50 rounded-xl border border-green-100 text-center">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-3">
                  <Star className="w-6 h-6 fill-green-600" />
                </div>
                <h3 className="text-lg font-bold text-green-800 mb-1">Avaliação Recebida!</h3>
                <p className="text-green-600 text-sm">Muito obrigado por compartilhar sua opinião conosco. Ela ajuda outros leitores!</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Reviews List */}
      {reviews.length > 0 && (
        <div className="border-t border-slate-200 bg-slate-50 p-6 md:p-10">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Comentários recentes</h3>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="flex gap-4">
                <div className="w-10 h-10 shrink-0 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold text-lg">
                  {review.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-slate-900">{review.name}</h4>
                    <span className="text-xs font-medium text-slate-500">
                      {new Date(review.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <div className="flex mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`w-3.5 h-3.5 ${star <= review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300 fill-slate-300'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed">{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EbookReviews;
