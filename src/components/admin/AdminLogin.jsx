import { EyeClosed, EyeIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [responseMessage, setResponseMessage] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setResponseMessage(null);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/v1/api/admin-login`, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.status === 200) {
                localStorage.setItem('authToken', `token ${data.token}`);
                navigate('/admin/partners');
            }
            else setResponseMessage(data.message);

        } catch (error) {
            setResponseMessage('Error: ' + error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100"
            style={{
                backgroundImage: "url('/images/signup.png')",
                backgroundRepeat: "no-repeat, no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover, contain",
            }}
        >
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">

                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">ADMIN LOGIN</h2>
                {responseMessage && <div className='bg-red-200 py-1 pl-4 rounded-lg text-red-800'>{responseMessage}</div>}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value.toLowerCase())}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-2 flex items-center text-sm text-gray-600"
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeClosed /> : <EyeIcon />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}