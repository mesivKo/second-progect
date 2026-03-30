import { useLocation, useNavigate, useParams } from "react-router-dom"
import { TimerBox } from "../../components/ui/TimerBox";
import { Activity, useEffect } from "react";

export function StudentResultPage() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const state = location.state;

    useEffect(() => {
        if (!state) {
            navigate(`/student/tests`, {
                replace: true
            });
        }
    }, []);

    if (!state) return null;


    const { user, max, resultTime, attemptsAllowed } = state;

    const takeTheTestAgain = () => (
        navigate(`/student/test/${id}`, {
            replace: true,
        })
    )

    return (
        <div>
            <header>Test {id}</header>
            <div>
                <div>
                    баллы {user}/{max}
                </div>
                <TimerBox durationSec={resultTime} finished />
                <div>Осталось попыток: {attemptsAllowed}</div>
            </div>
            <Activity mode={attemptsAllowed != 0 ? 'visible':'hidden'}>
            <button onClick={takeTheTestAgain}>Пройти заново</button>
            </Activity>
        </div>
    );
}