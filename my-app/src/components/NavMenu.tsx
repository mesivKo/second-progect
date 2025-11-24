import { Link } from "react-router-dom";

export function NavMenu(){
    return (
        <nav>
            <Link to="/login">Войти</Link>
            <Link to="/admin">Админ</Link>
            <Link to="/student">Студент</Link>
        </nav>
    )
}