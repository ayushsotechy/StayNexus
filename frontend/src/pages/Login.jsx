import GoogleLoginButton from '../components/GoogleLoginButton';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';


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
        <div className="flex justify-center">
          <GoogleLoginButton mode="login" onSignupRequired={() => navigate('/signup')} />
        </div>
      </div>
    </div>
  );
}

export default Login;
