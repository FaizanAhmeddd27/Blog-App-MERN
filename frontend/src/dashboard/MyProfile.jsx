import React from 'react';
import { useAuth } from '../context/AuthProvider';

const MyProfile = () => {
  const { profile } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 py-6 flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto h-[calc(100vh-3rem)] flex flex-col justify-between bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-blue-200/50">
          <div className="relative h-40 md:h-56 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute top-4 left-4 w-16 h-16 bg-blue-300/30 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-4 right-4 w-12 h-12 bg-blue-200/40 rounded-full blur-lg animate-bounce"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-blue-400/20 rounded-full blur-2xl animate-spin-slow"></div>
          </div>

          <div className="relative px-4 sm:px-6 py-6 flex flex-col items-center space-y-6">
            <div className="relative -mt-16 sm:-mt-20">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200">
                {profile?.photo?.url ? (
                  <img
                    src={profile.photo.url}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600">
                    <svg className="w-12 h-12 sm:w-16 sm:h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full border-2 border-white shadow-md animate-pulse">
                <div className="w-full h-full bg-green-400 rounded-full animate-ping"></div>
              </div>
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-blue-800">{profile?.name || 'Your Name'}</h2>
              <p className="text-blue-600 text-base sm:text-lg font-medium">{profile?.role || 'User'}</p>
              <p className="text-blue-700 text-sm sm:text-base max-w-xs sm:max-w-md mx-auto leading-relaxed">
                {profile?.bio || 'Welcome to your profile! Here you can view and manage your personal information.'}
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-4 sm:p-6 border border-blue-200/50 w-full">
              <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-4 text-center">Contact Info</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-blue-600 font-medium">Email</p>
                    <p className="text-blue-800 font-semibold">{profile?.email || 'your.email@example.com'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-blue-600 font-medium">Phone</p>
                    <p className="text-blue-800 font-semibold">{profile?.phoneNo || '+1 (555) 123-4567'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-4 right-4 w-10 h-10 bg-blue-200/30 rounded-full blur-md animate-float"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 bg-blue-300/40 rounded-full blur-sm animate-float-slow"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add custom animations
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);
styleSheet.insertRule(`
  @keyframes float {
    0% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0); }
  }
`, styleSheet.cssRules.length);
styleSheet.insertRule(`
  @keyframes float-slow {
    0% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
    100% { transform: translateY(0); }
  }
`, styleSheet.cssRules.length);

export default MyProfile;