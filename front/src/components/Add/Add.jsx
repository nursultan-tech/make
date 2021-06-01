import React, { useState } from 'react'
import Styles from './Add.module.css'
import { useHttp } from '../../hooks/http.hook'
import { useHistory } from 'react-router-dom'

export const Add = () => {
    const { request, loading, API_URL } = useHttp()
    const history = useHistory()
    const [form, setForm] = useState({
        name: '',
        author: '',
        price: ''
    })

    const postHandler = async () => {
        if (form.name !== '' && form.surname !== '' && form.salary !== '') {
            try {
                await request(
                    `${API_URL}/create`,
                    'POST',
                    { ...form }
                )
                alert('Добавлена 3d модель')
                history.push('/')
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

    const data = [
        { type: 'text', name: 'name', label: 'Название модели' },
        { type: 'text', name: 'material', label: 'Материал' },
        { type: 'text', name: 'color', label: 'Цвет' },
    ]

    return (
        <div className={Styles.add}>
            <div className="container">
                <div className={Styles.block}>
                    <h3 className={Styles.title}>
                        Добавить 3d модель
                    </h3>
                    <form action="#" className={Styles.body}>
                        {
                            data
                            ? data.map(({ type, name, label }, i) => {
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
                                onClick={e => {e.preventDefault(); postHandler()}}
                                className={loading ? 'loading' : Styles.submit}
                            >
                                Добавить
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
