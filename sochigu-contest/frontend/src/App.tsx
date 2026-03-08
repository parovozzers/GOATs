import { Routes, Route } from 'react-router-dom';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { CabinetLayout } from '@/components/layout/CabinetLayout';
import { ProtectedRoute } from '@/components/shared/ProtectedRoute';
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
import { AnalyticsPage } from '@/pages/admin/AnalyticsPage';
import { NewsManagePage } from '@/pages/admin/cms/NewsManagePage';
import { DocumentsManagePage } from '@/pages/admin/cms/DocumentsManagePage';
import { WinnersManagePage } from '@/pages/admin/cms/WinnersManagePage';
import { NominationsManagePage } from '@/pages/admin/cms/NominationsManagePage';
import { ExpertsPage as AdminExpertsPage } from '@/pages/admin/ExpertsPage';

export default function App() {
  return (
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
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/applications" element={<ApplicationsListPage />} />
          <Route path="/admin/applications/:id" element={<ApplicationDetailPage />} />
          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/admin/analytics" element={<AnalyticsPage />} />
          <Route path="/admin/cms/news" element={<NewsManagePage />} />
          <Route path="/admin/cms/documents" element={<DocumentsManagePage />} />
          <Route path="/admin/cms/winners" element={<WinnersManagePage />} />
          <Route path="/admin/cms/nominations" element={<NominationsManagePage />} />
          <Route path="/admin/experts" element={<AdminExpertsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
