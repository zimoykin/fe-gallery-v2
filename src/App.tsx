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

function App() {
  return (
    <>
      <BackgroundWithImage />
      <Router>
        <div className="app-container">
          <HeaderComponent />
          <main className='h-[calc(100vh-2rem)] pt-20 w-screen flex z-30 absolute'>
            <div className='w-full max-w-screen-2xl mx-auto transition ease-in-out delay-0'>
              <Routes>
                <Route
                  path='/'
                  element={<HomePage />}
                />
                <Route
                  path='/gallery/:profileId'
                  element={<UnavailablePage />}
                />
                <Route
                  path='/profile'
                  element={<ProfilePage />}
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
                  element={<UnavailablePage />}
                />
                <Route
                  path='*'
                  element={<UnavailablePage />}
                />
              </Routes>
            </div>
          </main>
          <FooterComponent />
        </div>
      </Router>
    </>
  );
}

export default App;
