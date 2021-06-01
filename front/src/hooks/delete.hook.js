import { useCallback } from "react"
import { useHttp } from "./http.hook"
import { useHistory } from "react-router-dom"

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

export const useDelete = () => {
    toast.configure({
        autoClose: 3000,
        draggable: true
    })

    const { request, API_URL } = useHttp()
    const history = useHistory()

    const deleteHandler = useCallback(async (id) => {

        const pass = window.confirm("Вы уверенны?")
        if (pass) {
            await request(`${API_URL}/delete/${id}`, "DELETE").catch(() => {
                alert("Данные о 3d модель удалены")
                history.push('/add')
                history.push('/')
            })
        } else {
            alert("Удаление отменено")
        }

    }, [request, API_URL, history])

    return { deleteHandler }
}