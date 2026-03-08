import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { applicationsApi } from '@/api/applications';
import { nominationsApi } from '@/api/nominations';
import { Nomination, AppFile, TeamMember, CreateApplicationDto } from '@/types';
import { Spinner } from '@/components/shared/Spinner';
import { Alert } from '@/components/ui/Alert';

type Step = 1 | 2 | 3 | 4;

const STEPS = ['Номинация', 'Описание и команда', 'Файлы', 'Подтверждение'];
const STEP_TITLES = [
  'Шаг 1 из 4: Выбор номинации',
  'Шаг 2 из 4: Описание проекта',
  'Шаг 3 из 4: Загрузка файлов',
  'Шаг 4 из 4: Подтверждение',
];

interface Step2Fields {
  projectTitle: string;
  projectDescription: string;
  keywords: string;
}

const inputClass = 'w-full rounded-lg border border-input bg-background px-4 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring';

export function ApplicationFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const navigate = useNavigate();

  const {
    register,
    trigger,
    reset: resetStep2,
    getValues: getStep2,
    watch,
    formState: { errors: step2Errors },
  } = useForm<Step2Fields>({
    defaultValues: { projectTitle: '', projectDescription: '', keywords: '' },
  });

  const descLength = watch('projectDescription')?.length ?? 0;

  const [step, setStep] = useState<Step>(1);
  const [nominations, setNominations] = useState<Nomination[]>([]);
  const [nominationId, setNominationId] = useState('');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([{ name: '', role: '', email: '' }]);
  const [supervisor, setSupervisor] = useState({ name: '', title: '', email: '' });
  const [uploadedFiles, setUploadedFiles] = useState<AppFile[]>([]);
  const [appId, setAppId] = useState<string | null>(id ?? null);
  const [saving, setSaving] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    nominationsApi.getAll().then(setNominations);
    if (isEdit && id) {
      applicationsApi.getById(id).then(app => {
        setNominationId(app.nominationId);
        resetStep2({
          projectTitle: app.projectTitle,
          projectDescription: app.projectDescription,
          keywords: app.keywords?.join(', ') ?? '',
        });
        setTeamMembers(app.teamMembers?.length ? app.teamMembers : [{ name: '', role: '', email: '' }]);
        setSupervisor({
          name: app.supervisor?.name ?? '',
          title: app.supervisor?.title ?? '',
          email: app.supervisor?.email ?? '',
        });
        setUploadedFiles(app.files ?? []);
      }).finally(() => setLoading(false));
    }
  }, [id]);

  const handleNext = async () => {
    if (step === 1) {
      if (!nominationId) return;
      setStep(2);
    } else if (step === 2) {
      const valid = await trigger(['projectTitle', 'projectDescription']);
      if (!valid) return;
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    }
  };

  const buildPayload = (): CreateApplicationDto => {
    const { projectTitle, projectDescription, keywords } = getStep2();
    return {
      nominationId,
      projectTitle,
      projectDescription,
      keywords: keywords ? keywords.split(',').map((k: string) => k.trim()).filter(Boolean) : [],
      teamMembers: teamMembers.filter(m => m.name),
      supervisor: supervisor.name ? supervisor : undefined,
    };
  };

  const saveApp = async (): Promise<string> => {
    if (appId) { await applicationsApi.update(appId, buildPayload()); return appId; }
    const created = await applicationsApi.create(buildPayload());
    setAppId(created.id);
    return created.id;
  };

  const handleSaveDraft = async () => {
    setError(null);
    setSaving(true);
    try {
      await saveApp();
      navigate('/cabinet/application');
    } catch {
      setError('Не удалось сохранить черновик. Попробуйте ещё раз.');
    } finally {
      setSaving(false);
    }
  };

  const handleSubmitApp = async () => {
    setError(null);
    setSaving(true);
    try {
      const newId = await saveApp();
      await applicationsApi.submit(newId);
      navigate('/cabinet/application');
    } catch {
      setError('Не удалось подать заявку. Попробуйте ещё раз.');
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (file: File, category: string) => {
    setError(null);
    try {
      const targetId = appId ?? await saveApp();
      const uploaded = await applicationsApi.uploadFile(targetId, file, category);
      setUploadedFiles(prev => [...prev, uploaded]);
    } catch {
      setError('Не удалось загрузить файл. Попробуйте ещё раз.');
    }
  };

  const addMember = () => setTeamMembers(t => [...t, { name: '', role: '', email: '' }]);
  const removeMember = (i: number) => setTeamMembers(t => t.filter((_, idx) => idx !== i));
  const updateMember = (i: number, field: keyof TeamMember, value: string) =>
    setTeamMembers(t => t.map((m, idx) => idx === i ? { ...m, [field]: value } : m));

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold text-foreground">
        {isEdit ? 'Редактировать заявку' : 'Подать заявку'}
      </h1>

      {/* Прогресс-бар */}
      <div className="mb-8 flex items-center">
        {STEPS.map((label, idx) => {
          const n = (idx + 1) as Step;
          const done = step > n;
          const active = step === n;
          return (
            <div key={n} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors
                  ${done ? 'bg-accent text-accent-foreground' : active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  {done ? '✓' : n}
                </div>
                <span className="mt-1 hidden text-xs text-muted-foreground sm:block">{label}</span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className={`mx-1 h-0.5 flex-1 ${done ? 'bg-accent' : 'bg-border'}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Ошибка */}
      {error && (
        <div className="mb-4">
          <Alert variant="error">{error}</Alert>
        </div>
      )}

      {/* Контент шагов */}
      <div className="min-h-80 rounded-xl border border-border bg-card p-6 shadow-sm">

        {/* Шаг 1 — Номинация */}
        {step === 1 && (
          <div>
            <h2 className="mb-4 text-lg font-semibold text-foreground">{STEP_TITLES[0]}</h2>
            {nominations.length === 0 ? (
              <div className="flex justify-center py-8"><Spinner /></div>
            ) : (
              <div className="space-y-3">
                {nominations.map(nom => (
                  <button
                    key={nom.id}
                    type="button"
                    onClick={() => setNominationId(nom.id)}
                    className={`w-full rounded-xl border-2 p-4 text-left transition-colors
                      ${nominationId === nom.id
                        ? 'border-primary bg-primary-light'
                        : 'border-border hover:border-muted-foreground/40'}`}
                  >
                    <p className="font-semibold text-foreground">{nom.name}</p>
                    {nom.description && (
                      <p className="mt-1 text-sm text-muted-foreground">{nom.description}</p>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Шаг 2 — Описание и команда */}
        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-foreground">{STEP_TITLES[1]}</h2>

            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">
                Название проекта <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                {...register('projectTitle', {
                  required: 'Введите название проекта',
                  maxLength: { value: 200, message: 'Максимум 200 символов' },
                })}
                className={inputClass}
                placeholder="Краткое название проекта"
              />
              {step2Errors.projectTitle && (
                <p className="mt-1 text-xs text-destructive">{step2Errors.projectTitle.message}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">
                Описание проекта <span className="text-destructive">*</span>{' '}
                <span className="font-normal text-muted-foreground">({descLength}/2000)</span>
              </label>
              <textarea
                rows={5}
                {...register('projectDescription', {
                  required: 'Введите описание проекта',
                  minLength: { value: 100, message: 'Минимум 100 символов' },
                  maxLength: { value: 2000, message: 'Максимум 2000 символов' },
                })}
                className={inputClass}
                placeholder="Подробное описание проекта (минимум 100 символов)"
              />
              {step2Errors.projectDescription && (
                <p className="mt-1 text-xs text-destructive">{step2Errors.projectDescription.message}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Ключевые слова</label>
              <input
                type="text"
                {...register('keywords')}
                className={inputClass}
                placeholder="Введите через запятую: инновации, IT, экология"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Состав команды</label>
                <button type="button" onClick={addMember}
                  className="text-sm font-medium text-primary hover:underline">
                  + Добавить участника
                </button>
              </div>
              <div className="space-y-2">
                {teamMembers.map((m, i) => (
                  <div key={i} className="grid grid-cols-3 gap-2">
                    <input type="text" placeholder="ФИО" value={m.name}
                      onChange={e => updateMember(i, 'name', e.target.value)} className={inputClass} />
                    <input type="text" placeholder="Роль в проекте" value={m.role}
                      onChange={e => updateMember(i, 'role', e.target.value)} className={inputClass} />
                    <div className="flex gap-1">
                      <input type="email" placeholder="Email (необязательно)" value={m.email ?? ''}
                        onChange={e => updateMember(i, 'email', e.target.value)} className={inputClass} />
                      {teamMembers.length > 1 && (
                        <button type="button" onClick={() => removeMember(i)}
                          className="px-2 text-lg text-destructive hover:opacity-70">×</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-foreground">Научный руководитель</p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <input type="text" placeholder="ФИО" value={supervisor.name}
                  onChange={e => setSupervisor(s => ({ ...s, name: e.target.value }))} className={inputClass} />
                <input type="text" placeholder="Должность/звание" value={supervisor.title}
                  onChange={e => setSupervisor(s => ({ ...s, title: e.target.value }))} className={inputClass} />
                <input type="email" placeholder="Email (необязательно)" value={supervisor.email}
                  onChange={e => setSupervisor(s => ({ ...s, email: e.target.value }))} className={inputClass} />
              </div>
            </div>
          </div>
        )}

        {/* Шаг 3 — Файлы */}
        {step === 3 && (
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-foreground">{STEP_TITLES[2]}</h2>
            <FileUploadZone
              label="Файлы проекта"
              hint="PDF, DOC, DOCX, PPT, ZIP, RAR"
              accept=".pdf,.doc,.docx,.ppt,.pptx,.zip,.rar"
              category="project_file"
              onUpload={handleFileUpload}
            />
            <FileUploadZone
              label="Сканы документов"
              hint="PDF, JPG, PNG"
              accept=".pdf,.jpg,.jpeg,.png"
              category="document_scan"
              onUpload={handleFileUpload}
            />
            {uploadedFiles.length > 0 && (
              <div>
                <p className="mb-2 text-sm font-medium text-foreground">Загруженные файлы</p>
                <div className="space-y-2">
                  {uploadedFiles.map(f => (
                    <div key={f.id} className="flex items-center justify-between rounded-lg bg-muted px-3 py-2 text-sm">
                      <span className="truncate text-foreground">{f.originalName}</span>
                      <span className="ml-2 text-muted-foreground">
                        {f.size >= 1048576 ? `${(f.size / 1048576).toFixed(1)} МБ` : `${Math.round(f.size / 1024)} КБ`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Шаг 4 — Подтверждение */}
        {step === 4 && (
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-foreground">{STEP_TITLES[3]}</h2>
            <div className="space-y-2 rounded-lg bg-muted p-4 text-sm">
              <p>
                <span className="text-muted-foreground">Номинация: </span>
                <span className="font-medium text-foreground">
                  {nominations.find(n => n.id === nominationId)?.name ?? '—'}
                </span>
              </p>
              <p>
                <span className="text-muted-foreground">Проект: </span>
                <span className="font-medium text-foreground">{getStep2().projectTitle || '—'}</span>
              </p>
              <p>
                <span className="text-muted-foreground">Членов команды: </span>
                <span className="font-medium text-foreground">{teamMembers.filter(m => m.name).length}</span>
              </p>
              <p>
                <span className="text-muted-foreground">Файлов: </span>
                <span className="font-medium text-foreground">{uploadedFiles.length}</span>
              </p>
              {supervisor.name && (
                <p>
                  <span className="text-muted-foreground">Научный руководитель: </span>
                  <span className="font-medium text-foreground">{supervisor.name}</span>
                </p>
              )}
            </div>
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={e => setConfirmed(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-input text-primary focus:ring-ring"
              />
              <span className="text-sm text-muted-foreground">
                Подтверждаю корректность введённых данных
              </span>
            </label>
          </div>
        )}
      </div>

      {/* Навигация */}
      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={() => setStep(s => Math.max(1, s - 1) as Step)}
          disabled={step === 1}
          className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
        >
          Назад
        </button>

        {step < 4 ? (
          <button
            type="button"
            onClick={handleNext}
            disabled={step === 1 && !nominationId}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-mid disabled:cursor-not-allowed disabled:opacity-40"
          >
            Далее
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={saving}
              className="rounded-lg border-2 border-primary px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary-light disabled:opacity-60"
            >
              {saving ? 'Сохраняем...' : 'Сохранить черновик'}
            </button>
            <button
              type="button"
              onClick={handleSubmitApp}
              disabled={saving || !confirmed}
              className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-all hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? 'Отправляем...' : 'Подать заявку'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function FileUploadZone({ label, hint, accept, category, onUpload }: {
  label: string;
  hint: string;
  accept: string;
  category: string;
  onUpload: (file: File, category: string) => Promise<void>;
}) {
  const [uploading, setUploading] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try { await onUpload(file, category); } finally {
      setUploading(false);
      if (ref.current) ref.current.value = '';
    }
  };

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-foreground">{label}</p>
      <div
        onClick={() => ref.current?.click()}
        className="cursor-pointer rounded-xl border-2 border-dashed border-border p-6 text-center transition-colors hover:border-primary"
      >
        {uploading ? (
          <div className="flex justify-center"><Spinner /></div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">Нажмите для выбора файла</p>
            <p className="mt-1 text-xs text-muted-foreground/60">{hint}</p>
          </>
        )}
      </div>
      <input ref={ref} type="file" accept={accept} onChange={handleChange} className="hidden" />
    </div>
  );
}
