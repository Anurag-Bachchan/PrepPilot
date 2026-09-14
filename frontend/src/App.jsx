import { useState } from 'react'
import { RouterProvider } from "react-router";
import { router } from './app_routes.jsx';
import { AuthProvider } from './Features/Auth/auth_context.jsx';
import { InterviewProvider } from './Features/Interview/interview_context.jsx';
import { ToastProvider } from './Shared/toast_context.jsx';

function App() {

  return (
    <>
      <ToastProvider>
        <AuthProvider>
          <InterviewProvider>
              <RouterProvider router={router}/>
          </InterviewProvider>
        </AuthProvider>
      </ToastProvider>
    </>
  )
}

export default App
