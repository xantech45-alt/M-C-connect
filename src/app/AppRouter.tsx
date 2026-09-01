import { lazy, Suspense } from 'react';
import type { ReactNode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from '@/layouts/RootLayout';
import { OnboardingLayout } from '@/layouts/OnboardingLayout';
import { DetailLayout } from '@/layouts/DetailLayout';
import { TabsLayout } from '@/layouts/TabsLayout';
import { PdpLayout } from '@/layouts/PdpLayout';

const OnboardingPage = lazy(() => import('@/pages/OnboardingPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('@/pages/ForgotPasswordPage'));
const VerifyCodePage = lazy(() => import('@/pages/VerifyCodePage'));
const ResetPasswordPage = lazy(() => import('@/pages/ResetPasswordPage'));
const ResetSuccessPage = lazy(() => import('@/pages/ResetSuccessPage'));
const BusinessProfilePage = lazy(() => import('@/pages/BusinessProfilePage'));
const HomePage = lazy(() => import('@/pages/HomePage'));
const CategoriesPage = lazy(() => import('@/pages/CategoriesPage'));
const SearchPage = lazy(() => import('@/pages/SearchPage'));
const SearchResultsPage = lazy(() => import('@/pages/SearchResultsPage'));
const ImageSearchPage = lazy(() => import('@/pages/ImageSearchPage'));
const ProductDetailPage = lazy(() => import('@/pages/ProductDetailPage'));
const ProductSpecsPage = lazy(() => import('@/pages/ProductSpecsPage'));
const LandedCostPage = lazy(() => import('@/pages/LandedCostPage'));
const ComparePage = lazy(() => import('@/pages/ComparePage'));
const RequestQuotePage = lazy(() => import('@/pages/RequestQuotePage'));
const CartPage = lazy(() => import('@/pages/CartPage'));
const OrderReviewPage = lazy(() => import('@/pages/OrderReviewPage'));
const PaymentPage = lazy(() => import('@/pages/PaymentPage'));
const OrderConfirmationPage = lazy(() => import('@/pages/OrderConfirmationPage'));
const QuoteReceivedPage = lazy(() => import('@/pages/QuoteReceivedPage'));
const OrdersPage = lazy(() => import('@/pages/OrdersPage'));
const OrderTrackingPage = lazy(() => import('@/pages/OrderTrackingPage'));
const QualityControlPage = lazy(() => import('@/pages/QualityControlPage'));
const MessagesPage = lazy(() => import('@/pages/MessagesPage'));
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const ProfileEditPage = lazy(() => import('@/pages/ProfileEditPage'));
const SettingsPage = lazy(() => import('@/pages/SettingsPage'));
const SettingsPersonalPage = lazy(() => import('@/pages/SettingsPersonalPage'));
const SettingsSecurityPage = lazy(() => import('@/pages/SettingsSecurityPage'));
const AddressesPage = lazy(() => import('@/pages/AddressesPage'));
const AddressFormPage = lazy(() => import('@/pages/AddressFormPage'));
const PaymentMethodsPage = lazy(() => import('@/pages/PaymentMethodsPage'));
const FavoritesPage = lazy(() => import('@/pages/FavoritesPage'));
const CouponsPage = lazy(() => import('@/pages/CouponsPage'));
const ReviewsPage = lazy(() => import('@/pages/ReviewsPage'));
const ReturnsPage = lazy(() => import('@/pages/ReturnsPage'));
const HelpPage = lazy(() => import('@/pages/HelpPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const AllProductsPage = lazy(() => import('@/pages/AllProductsPage'));
const FiltersPage = lazy(() => import('@/pages/FiltersPage'));
const MessageThreadPage = lazy(() => import('@/pages/MessageThreadPage'));
const NotificationsPage = lazy(() => import('@/pages/NotificationsPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

function withSuspense(node: ReactNode) {
  return <Suspense fallback={null}>{node}</Suspense>;
}

// eslint-disable-next-line react-refresh/only-export-components -- router singleton lives alongside the AppRouter component that consumes it
export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <OnboardingLayout>{withSuspense(<OnboardingPage />)}</OnboardingLayout> },
      { path: '/onboarding', element: <OnboardingLayout>{withSuspense(<OnboardingPage />)}</OnboardingLayout> },
      { path: '/login', element: <DetailLayout title="Connexion">{withSuspense(<LoginPage />)}</DetailLayout> },
      { path: '/register', element: <DetailLayout title="Créer un compte">{withSuspense(<RegisterPage />)}</DetailLayout> },
      { path: '/forgot-password', element: <DetailLayout title="Mot de passe oublié">{withSuspense(<ForgotPasswordPage />)}</DetailLayout> },
      { path: '/verify-code', element: <DetailLayout title="Vérification">{withSuspense(<VerifyCodePage />)}</DetailLayout> },
      { path: '/reset-password', element: <DetailLayout title="Nouveau mot de passe">{withSuspense(<ResetPasswordPage />)}</DetailLayout> },
      { path: '/reset-success', element: <DetailLayout title="Confirmation" hideBack>{withSuspense(<ResetSuccessPage />)}</DetailLayout> },
      { path: '/profile-setup', element: <DetailLayout title="Profil entreprise">{withSuspense(<BusinessProfilePage />)}</DetailLayout> },
      { path: '/filters', element: withSuspense(<FiltersPage />) },
      {
        element: <TabsLayout />,
        children: [
          { path: '/home', element: withSuspense(<HomePage />) },
          { path: '/categories', element: withSuspense(<CategoriesPage />) },
          { path: '/search', element: withSuspense(<SearchPage />) },
          { path: '/search/results', element: <DetailLayout bare title="Résultats">{withSuspense(<SearchResultsPage />)}</DetailLayout> },
          { path: '/product/:id/specs', element: <DetailLayout bare title="Spécifications">{withSuspense(<ProductSpecsPage />)}</DetailLayout> },
          { path: '/product/:id/landed-cost', element: <DetailLayout bare title="Coût total rendu">{withSuspense(<LandedCostPage />)}</DetailLayout> },
          { path: '/compare', element: <DetailLayout bare title="Comparer">{withSuspense(<ComparePage />)}</DetailLayout> },
          { path: '/rfq/new', element: <DetailLayout bare title="Demande de devis">{withSuspense(<RequestQuotePage />)}</DetailLayout> },
          { path: '/rfq/received', element: <DetailLayout bare title="Demande reçue">{withSuspense(<QuoteReceivedPage />)}</DetailLayout> },
          { path: '/cart', element: <DetailLayout bare title="Panier">{withSuspense(<CartPage />)}</DetailLayout> },
          { path: '/checkout/review', element: <DetailLayout bare title="Récapitulatif">{withSuspense(<OrderReviewPage />)}</DetailLayout> },
          { path: '/checkout/payment', element: <DetailLayout bare title="Paiement">{withSuspense(<PaymentPage />)}</DetailLayout> },
          { path: '/checkout/confirmation', element: <DetailLayout bare title="Confirmation">{withSuspense(<OrderConfirmationPage />)}</DetailLayout> },
          { path: '/orders', element: withSuspense(<OrdersPage />) },
          { path: '/orders/:id', element: <DetailLayout bare title="Suivi de commande">{withSuspense(<OrderTrackingPage />)}</DetailLayout> },
          { path: '/orders/:id/qc', element: <DetailLayout bare title="Contrôle qualité">{withSuspense(<QualityControlPage />)}</DetailLayout> },
          { path: '/messages', element: withSuspense(<MessagesPage />) },
          { path: '/messages/:id', element: <DetailLayout bare title="Conversation">{withSuspense(<MessageThreadPage />)}</DetailLayout> },
          { path: '/notifications', element: <DetailLayout bare title="Notifications">{withSuspense(<NotificationsPage />)}</DetailLayout> },
          { path: '/dashboard', element: withSuspense(<DashboardPage />) },
          { path: '/profile', element: withSuspense(<ProfilePage />) },
          { path: '/profile/edit', element: <DetailLayout bare title="Modifier le profil">{withSuspense(<ProfileEditPage />)}</DetailLayout> },
          { path: '/settings', element: <DetailLayout bare title="Paramètres">{withSuspense(<SettingsPage />)}</DetailLayout> },
          { path: '/settings/personal', element: <DetailLayout bare title="Informations personnelles">{withSuspense(<SettingsPersonalPage />)}</DetailLayout> },
          { path: '/settings/security', element: <DetailLayout bare title="Sécurité">{withSuspense(<SettingsSecurityPage />)}</DetailLayout> },
          { path: '/addresses', element: <DetailLayout bare title="Mes adresses">{withSuspense(<AddressesPage />)}</DetailLayout> },
          { path: '/addresses/new', element: <DetailLayout bare title="Ajouter une adresse">{withSuspense(<AddressFormPage />)}</DetailLayout> },
          { path: '/addresses/:id/edit', element: <DetailLayout bare title="Modifier l'adresse">{withSuspense(<AddressFormPage />)}</DetailLayout> },
          { path: '/payment-methods', element: <DetailLayout bare title="Moyens de paiement">{withSuspense(<PaymentMethodsPage />)}</DetailLayout> },
          { path: '/favorites', element: <DetailLayout bare title="Favoris">{withSuspense(<FavoritesPage />)}</DetailLayout> },
          { path: '/coupons', element: <DetailLayout bare title="Coupons">{withSuspense(<CouponsPage />)}</DetailLayout> },
          { path: '/reviews', element: <DetailLayout bare title="Mes avis">{withSuspense(<ReviewsPage />)}</DetailLayout> },
          { path: '/returns', element: <DetailLayout bare title="Retours et remboursements">{withSuspense(<ReturnsPage />)}</DetailLayout> },
          { path: '/help', element: <DetailLayout bare title="Centre d'aide">{withSuspense(<HelpPage />)}</DetailLayout> },
          { path: '/contact', element: <DetailLayout bare title="Contactez-nous">{withSuspense(<ContactPage />)}</DetailLayout> },
          { path: '/about', element: <DetailLayout bare title="À propos">{withSuspense(<AboutPage />)}</DetailLayout> },
          { path: '/products', element: withSuspense(<AllProductsPage />) },
          { path: '/image-search', element: <DetailLayout bare>{withSuspense(<ImageSearchPage />)}</DetailLayout> },
        ],
      },
      {
        // PDP has its own layout: no top commerce header, but the fixed
        // BottomNav persists so commerce flow remains navigable.
        element: <PdpLayout />,
        children: [
          { path: '/product/:id', element: withSuspense(<ProductDetailPage />) },
        ],
      },
      { path: '*', element: <DetailLayout title="Page introuvable">{withSuspense(<NotFoundPage />)}</DetailLayout> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
