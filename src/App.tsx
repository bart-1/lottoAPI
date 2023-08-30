import * as React from 'react';
import { LottoModel, lottoModel } from './lottoModel';
import './style.css';
import { useQuery } from './useQuery';



export default function App() {
  const { status, data } = useQuery<LottoModel>(
    'https://www.lotto.pl/api/lotteries/draw-results/by-gametype?game=Lotto&index=1&size=1&sort=drawDate&order=DESC', lottoModel
  );
  console.log(status);
  if (typeof data === "string") return <div>{data}</div>;

  if (status !== 'success' && !data) return <div>still loading...</div>;


const lottoResults = data?.items[0].results[0].resultsJson.map((el) => <span key={el}> {el} |</span>)
const lottoDate = new Date(data?.items[0].results[0].drawDate)
  return (
    <div>
      <h1>Lotto </h1>
      <h4>{lottoDate.getDate()} - {`0${lottoDate.getMonth()+1}`.slice(-2)} - {lottoDate.getFullYear()}</h4>
      <p>{lottoResults}</p>
    </div>
  );
}
