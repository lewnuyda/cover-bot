import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import RootLayout from "../layouts/RootLayout";

// Pages

import CoverBot from "../pages/Main/CoverBot";
import LandingPage from "../pages/Main/LandingPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root `/` to `/login` */}
        <Route path="/" element={<Navigate to="/landing-page" replace />} />

        <Route element={<RootLayout />}>
          <Route path="/cover-bot" element={<CoverBot />} />
          <Route path="/landing-page" element={<LandingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
