import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { Student } from "../layouts/StudentLayout";
import { Admin } from "../layouts/AdminLayout";
import { Login } from "../pages/Login/Login";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {path: 'login', element: <Login />},
            {path: 'admin', element: <Admin />},
            {path: 'student', element: <Student />},
        ],
    },
]);