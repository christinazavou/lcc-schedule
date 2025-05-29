import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactPage from "pages/contact/contact";
import { WebsiteLayout } from "layouts/WebsiteLayout";
import CalendarPage from "pages/calendar/calendar";
import "./index.css";
import { AuthProvider } from "contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router future={{ v7_relativeSplatPath: true }}>
        <Routes>
          <Route element={<WebsiteLayout />}>
            <Route path="/" element={<CalendarPage />} />
            <Route path="/schedule/" element={<CalendarPage />} />
            <Route path="/contact/" element={<ContactPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
