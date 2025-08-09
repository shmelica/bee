import React, { useState } from 'react';
import { register, login, getMe, logout } from '../authService';

export default function TestAuth() {
    const [output, setOutput] = useState('');
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
        try {
            const res = await register(form);
            setOutput(`Зарегистрирована: ${res.data.name}`);
        } catch (err) {
            setOutput(JSON.stringify(err.response?.data ?? err, null, 2));
        }
    };

    const handleLogin = async () => {
        try {
            const res = await login({
                email: form.email,
                password: form.password,
            });
            setOutput(`Залогинена: ${res.data.name ?? 'успешно'}`);
        } catch (err) {
            setOutput(JSON.stringify(err.response?.data ?? err, null, 2));
        }
    };

    const handleMe = async () => {
        try {
            const res = await getMe();
            setOutput(`Ты: ${res.data.email}`);
        } catch (err) {
            setOutput(JSON.stringify(err.response?.data ?? err, null, 2));
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            setOutput('Выход выполнен');
        } catch (err) {
            setOutput(JSON.stringify(err.response?.data ?? err, null, 2));
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">Тест Авторизации</h2>

            <div className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Имя"
                    className="w-full px-4 py-2 border rounded-md"
                    value={form.name}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 border rounded-md"
                    value={form.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    className="w-full px-4 py-2 border rounded-md"
                    value={form.password}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password_confirmation"
                    placeholder="Подтвердите пароль"
                    className="w-full px-4 py-2 border rounded-md"
                    value={form.password_confirmation}
                    onChange={handleChange}
                />
            </div>

            <div className="flex justify-between gap-2">
                <button
                    onClick={handleRegister}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
                >
                    Регистрация
                </button>
                <button
                    onClick={handleLogin}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
                >
                    Логин
                </button>
            </div>

            <div className="flex justify-between gap-2">
                <button
                    onClick={handleMe}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-md"
                >
                    Кто я?
                </button>
                <button
                    onClick={handleLogout}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md"
                >
                    Логаут
                </button>
            </div>

            <pre className="text-sm bg-gray-100 p-3 rounded-md overflow-auto whitespace-pre-wrap">
        {output}
      </pre>
        </div>
    );
}