import styled from '@emotion/styled';
import { NavLink, Outlet } from 'react-router-dom';
import { ProfileIcon, StatsIcon, TestsIcon } from '../icons/icons';

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 240px 1fr;
    height: 100vh;
`;

const Aside = styled.aside`
    border-radius: ${p => p.theme.radius.md};
    background-color: #fff;
    padding: 30px 16px;
`;

const Main = styled.main`
    border-radius: ${p => p.theme.radius.md};
    background-color: #fbfbfb;
`;

const Nav = styled.nav`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Item = styled(NavLink)`
    padding: 10px;
    display: flex;
    gap: 10px;
    align-items: center;
    border: none;
    color: inherit;
    transition: all 0.3s ease;
    text-decoration: none;

    &:hover,
    &:focus,
    &.active {
        color: #0e73f6;
        background-color: #e8f5ff;
        border-radius: 10px;
    }
`;

export function StudentLayout() {
    return (
        <Wrapper>
            <Aside>
                <Nav>
                    <Item
                        to="/student/tests"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        <TestsIcon />
                        Тестирования
                    </Item>

                    <Item
                        to="/student/statistics"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        <StatsIcon />
                        Статистика
                    </Item>

                    <Item
                        to="/student/profile"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        <ProfileIcon />
                        Профиль
                    </Item>
                </Nav>
            </Aside>
            <Main>
                <Outlet />
            </Main>
        </Wrapper>
    );
}