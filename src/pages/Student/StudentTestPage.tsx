import { useEffect, useMemo, useState } from 'react';
import '../../index.css'
import { TestCard } from '../../components/tests/TestCard';
import styled from '@emotion/styled';
import type { Attempt, TestResult } from '../../types/testing';
import { Loader } from '../../components/ui/Loader';

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
`;

export default function StudentTestPage() {
    const [attempts, setAttempts] = useState<Attempt[]>([]);
    const [tests, setTests] = useState<TestResult[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    useEffect(() => {
        const tests = '/public/data/tests.json';
        const attempts = '/public/data/attempts.json';
        Promise.all([fetch(tests), fetch(attempts)])
            .then(async ([res1, res2]) => {
                if (!res1.ok) throw new Error(`HTTP: ${res1.status}`);
                if (!res2.ok) throw new Error(`HTTP: ${res2.status}`);

                const t = await res1.json();
                const a = await res2.json();

                setTests(t);
                setAttempts(a);
                return Promise.all([t, a]);
            })
            .catch(e => {
                setError(e.message);
                // error
            })
            .finally(() => setLoading(false));
    }, []);

    const lastAttemptByTest = useMemo(() => {
        const testAt = new Map();
        const result = attempts.filter(att => att.userId === 1);

        for (const value of result) {
            testAt.set(value.testId, value);
        }

        return testAt;
    }, [attempts]);

    if (loading) return <Loader />;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;
    

    return (
        <div className="page-container">
            <h1>Тестирование №100</h1>
            <Grid>
                {tests.map(test => (
                    <TestCard 
                        key={test.id} 
                        test={test}
                        lastAttempt = {lastAttemptByTest.get(test.id)}
                    />
                ))}
            </Grid>
        </div>
    );
}