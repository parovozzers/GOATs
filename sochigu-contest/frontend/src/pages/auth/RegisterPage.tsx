import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { authApi } from '@/api/auth';

type RegisterForm = {
  lastName: string;
  firstName: string;
  middleName?: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  university: string;
  faculty: string;
  course: string;
  city: string;
  consent: boolean;
};

export function RegisterPage() {
  useEffect(() => { document.title = 'Регистрация — Конкурс СочиГУ'; }, []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterForm>();

  const onSubmit = async (data: RegisterForm) => {
    setError(null);
    setLoading(true);
    try {
      const { consent, course, confirmPassword: _, ...rest } = data;
      await authApi.register({ ...rest, course: course ? Number(course) : undefined });
      navigate('/cabinet', { replace: true });
    } catch (err: any) {
      const raw = err?.response?.data?.message;
      const msg = Array.isArray(raw) ? raw[0] : typeof raw === 'string' ? raw : null;
      setError(msg ?? 'Ошибка регистрации. Возможно, такой email уже занят.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-primary-900 mb-6 text-center">
            Регистрация участника
          </h1>

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Фамилия <span className="text-red-500">*</span>
                </label>
                <input
                  id="lastName"
                  type="text"
                  {...register('lastName', { required: 'Обязательное поле' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  placeholder="Иванов"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  Имя <span className="text-red-500">*</span>
                </label>
                <input
                  id="firstName"
                  type="text"
                  {...register('firstName', { required: 'Обязательное поле' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  placeholder="Иван"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="middleName" className="block text-sm font-medium text-gray-700 mb-1">
                Отчество
              </label>
              <input
                id="middleName"
                type="text"
                {...register('middleName')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder="Иванович"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email', {
                    required: 'Обязательное поле',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Некорректный email',
                    },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  placeholder="email@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Телефон
                </label>
                <input
                  id="phone"
                  type="tel"
                  {...register('phone')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  placeholder="+7 (999) 123-45-67"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Пароль <span className="text-red-500">*</span>
                </label>
                <input
                  id="password"
                  type="password"
                  {...register('password', {
                    required: 'Обязательное поле',
                    minLength: { value: 8, message: 'Минимум 8 символов' },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Повторите пароль <span className="text-red-500">*</span>
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  {...register('confirmPassword', {
                    required: 'Обязательное поле',
                    validate: v => v === getValues('password') || 'Пароли не совпадают',
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  placeholder="••••••••"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-1">
                  ВУЗ <span className="text-red-500">*</span>
                </label>
                <input
                  id="university"
                  type="text"
                  {...register('university', { required: 'Обязательное поле' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  placeholder="СочиГУ"
                />
                {errors.university && (
                  <p className="text-red-500 text-xs mt-1">{errors.university.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="faculty" className="block text-sm font-medium text-gray-700 mb-1">
                  Факультет/кафедра
                </label>
                <input
                  id="faculty"
                  type="text"
                  {...register('faculty')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  placeholder="ФИИЦТ"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
                  Курс
                </label>
                <select
                  id="course"
                  {...register('course')}
                  className="w-full select-custom pl-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                >
                  <option value="">Выберите</option>
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  Город <span className="text-red-500">*</span>
                </label>
                <input
                  id="city"
                  type="text"
                  {...register('city', { required: 'Обязательное поле' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  placeholder="Сочи"
                />
                {errors.city && (
                  <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <input
                id="consent"
                type="checkbox"
                {...register('consent', {
                  required: 'Необходимо дать согласие на обработку персональных данных',
                })}
                className="mt-1 w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="consent" className="text-sm text-gray-600">
                Даю согласие на обработку персональных данных <span className="text-red-500">*</span>
              </label>
            </div>
            {errors.consent && (
              <p className="text-red-500 text-xs mt-1">{errors.consent.message}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-accent-600 hover:bg-accent-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold transition-colors"
            >
              {loading ? 'Регистрируем...' : 'Зарегистрироваться'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Уже есть аккаунт?{' '}
            <Link to="/login" className="text-primary-600 hover:underline font-medium">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}