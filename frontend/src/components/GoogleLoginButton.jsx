import { useEffect } from 'react';
import { googleLogin } from '../api/auth';
import { useNavigate } from 'react-router-dom';
  
function GoogleLoginButton({ mode = 'login', signupData = null, onSignupRequired = null }) {
  const navigate = useNavigate();

  // define handler before SDK initialize so reference exists
  const handleCredentialResponse = async (response) => {
    try {
      const cred = response?.credential;
      if (!cred) {
        console.error('No credential in Google response', response);
        return;
      }

      if (mode === 'signup') {
        if (!signupData?.hostelName || !signupData?.roomNumber) {
          alert('Please enter hostel name and room number before Google signup.');
          return;
        }
      }

      const data = await googleLogin(
        cred,
        mode === 'signup'
          ? { mode: 'signup', hostelName: signupData.hostelName, roomNumber: signupData.roomNumber }
          : { mode: 'login' }
      );

      if (data?.token){
        localStorage.setItem('token', data.token);
        // notify other components that auth state changed
        try { window.dispatchEvent(new Event('auth-changed')); } catch(e){}
        navigate('/');
      }
    } catch (err) {
      if (err?.code === 'SIGNUP_REQUIRED') {
        if (onSignupRequired) {
          onSignupRequired();
        } else {
          navigate('/signup');
        }
        return;
      }

      console.error('Google login failed:', err);
      alert(err.message || 'Google login failed');
    }
  };

  useEffect(() => {
    if (!window.google || !window.google.accounts) return;

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });

    const container = document.getElementById('google-signin');
    if (!container) return;

    container.innerHTML = '';
    window.google.accounts.id.renderButton(container, {
      theme: 'outline',
      size: 'large',
      width: 260,
    });
  }, [mode, navigate, onSignupRequired, signupData]);

  return <div id="google-signin"></div>;
}

export default GoogleLoginButton;
