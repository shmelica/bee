import {Link, useNavigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { logout as apiLogout } from '../authService'

export default function Header() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await apiLogout()
        logout()
        navigate('/login')
    }

    return (
        <header className="bg-slate-800 text-white px-6 py-4 flex justify-between items-center">
            <h1 className="text-lg font-bold">🐝 BeeApp</h1>
            <nav className="space-x-4">
                <Link to="/" className="hover:underline">Главная</Link>

                {!user ? (
                    <>
                        <Link to="/login" className="hover:underline">Логин</Link>
                        <Link to="/register" className="hover:underline">Регистрация</Link>
                    </>
                ) : (
                    <>
                        <span className="text-sm">Привет, {user.name || user.email}</span>
                        <button onClick={handleLogout} className="hover:underline">
                            Выйти
                        </button>
                    </>
                )}
            </nav>
        </header>
    )
}