import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { setupStore } from 'store/store';
import { SiteLayout } from 'hoc/SiteLayout';

import Favorites from 'pages/Favorites';
import Singer from 'pages/Singer';
import Singers from 'pages/Singers';
import SnackbarProviderWrapper from 'containers/SnackbarProviderWrapper';
import routes from 'constants/routes';
import { CssBaseline, ThemeProvider } from '@mui/material';

import theme from 'theme/teme';

const store = setupStore();
function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <SnackbarProviderWrapper>
            <BrowserRouter>
              <SiteLayout>
                <Routes>
                  <Route path={routes.singers.list} element={<Singers />} />
                  <Route path={routes.singers.details.path} element={<Singer />} />
                  <Route path={routes.favorites} element={<Favorites />} />
                  <Route
                    path={routes.home}
                    element={<Navigate to={routes.singers.list} replace />}
                  />
                  <Route path="*" element={<Navigate to={routes.singers.list} replace />} />
                </Routes>
              </SiteLayout>
            </BrowserRouter>
          </SnackbarProviderWrapper>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
