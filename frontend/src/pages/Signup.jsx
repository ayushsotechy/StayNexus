import { useState } from 'react';
import GoogleLoginButton from '../components/GoogleLoginButton';
import Navbar from '../components/Navbar';


function Signup() {
  const [hostelName, setHostelName] = useState('');
  const [roomNumber, setRoomNumber] = useState('');

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <Navbar />
      <div className="max-w-xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-extrabold mb-4 text-center">Create Your StayNexus Account</h1>
        <p className="text-gray-300 mb-8 text-center">
          Enter your hostel details, then continue with Google to finish signup.
        </p>

        <div className="space-y-4 bg-[#111827] border border-white/10 rounded-xl p-6 mb-8">
          <div>
            <label htmlFor="hostelName" className="block text-sm text-gray-300 mb-1">Hostel Name</label>
            <select
              id="hostelName"
              value={hostelName}
              onChange={(e) => setHostelName(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-[#1f2937] border border-gray-600"
            >
              <option value="">Select hostel</option>
              {['ABH', 'NDPG', 'APJ', 'BCH', 'VMH', 'VVS', 'HJB', 'JCB', 'CVR', 'VLB'].map((hostel) => (
                <option key={hostel} value={hostel}>{hostel}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="roomNumber" className="block text-sm text-gray-300 mb-1">Room Number</label>
            <input
              id="roomNumber"
              type="text"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              placeholder="e.g. B-214"
              className="w-full px-3 py-2 rounded-md bg-[#1f2937] border border-gray-600"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <GoogleLoginButton mode="signup" signupData={{ hostelName, roomNumber }} />
        </div>
      </div>
    </div>
  );
}

export default Signup;
