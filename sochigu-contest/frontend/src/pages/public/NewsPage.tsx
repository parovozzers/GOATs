import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { newsApi } from '@/api/news';
import { News } from '@/types';

const LIMIT = 10;

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function NewsCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
      <div className="h-[200px] bg-gray-200" />
      <div className="p-5 space-y-3">
        <div className="h-3 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-4/5" />
        <div className="space-y-2 pt-1">
          <div className="h-3 bg-gray-100 rounded w-full" />
          <div className="h-3 bg-gray-100 rounded w-full" />
          <div className="h-3 bg-gray-100 rounded w-2/3" />
        </div>
        <div className="h-4 bg-gray-200 rounded w-1/4 pt-1" />
      </div>
    </div>
  );
}

function NewsCard({ item }: { item: News }) {
  const date = item.publishedAt ?? item.createdAt;

  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
      {item.coverImage ? (
        <img
          src={item.coverImage}
          alt={item.title}
          className="w-full h-[200px] object-cover"
        />
      ) : (
        <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center text-gray-400 text-sm select-none">
          Нет обложки
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        <time className="text-xs text-gray-400 mb-2">{formatDate(date)}</time>
        <h2 className="font-semibold text-gray-900 line-clamp-2 mb-2 leading-snug">
          {item.title}
        </h2>
        {item.excerpt && (
          <p className="text-sm text-gray-600 line-clamp-3 flex-1">{item.excerpt}</p>
        )}
        <Link
          to={`/news/${item.slug}`}
          className="mt-4 text-sm text-primary-700 hover:text-primary-900 font-medium self-start"
        >
          Читать →
        </Link>
      </div>
    </article>
  );
}

export function NewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const totalPages = Math.ceil(total / LIMIT);

  useEffect(() => {
    setLoading(true);
    newsApi
      .getPublished(page, LIMIT)
      .then(([items, count]) => {
        setNews(items);
        setTotal(count);
      })
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl py-10">
        <h1 className="text-3xl font-bold text-primary-900 mb-8">Новости конкурса</h1>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <NewsCardSkeleton key={i} />
            ))}
          </div>
        ) : news.length === 0 ? (
          <p className="text-gray-500 text-center py-20">Новостей пока нет.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-10">
                <button
                  onClick={() => setPage((p) => p - 1)}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Назад
                </button>
                <span className="text-sm text-gray-600">
                  Страница {page} из {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Вперёд
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
