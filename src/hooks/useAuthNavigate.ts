import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { message } from 'antd';

export function useAuthNavigate() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      message.warning('您未登录，请先登录。');
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return { isLoggedIn };
}