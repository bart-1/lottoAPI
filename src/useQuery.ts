import * as React from 'react';

type Status = 'success' | 'loading' | 'fail';

export interface Query<T> {
  status: Status;
  data:  T | string | Promise<T>;
}

export const useQuery = <T>(url: string, initialValue:Query<T>["data"]): Query<T> => {
  const [status, setStatus] = React.useState<Status>('loading');
  const [data, setData] = React.useState<Query<T>['data']>();

  React.useEffect(() => {
    setData(initialValue);
    const apiData:Query<T>['data'] = query();
  }, []);

  React.useEffect(() => {
    const apiData:Query<T>['data'] = query();
  }, [url]);


  const query = async <T,>():Promise<T> => {
    const response = await fetch(url)
      .then((res) => res.json() as Promise<T>)
      .then(res => {setStatus('success');return res})
      .catch((err) => {
        return "connection problem";
      });
    
    

    return response as T;
  };
  return { status: status, data: data } as const;
};
