import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {login, register} from "../authService.js";

export default function Register() {
    const { setUser } = useAuth()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')
    const [error, setError] = useState(null)
    const [fieldErrors, setFieldErrors] = useState({})

    const handleSubmit = async (e) => {

        e.preventDefault()
        setError(null)

        try {
            const response = await register({ name, email, password, password_confirmation })
            await login({ email, password })
            setUser(response.data.user ?? response.data)
            navigate('/')
        } catch (err) {
            const response = err.response?.data
            setError(response?.message || 'Ошибка регистрации')
            setFieldErrors(response?.errors || {})
        }
    }

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4 text-center">🔐 Регистрация</h2>
            {error && <div className="text-red-600 mb-4">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Имя</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                    {fieldErrors.name && (
                        <div className="text-sm text-red-600 mt-1">
                            {fieldErrors.name.join(', ')}
                        </div>
                    )}
                </div>

                <div>
                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                    {fieldErrors.email && (
                        <div className="text-sm text-red-600 mt-1">
                            {fieldErrors.email.join(', ')}
                        </div>
                    )}
                </div>

                <div>
                    <label className="block mb-1">Пароль</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                    {fieldErrors.password && (
                        <div className="text-sm text-red-600 mt-1">
                            {fieldErrors.password.join(', ')}
                        </div>
                    )}
                </div>

                <div>
                    <label className="block mb-1">Подтверждение пароля</label>
                    <input
                        type="password"
                        value={password_confirmation}
                        onChange={e => setPasswordConfirmation(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                    {fieldErrors.password_confirmation && (
                        <div className="text-sm text-red-600 mt-1">
                            {fieldErrors.password_confirmation.join(', ')}
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-slate-800 text-white py-2 rounded hover:bg-slate-700"
                >
                    Зарегистрироваться
                </button>
            </form>
        </div>
    )
}