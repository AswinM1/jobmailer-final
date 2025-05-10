import React from 'react';
import { SignIn } from '@clerk/clerk-react';

function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-950">
         <div className="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,_rgba(255,255,255,0.03)_1px,_transparent_1px),_linear-gradient(to_bottom,_rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[size:40px_40px]" />
      <SignIn  />
    </div>
  );
}

export default Login;
