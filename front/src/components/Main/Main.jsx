import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDelete } from '../../hooks/delete.hook'
import { useHttp } from '../../hooks/http.hook'
import Styles from './Main.module.css'

export const Main = () => {
    const { loading, request, API_URL } = useHttp()
    const [data, setData] = useState([])

    const { deleteHandler } = useDelete()

    useEffect(() => {
        let mounted = true
        try {
            if (mounted) {
                request(`${API_URL}`, "GET", null).then(result => {
                    setData(result)
                })
            }
        } catch (e) {}
        return () => mounted = false
    }, [request, API_URL])

    if (loading) {
        return (
            <div className="container">
                <div className="center">
                    <div className="loading"></div>
                </div>
            </div>
        )
    }

    if (data.length === 0) {
        return (
            <div className="container">
                <h2 style={{textAlign: "center", paddingTop: "30px"}}>Добавьте 3d модель!</h2>
            </div>
        )
    }

    return (
        <div className={Styles.main}>
            <div className="container">
                <div className={Styles.block}>
                    {
                        data.map(({ id, name, material, color }, i) => {
                            return (
                                <div key={ i } className={Styles.item}>
                                    <div className={Styles.text}>
                                        <h3 style={{ marginBottom: '20px' }}>
                                            {name !== null ? name.charAt(0).toUpperCase() + name.slice(1) : 'Not found'}
                                        </h3>
                                        <p>Материал: {material !== null ? material.charAt(0).toUpperCase() + material.slice(1) : 'Not found'}</p>
                                        <p>Цвет: {color !== null ? color : '---'}</p>
                                    </div>
                                    <div className={Styles.buttons}>
                                        <NavLink className={Styles.link} to={`/edit/${id}`}>
                                            <i className={`material-icons ${Styles.edit}`}>edit</i>
                                        </NavLink>
                                        <button onClick={() => {deleteHandler(id)}}>
                                            <i className={`material-icons ${Styles.delete}`}>delete</i>
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
