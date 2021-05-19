import React, {useEffect, useState} from "react";

export const useContacts = () => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        setIsLoading(true)

        const getContacts = async () => {
            try {
                const response = await fetch(`https://randomuser.me/api/?results=20`)
                const { results, error } = await response.json()
                if (error) {
                    throw new Error(error)
                }
                setData(results)
                setIsError(false)
            } catch (e) {
                setIsError(true)
            } finally {
                setIsLoading(false)
            }
        }
        getContacts()
    }, [])

    return {
        isLoading,
        isError,
        data
    }
}