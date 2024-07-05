import { useEffect, useState } from 'react'
import toast from "react-hot-toast"

const useGetConversations = () => {

    const [loading, setLoading] = useState()
    const [conversations, setConversations] = useState([])

    useEffect(() => {
        const getConversations = async () => {
            try {

                const response = await fetch(`/api/users`)

                const data = await response.json()

                if (!response.ok) {
                    return toast.error(data.message)
                }

                setConversations(data)
            } catch (e) {
                toast.error(e.message);
            } finally {
                setLoading(false);
            }
        }

        getConversations()
    }, [])

    return { loading, conversations }

}

export default useGetConversations