import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { PageLoader } from '@/components/ui/PageLoader';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { CabinetLayout } from '@/components/layout/CabinetLayout';
import { ProtectedRoute } from '@/components/shared/ProtectedRoute';
import { RoleGuard } from '@/components/shared/RoleGuard';
import { HomePage } from '@/pages/public/HomePage';
import { AboutPage } from '@/pages/public/AboutPage';
import { NominationsPage } from '@/pages/public/NominationsPage';
import { ExpertsPage } from '@/pages/public/ExpertsPage';
import { PartnersPage } from '@/pages/public/PartnersPage';
import { ContactsPage } from '@/pages/public/ContactsPage';
import { NewsPage } from '@/pages/public/NewsPage';
import { NewsDetailPage } from '@/pages/public/NewsDetailPage';
import { DocumentsPage } from '@/pages/public/DocumentsPage';
import { WinnersPage } from '@/pages/public/WinnersPage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { CabinetDashboardPage } from '@/pages/cabinet/CabinetDashboardPage';
import { ApplicationPage } from '@/pages/cabinet/ApplicationPage';
import { ApplicationFormPage } from '@/pages/cabinet/ApplicationFormPage';
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage';
import { ApplicationsListPage } from '@/pages/admin/ApplicationsListPage';
import { ApplicationDetailPage } from '@/pages/admin/ApplicationDetailPage';
import { UsersPage } from '@/pages/admin/UsersPage';
const AnalyticsPage = lazy(() => import('@/pages/admin/AnalyticsPage').then(m => ({ default: m.AnalyticsPage })));
import { NewsManagePage } from '@/pages/admin/cms/NewsManagePage';
import { DocumentsManagePage } from '@/pages/admin/cms/DocumentsManagePage';
import { WinnersManagePage } from '@/pages/admin/cms/WinnersManagePage';
import { NominationsManagePage } from '@/pages/admin/cms/NominationsManagePage';
import { ExpertsPage as AdminExpertsPage } from '@/pages/admin/ExpertsPage';
export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/nominations" element={<NominationsPage />} />
        <Route path="/experts" element={<ExpertsPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:slug" element={<NewsDetailPage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/winners" element={<WinnersPage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute roles={['participant', 'expert', 'moderator', 'admin']} />}>
        <Route element={<CabinetLayout />}>
          <Route path="/cabinet" element={<CabinetDashboardPage />} />
          <Route path="/cabinet/application" element={<ApplicationPage />} />
          <Route path="/cabinet/application/new" element={<ApplicationFormPage />} />
          <Route path="/cabinet/application/:id/edit" element={<ApplicationFormPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute roles={['admin', 'moderator', 'expert']} />}>
        <Route element={<AdminLayout />}>
          {/* Эксперт на /admin → редирект на /admin/applications */}
          <Route path="/admin" element={
            <RoleGuard roles={['admin', 'moderator']} redirectTo="/admin/applications">
              <AdminDashboardPage />
            </RoleGuard>
          } />
          <Route path="/admin/applications" element={<ApplicationsListPage />} />
          <Route path="/admin/applications/:id" element={<ApplicationDetailPage />} />
          <Route path="/admin/users" element={
            <RoleGuard roles={['admin', 'moderator']}><UsersPage /></RoleGuard>
          } />
          <Route path="/admin/analytics" element={
            <RoleGuard roles={['admin', 'moderator']}><AnalyticsPage /></RoleGuard>
          } />
          <Route path="/admin/cms/news" element={
            <RoleGuard roles={['admin', 'moderator']}><NewsManagePage /></RoleGuard>
          } />
          <Route path="/admin/cms/documents" element={
            <RoleGuard roles={['admin', 'moderator']}><DocumentsManagePage /></RoleGuard>
          } />
          <Route path="/admin/cms/winners" element={<WinnersManagePage />} />
          <Route path="/admin/cms/nominations" element={
            <RoleGuard roles={['admin', 'moderator']}><NominationsManagePage /></RoleGuard>
          } />
          <Route path="/admin/experts" element={
            <RoleGuard roles={['admin', 'moderator']}><AdminExpertsPage /></RoleGuard>
          } />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </Suspense>
  );
}
