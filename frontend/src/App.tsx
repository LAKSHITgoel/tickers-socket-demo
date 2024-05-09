import { useMemo, Suspense } from 'react';
import { BrowserRouter, RouteObject, useRoutes } from "react-router-dom";
import { Provider } from "react-redux";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import Path from 'global/path';
import theme from 'global/theme';
import useHandleIncomingMessage from 'hooks/useHandleIncomingMessage';
import { setupStore } from 'store';

import ErrorBoundry from 'components/ErrorBoundry'
import Spinner from 'components/Spinner';

import Home from 'pages/home';

const routes: RouteObject[] = [
  {
    path: Path.Home,
    element: <Home />,
  }
];

const RoutesConfig = () => {
  const element = useRoutes(routes);
  useHandleIncomingMessage();

  return element;
};

const App = () => {
  const store = useMemo(setupStore, []);

  return (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ErrorBoundry>
            <BrowserRouter>
              <Suspense fallback={<Spinner sx={{ height: '100vh', width: '100vw' }} />}>
                <RoutesConfig />
              </Suspense>
            </BrowserRouter>
          </ErrorBoundry>
        </ThemeProvider>
    </Provider>
  );
};

export default App;
