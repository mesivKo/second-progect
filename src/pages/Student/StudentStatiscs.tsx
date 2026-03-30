
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/useStore';




export const StudentStatiscs = observer(() => {

  const counter = useStore().counterStore;
  const {value, increment, decrement, reset} = counter;
  //const studentData = useStore().studentStore;
  //const resultTest = useStore().resultTestStore;

  return (
    <div>
      <h1>Статистика студента</h1>
      <p>Значение: {value}</p>
      <button onClick={() => increment()}>Увеличить</button>
      <button onClick={() => decrement()} >Уменьшить</button >
      <button onClick={() => reset()}> Сбросить</button >
    </div >
  );
})