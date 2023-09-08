import React, { FC, ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../utils/api'; 

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard: FC<AuthGuardProps> = ({ children }): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true); // NEW
  const [isPlan,setIsPlan]=useState<boolean | null>(true);

  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true); // NEW
      const token = window.localStorage.getItem('accessToken');
      if (!token) {
        setIsAuthenticated(false);
      } else {
        try {
          const response = await api.post('/auth/verify', { token });
          console.log('Response from /auth/verify:', response.data.plan);
          
          if (response.status === 200) {
            if(response.data.status===""){
              setIsPlan(false)
            }
            setIsAuthenticated(true);
          } else {
            window.localStorage.removeItem('accessToken');
            setIsAuthenticated(false);
          }
        } catch (err) {
          console.error(err);
          window.localStorage.removeItem('accessToken');
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false); // NEW
    };
    initialize();
  }, []); // Empty array means only run once on mount

  console.log('Is authenticated log outside useEffect:', isAuthenticated);
  
 // If we are loading or isAuthenticated is null, do not render anything
 if (isLoading || isAuthenticated === null) {
  return <></>; // or your loading spinner here
}

// If we are not authenticated, navigate to root.
if (!isAuthenticated) {
  return <Navigate to="/" />;
}

// check plan subscription 
// if(!isPlan){
//   return <Navigate to="/pic-plan" />;
// }


// If we are authenticated, render children.
return <>{children}</>;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default AuthGuard;
