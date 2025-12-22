import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { LoginPage } from "../pages/Login/LoginPage";
import { AdminPage } from "../pages/Admin/AdminPage";
import { StudentPage } from "../pages/Student/StudentPage";
import { NotFoundPage } from "../pages/Errors/NotFoundPage";
import StudentsTest from "../pages/Student/StudentsTest";
import StudentTestPage from "../pages/Student/StudentTestPage";
import { StudentLayout } from "../layouts/StudentLayout";
import { AdminLayout } from "../layouts/AdminLayout";
import { StudentProfilePage } from "../pages/Student/StudentProfilePage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {path: 'login', element: <LoginPage />},
            {
                path: 'student',
                element: <StudentLayout />,
                children: [
                    {index: true, element: <StudentPage />},
                    {path: 'tests', element: <StudentsTest />},
                    {path: 'test/:id', element: <StudentTestPage />},
                    {
                    path: 'statistics',
                        element: <h2>Student statistics</h2>,
                    },
                    {
                        path: 'profile',
                        element: <StudentProfilePage />,
                    }
                ],
            },

            {
                path: 'admin',
                element: <AdminLayout />,
                children: [
                    {index: true, element: <AdminPage />},
                    {path: 'settings', element: <h2>Admin  settings</h2>},
                ],
            },
            {path: "*", element: <NotFoundPage />},
        ],
    },
]);