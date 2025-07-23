import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import RootLayout from "../layouts/RootLayout";

// Pages

import CoverBot from "../pages/Main/CoverBot";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root `/` to `/login` */}
        <Route path="/" element={<Navigate to="/cover-bot" replace />} />

        <Route element={<RootLayout />}>
          <Route path="/cover-bot" element={<CoverBot />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
