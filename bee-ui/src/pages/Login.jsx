import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../authService'
import { useAuth } from '../context/AuthContext'

export default function Login() {
    const { setUser } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        try {
            const response = await login({ email, password })
            setUser(response.data.user ?? response.data)
            navigate('/')
        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка входа')
        }
    }

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4 text-center">🔐 Вход в систему</h2>
            {error && <div className="text-red-600 mb-4">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
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
                </div>

                <button
                    type="submit"
                    className="w-full bg-slate-800 text-white py-2 rounded hover:bg-slate-700"
                >
                    Войти
                </button>
            </form>
        </div>
    )
}