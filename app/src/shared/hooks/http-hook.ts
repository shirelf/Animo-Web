import { useState, useCallback, useRef, useEffect } from 'react'
import axios, { AxiosRequestConfig } from 'axios';
export const serverAPIPort = 3000;
export const host = 'http://localhost'
export const APIRootPath = `${host}:${serverAPIPort}`
export const staticsPort = 3001;
export const staticsUrl = `${host}:${staticsPort}/`;


export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState(undefined);
    const [error, setError] = useState(undefined);
    // const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(async (params: AxiosRequestConfig) => {
        params.baseURL = `${APIRootPath}`;
        setIsLoading(true);

        try {
            const result = await axios.request(params);
            setResponse(result.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const clearError = () => {
        setError(undefined);
    };

    // useEffect(()=> {
    //     return () => {
    //         activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
    //     };
    // }, [])

    return { isLoading: isLoading, response, error, sendRequest, clearError };
}