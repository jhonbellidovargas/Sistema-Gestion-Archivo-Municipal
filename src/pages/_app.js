import { ProviderAuth } from '@hooks/useAuth';
import MainLayout from '@layout/MainLayout';
import '@styles/tailwind.css';

import { UserContext } from '../context/userContext';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <UserContext>
        <ProviderAuth>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </ProviderAuth>
      </UserContext>
    </>
  );
}

export default MyApp;
