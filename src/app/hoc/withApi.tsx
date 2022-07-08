import React, { useEffect, useState } from 'react'
import ErrorLine from '../components/ErrorLine/ErrorLine';
import SmallLoading from '../components/SmallLoading/SmallLoading';

export function withApi<T>(Component: React.ComponentType<T>, errMsg: string, fetchAPi: (data?: any) => Promise<any>, fetchData?: any) {
    const NewComponent = (props: T) => {

        const [loading, setLoading] = useState(true);
        const [error, setError] = useState("");
        const [data, setData] = useState<any>(null);

        useEffect(() => {
            setLoading(true);
            setData(null);
            setError("");

            if (fetchData) {
                fetchAPi(fetchData)
                    .then(res => {
                        setData(res.data);
                    })
                    .catch(err => {
                        setError(errMsg);
                    })
                    .finally(() => {
                        setLoading(false);
                    })
            } else {
                fetchAPi()
                    .then(res => {
                        setData(res.data);
                    })
                    .catch(err => {
                        setError(errMsg);
                    })
                    .finally(() => {
                        setLoading(false);
                    })
            }
        }, [])

        return (
            loading ?
                <SmallLoading color="white" />
                :
                error ?
                    <ErrorLine msg={error} />
                    :
                    <Component {...(props as T)} apiData={data} />
        )
    };

    return NewComponent;
}
