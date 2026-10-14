import { Route, Routes, useLocation } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import { LearningProvider } from "../context/LearningContext";
import AuthPage from "../pages/AuthPage";
import CourseDetailsPage from "../pages/CourseDetailsPage";
import CoursesPage from "../pages/CoursesPage";
import HomePage from "../pages/HomePage";
import LearningPage from "../pages/LearningPage";
import NotFoundPage from "../pages/NotFoundPage";

export default function App() {
  const location = useLocation();

  return (
    <LearningProvider>
      <AppLayout>
        <div
          key={location.pathname}
          className="route-content motion-safe:animate-route-enter"
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:id" element={<CourseDetailsPage />} />
            <Route path="/learning" element={<LearningPage />} />
            <Route path="/login" element={<AuthPage mode="login" />} />
            <Route path="/register" element={<AuthPage mode="register" />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </AppLayout>
    </LearningProvider>
  );
}