import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (options) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     setLoading(true)
    //     setData(null);
    //     setError(null);
    //     const source = axios.CancelToken.source();
    //     axios.get(url, { cancelToken: source.token })
    //     .then(res => {
    //         setLoading(false);
    //         // check multiple responses here
    //         res.data.content && setData(res.data.content);
        
    //     })
    //     .catch(err => {
    //         setLoading(false)
    //         setError(err)
    //     })
    //     return () => {
    //         source.cancel();
    //     }

    // }, [url])

     useEffect(() => {
        let abort = new AbortController();
        setLoading(true)
        setData(null)
        setError(null)
      
        
        axios.request(options).then(function (response) {
            console.log(response.data);
            setData(response.data)
            setLoading(false)
        }).catch(function (error) {
            setLoading(false)
            setError(error)
            console.error(error);
        });
        return () => {
            abort?.abort()

        }


    }, [])


    return {data, loading, error};
}
 
export default useFetch;