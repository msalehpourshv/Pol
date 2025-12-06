import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InvoiceListPage from './routes/InvoiceListPage';
import InvoiceEditPage from './routes/InvoiceEditPage';
import { AuthProvider, RequireAuth } from '@pol/auth-react';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter basename="/">
        <Routes>
          <Route
            path="/app/sale/invoices"
            element={
              <RequireAuth>
                <InvoiceListPage />
              </RequireAuth>
            }
          />
          <Route
            path="/app/sale/invoices/new"
            element={
              <RequireAuth>
                <InvoiceEditPage />
              </RequireAuth>
            }
          />
          <Route
            path="/app/sale/invoices/:id"
            element={
              <RequireAuth>
                <InvoiceEditPage />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
