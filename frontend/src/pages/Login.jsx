import GoogleLoginButton from '../components/GoogleLoginButton';
import Navbar from '../components/Navbar';
import { useNavigate, Link } from 'react-router-dom';


function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <Navbar />
      <div className="max-w-xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-extrabold mb-4">Welcome Back</h1>
        <p className="text-gray-300 mb-8">
          Continue with Google. If your account is new, you will be redirected to signup first.
        </p>
        <div className="flex flex-col items-center gap-4">
          <GoogleLoginButton mode="login" onSignupRequired={() => navigate('/signup')} />
          <Link to="/attendant/login" className="text-sm text-indigo-400 hover:underline mt-4">
            Are you an attendant? Login here.
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
