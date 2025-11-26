import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { LoginPage } from "../pages/Login/LoginPage";
import { AdminPage } from "../pages/Admin/AdminPage";
import { StudentPage } from "../pages/Student/StudentPage";
import { NotFoundPage } from "../pages/Errors/NotFoundPage";
import StudentsTest from "../pages/Student/StudentsTest";
import StudentTestPage from "../pages/Student/StudentTestPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {path: 'student/tests', element: <StudentsTest />},
            {path: 'student/test/:id', element: <StudentTestPage />},
            {path: 'login', element: <LoginPage />},
            {path: 'admin', element: <AdminPage />},
            {path: 'student', element: <StudentPage />},
            {path: "*", element: <NotFoundPage />},
        ],
    },
]);