import * as React from 'react';
import { LottoModel, lottoModel } from './lottoModel';
import './style.css';

type Status = 'success' | 'loading' | 'fail';

type Query<T> = {
  status: Status;
  data: T;
};

const useQuery = <T,>(url: string) => {
  const [status, setStatus] = React.useState<Status>('loading');
  const [data, setData] = React.useState<T>();

  React.useEffect(() => {
    query();
  }, []);
  
   const query = async() => {
    const response = await fetch(url)
    .then((res) => {
      if (!res.ok) {
        setStatus('fail');
        throw Error('no data');
      } else return res.json() as Promise<T>;
    })
    .then((res) => {
      setStatus('success');
      setData(res);
        return res;
      });

  }
  return { status: status, data: data } as const;
};

export default function App() {
  const [lotto, setLotto] = React.useState<Query<LottoModel>>();
  const { status, data } = useQuery<Query<LottoModel>>(
    'https://www.lotto.pl/api/lotteries/draw-results/by-gametype?game=Lotto&index=1&size=1&sort=drawDate&order=DESC'
  );
  console.log(status);
  if (status !== 'success') return '';

  const lottoResults = lotto.data.items.map((el) => (
    <li>{el.drawDate + ':' + el.gameType + ':' + el.results[0]}</li>
  ));
  return (
    <div>
      <h1>Lotto</h1>
      <p>{lottoResults}</p>
    </div>
  );
}
