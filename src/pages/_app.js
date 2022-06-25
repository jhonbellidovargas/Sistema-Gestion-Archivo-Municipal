import { ProviderAuth } from '@hooks/useAuth';
import { UsuarioProvider } from '@hooks/TodoContext';
import MainLayout from '@layout/MainLayout';
import '@styles/tailwind.css';

// import { useContext } from 'react';
// import { AuthContext } from '@hooks/useAuth';

// // const { user } = useContext(AuthContext);
// const { user ,setAuth } = useContext(AuthContext);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <UsuarioProvider>
        <ProviderAuth>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </ProviderAuth>
      </UsuarioProvider>
    </>
  );
}

export default MyApp;
