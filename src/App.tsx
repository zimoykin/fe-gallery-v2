import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import HomePage from './pages/home.page';
import HeaderComponent from './components/header/header.component';
import FooterComponent from './components/footer.component';
import UnavailablePage from './pages/unavailable.page';
import BackgroundWithImage from './components/background/background.component';
import ProfilePage from './pages/profile.page';
import LoginPage from './pages/login.page';
import RegisterPage from './pages/register.page';
import ConfirmRegisterPage from './pages/confirm-register.page';
import RecoveryPage from './pages/recovery.page';
import RecoveryConfirmPage from './pages/confirm-recovery.page';
import OfferPage from './pages/offer.page';
import GalleryPage from './pages/gallery.page';
import InboxPage from './pages/inbox.page';
import UploadImagesPage from './pages/upload-images.page';
import CookieConsent from './components/cookie-consent.component';
import SecurityContainer from './components/security-container';
import MapsPage from './pages/maps.page';

function App() {
  return (
    <>
      <BackgroundWithImage />
      <Router>
        <div className="app-container">
          {/* nav bar */}
          <HeaderComponent />
          <main className='h-full pt-14 md:pt-20 w-full flex z-30 absolute'>
            <div className='w-full max-w-screen-2xl mx-auto transition-all ease-in-out delay-75'>
              <Routes>
                <Route
                  path='/'
                  element={<HomePage />}
                />
                <Route path='/offers/:offerId' element={<OfferPage />} />
                <Route
                  path='/gallery/:profileId'
                  element={<GalleryPage />}
                />
                <Route path='/map' element={<MapsPage />} />
                <Route path='/profile/' element={<SecurityContainer />}>
                  <Route
                    path='/profile/'
                    element={<ProfilePage />}
                  >
                  </Route>
                  <Route
                    path='/profile/folder/:folderId'
                    element={<UploadImagesPage />}
                  />
                </Route>
                <Route
                  path='/inbox'
                  element={<InboxPage />}
                />
                <Route
                  path='/login'
                  element={<LoginPage />}
                />
                <Route
                  path='/register'
                  element={<RegisterPage />}
                />
                <Route
                  path='/register/confirm'
                  element={<ConfirmRegisterPage />}
                />
                <Route
                  path='/recovery'
                  element={<RecoveryPage />}
                />
                <Route
                  path='/recovery/confirm'
                  element={<RecoveryConfirmPage />}
                />
                <Route
                  path='*'
                  element={<UnavailablePage />}
                />
              </Routes>
            </div>
          </main>
          <FooterComponent />
          <CookieConsent />
        </div>
      </Router>
    </>
  );
}

export default App;
