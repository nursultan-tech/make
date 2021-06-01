import React, { useState } from 'react'
import Styles from './Edit.module.css'
import { useHttp } from '../../hooks/http.hook'
// import { useHistory } from 'react-router-dom'

export const Edit = ({data}) => {

    const { request, loading, API_URL } = useHttp()
    // const history = useHistory()
    const [form, setForm] = useState({
        name: data.name,
        author: data.author,
        price: data.price
    })


    const updateHandler = async (id) => {
        if (form.name !== '' && form.author !== '' && form.price !== '') {
            try {
                alert('Данные о 3d модель изменены')
                await request(
                    `${API_URL}/update/${id}`,
                    'PUT',
                    { ...form }
                )
                // successMessage('Данные о рабочем изменены')
                // history.push('/')
            } catch (e) {
                alert(e)
            }
        } else {
            alert('Поля не должны быть пустыми!')
        }
    }

    const changeHandler = e => {     
        setForm({ 
            ...form, [e.target.name]: e.target.value
        })
    }

    const createForm = [
        { type: 'text', name: 'name', label: 'Название модели' },
        { type: 'text', name: 'material', label: 'Материал' },
        { type: 'text', name: 'color', label: 'Цвет' },
    ]

    return (
        <div className={Styles.edit}>
            <div className="container">
                <div className={Styles.block}>
                    <h3 className={Styles.title}>
                        Изменить 3d модель
                    </h3>
                    <form action="#" className={Styles.body}>
                        {
                            createForm
                            ? createForm.map(({ type, name, label }, i) => {
                                return (
                                    <input
                                        key={ i }
                                        type={type}
                                        className={Styles.input}
                                        name={name}
                                        placeholder={label}
                                        autoComplete="off"
                                        onChange={changeHandler}
                                    />
                                )
                            }) : ''
                        }
                        <div className={Styles.button}>
                            <button
                                type="submit"
                                onClick={e => {e.preventDefault(); updateHandler(data.id)}}
                                className={loading ? 'loading' : Styles.submit}
                            >
                                Изменить
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
