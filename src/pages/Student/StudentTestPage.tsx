import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../index.css'
import styled from '@emotion/styled';

const TestItem = styled.li`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    padding: 16px 16px;
    border: 1px solid #EFEFEF;
    border-radius: ${p => p.theme.radius.md};
    box-shadow: 0px 1px 2px 0px #0000000D;
`;

const Option = styled.li`
    display: flex;
    align-items: flex-start;
    width: 800px;
    margin: 8px;
    justify-content: space-between;
    padding: 16px 16px;
    background-color: white;
    border-radius: ${p => p.theme.radius.md};
`;

export default function StudentTestPage() {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    console.log('Bывести_MACCИB', questions);
    const params = useParams();
    const testId = Number(params.id);

    useEffect(() => {
        const data = '/public/data/questions.json';
        let ignore = false;

        fetch(data)
            .then(response => {
                if(!response.ok) throw new Error ('HTTP: ${response.status}');
                return response.json()
            })
            .then(all => {
                if (ignore) return;
                const filteredQuestions = all.filter(q => q.testId === testId);
                setQuestions(filteredQuestions);})
            .catch(e => {
                setError(e.message);
                if (ignore) return;})
            .finally (() => setLoading(false))
        return () => {ignore = true};
    }, [testId]);



    const filteredQuestions = questions.filter(q => q.testId === testId);
   // if (loading) return <div> className="custom-loader"</div>;

    return (
        <div>
            <h2>StudentTestPage {params.id}</h2>
            <p>Lorom ipsum-dolor</p>
            {loading && <div className="custom-loader"></div>}
            {error && <div>{error}</div>}
            <ul>
                {filteredQuestions.map(q => (
                <TestItem key={q.id}>
                    <h3>{q.text}</h3>
                    
                    {q.type === 'multiple' && (
                        <ul>
                            {q.options.map((o, i) => (
                                <Option key={i}>
                                    <label>
                                        <input type="checkbox" name={`q-${q.id}`} />
                                        {o}
                                    </label>
                                </Option>
                            ))}
                        </ul>
                    )}
                    
                    {q.type === 'single' && (
                        <ul>
                            {q.options.map((o, i) => (
                                <Option key={i}>
                                    <label>
                                        <input type="radio" name={`q-${q.id}`} />
                                        {o}
                                    </label>
                                </Option>
                            ))}
                        </ul>
                    )}
                </TestItem>
                ))}
                {filteredQuestions.length === 0 && <li>Вопросы не найдены</li>}
            </ul>
        </div>
    );
}