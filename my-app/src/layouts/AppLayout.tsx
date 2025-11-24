import { Outlet } from 'react-router-dom';
import { NavMenu } from '../components/NavMenu';

export function AppLayout() {
    return (
        <div>
            <main>
                <NavMenu />
                <Outlet />
            </main>
            <footer>2025</footer>
        </div>
    );

}