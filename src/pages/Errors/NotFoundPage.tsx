import { useNavigate } from "react-router-dom";

export function NotFoundPage() {
    const navigate = useNavigate();


    return (
        <div>
            <h1>404</h1>
            <p>Страница не найдена</p>
           <button onClick={() => navigate(-1)}> Go Back </button>
        </div>
    );
}