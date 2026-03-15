import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { authApi } from '@/api/auth';
import { useAuthStore } from '@/store/auth.store';
import { useUiStore } from '@/store/ui.store';

// ── Login ────────────────────────────────────────────────────────────────────

type LoginForm = { email: string; password: string };

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      await authApi.login(data);
      setError(null);
      onSuccess();
      const role = useAuthStore.getState().user?.role;
      const dest = role === 'admin' || role === 'moderator' ? '/admin'
        : role === 'expert' ? '/admin/applications'
        : '/cabinet';
      navigate(dest, { replace: true });
    } catch (err: any) {
      const raw = err?.response?.data?.message;
      const msg = Array.isArray(raw) ? raw[0] : typeof raw === 'string' ? raw : null;
      setError(msg ?? 'Неверный email или пароль.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 pt-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          {...register('email', {
            required: 'Введите email',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Некорректный email' },
          })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none"
          placeholder="email@example.com"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
        <input
          type="password"
          {...register('password', { required: true })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none"
          placeholder="••••••••"
        />
      </div>
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">{error}</div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-lg bg-primary hover:bg-primary-mid disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold transition-colors"
      >
        {loading ? 'Входим...' : 'Войти'}
      </button>
    </form>
  );
}

// ── Register ─────────────────────────────────────────────────────────────────

type RegisterForm = {
  lastName: string; firstName: string; middleName?: string;
  email: string; phone?: string; password: string; confirmPassword: string;
  university: string; faculty: string; course: string; city: string;
  consent: boolean;
};

function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { register, handleSubmit, getValues, formState: { errors } } = useForm<RegisterForm>();

  const onSubmit = async (data: RegisterForm) => {
    setError(null);
    setLoading(true);
    try {
      const { consent: _, course, confirmPassword: __, ...rest } = data;
      await authApi.register({ ...rest, course: course ? Number(course) : undefined });
      onSuccess();
      navigate('/cabinet', { replace: true });
    } catch (err: any) {
      const raw = err?.response?.data?.message;
      const msg = Array.isArray(raw) ? raw[0] : typeof raw === 'string' ? raw : null;
      setError(msg ?? 'Ошибка регистрации. Возможно, такой email уже занят.');
    } finally {
      setLoading(false);
    }
  };

  const field = 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none text-sm';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 p-6 pt-4">
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">{error}</div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Фамилия <span className="text-red-500">*</span></label>
          <input type="text" {...register('lastName', { required: 'Обязательное поле' })} className={field} placeholder="Иванов" />
          {errors.lastName && <p className="text-red-500 text-xs mt-0.5">{errors.lastName.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Имя <span className="text-red-500">*</span></label>
          <input type="text" {...register('firstName', { required: 'Обязательное поле' })} className={field} placeholder="Иван" />
          {errors.firstName && <p className="text-red-500 text-xs mt-0.5">{errors.firstName.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Отчество</label>
        <input type="text" {...register('middleName')} className={field} placeholder="Иванович" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
          <input type="email" {...register('email', {
            required: 'Обязательное поле',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Некорректный email' },
          })} className={field} placeholder="email@example.com" />
          {errors.email && <p className="text-red-500 text-xs mt-0.5">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Телефон</label>
          <input type="tel" {...register('phone')} className={field} placeholder="+7 (999) 123-45-67" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Пароль <span className="text-red-500">*</span></label>
          <input type="password" {...register('password', {
            required: 'Обязательное поле',
            minLength: { value: 8, message: 'Минимум 8 символов' },
          })} className={field} placeholder="••••••••" />
          {errors.password && <p className="text-red-500 text-xs mt-0.5">{errors.password.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Повторите пароль <span className="text-red-500">*</span></label>
          <input type="password" {...register('confirmPassword', {
            required: 'Обязательное поле',
            validate: v => v === getValues('password') || 'Пароли не совпадают',
          })} className={field} placeholder="••••••••" />
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-0.5">{errors.confirmPassword.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">ВУЗ <span className="text-red-500">*</span></label>
          <input type="text" {...register('university', { required: 'Обязательное поле' })} className={field} placeholder="СочиГУ" />
          {errors.university && <p className="text-red-500 text-xs mt-0.5">{errors.university.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Факультет/кафедра</label>
          <input type="text" {...register('faculty')} className={field} placeholder="ФИИЦТ" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Курс</label>
          <select {...register('course')} className={`${field} select-custom pl-3`}>
            <option value="">Выберите</option>
            {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Город <span className="text-red-500">*</span></label>
          <input type="text" {...register('city', { required: 'Обязательное поле' })} className={field} placeholder="Сочи" />
          {errors.city && <p className="text-red-500 text-xs mt-0.5">{errors.city.message}</p>}
        </div>
      </div>

      <div className="flex items-start gap-2">
        <input id="modal-consent" type="checkbox"
          {...register('consent', { required: 'Необходимо дать согласие' })}
          className="mt-0.5 w-4 h-4 rounded border-gray-300"
        />
        <label htmlFor="modal-consent" className="text-xs text-gray-600">
          Даю согласие на обработку персональных данных <span className="text-red-500">*</span>
        </label>
      </div>
      {errors.consent && <p className="text-red-500 text-xs">{errors.consent.message}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 rounded-lg bg-accent hover:bg-accent-hover disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold transition-colors text-sm"
      >
        {loading ? 'Регистрируем...' : 'Зарегистрироваться'}
      </button>
    </form>
  );
}

// ── Modal shell ───────────────────────────────────────────────────────────────

export function AuthModal() {
  const { authModal, closeAuthModal, openAuthModal } = useUiStore();
  const [mode, setMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    if (authModal) setMode(authModal);
  }, [authModal]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeAuthModal(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [closeAuthModal]);

  useEffect(() => {
    document.body.style.overflow = authModal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [authModal]);

  return (
    <AnimatePresence>
      {authModal && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeAuthModal} />

          {/* Card */}
          <motion.div
            className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]"
            initial={{ scale: 0.96, opacity: 0, y: 8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeAuthModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
              aria-label="Закрыть"
            >
              <X size={20} />
            </button>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              {(['login', 'register'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => { setMode(m); openAuthModal(m); }}
                  className={`flex-1 py-4 text-sm font-semibold transition-colors ${
                    mode === m
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {m === 'login' ? 'Войти' : 'Регистрация'}
                </button>
              ))}
            </div>

            {mode === 'login'
              ? <LoginForm onSuccess={closeAuthModal} />
              : <RegisterForm onSuccess={closeAuthModal} />
            }
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
