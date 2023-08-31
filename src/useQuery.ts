import * as React from 'react';

type Status = 'success' | 'loading' | 'fail';

export interface Query<T> {
  status: Status;
  data: T | Promise<T>;
  error: string;
}

export const useQuery = <T>(
  url: string,
  initialValue: Query<T>['data']
): Query<T> => {
  const [status, setStatus] = React.useState<Status>('loading');
  const [data, setData] = React.useState<Query<T>['data']>(initialValue);
  const [error, setError] = React.useState<Query<T>['error']>();

  React.useEffect(() => {
    query(url);
  }, []);

  React.useEffect(() => {
    query(url);
  }, [url]);

  const query = async (url: string) => {
    await fetch(url)
      .then((res) => {
        if (res.ok) {
          console.log(res);
          setData(res.json() as Query<T>['data']);
          setStatus('success');
        } else throw new Error('error');
      })
      .catch(() => {
        setError('connection problem');
      });
  };
  return { status: status, data: data, error: error } as const;
};
