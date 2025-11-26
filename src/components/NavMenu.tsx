import { Link, NavLink } from "react-router-dom";
import '../index.css'

export function NavMenu(){
    return (
        <nav>
            <NavLink 
                className={({isActive}) => (isActive ? 'active' : '')} 
                to="/login">Войти</NavLink>
            <NavLink 
                className={({isActive}) => (isActive ? 'active' : '')} 
                to="/admin" 
                state={{ some: 'value', filter:'completed', a: 'bbb' }}>Админ</NavLink>
            <NavLink 
                className={({isActive}) => (isActive ? 'active' : '')} 
                to="/student">Студент</NavLink>
            <Link to="/student/tests">tests</Link>
        </nav>
    )
}