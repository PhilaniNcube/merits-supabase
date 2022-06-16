import {
  createContext,
  useEffect,
  useState,
  useContext,
  Suspense,
} from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabase';
import axios from 'axios';

const Context = createContext();

const Provider = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState(supabase.auth.user());

  const signOut = async () => {
    let { error } = await supabase.auth.signOut();
    setUser(null);

    router.push('/');
  };

  const signIn = async (email, password) => {
    let { user, error } = await supabase.auth.signIn({
      email,
      password,
    });

    console.log({ user, error });

    if (error) {
      alert(error.message);
      return;
    }
    alert('you are now logged in');
    router.push('/home');
  };

  const signUp = async (email, password, username) => {
    let { user, error } = await supabase.auth.signUp({
      email,
      password,
      data: {
        username,
      },
    });

    if (error) {
      alert(error.message);
      return;
    }

    if (user) {
      router.push('/home');
    }
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange(async () => {
      setUser(supabase.auth.user());
    });
  }, []);

  useEffect(() => {
    axios.post('/api/set-supabase-cookie', {
      event: user ? 'SIGNED_IN' : 'SIGNED_OUT',
      session: supabase.auth.session(),
    });
  }, [user]);

  const exposed = {
    user,
    signOut,
    signIn,
    signUp,
  };

  return (
    <Suspense>
      <Context.Provider value={exposed}>{children}</Context.Provider>
    </Suspense>
  );
};

export const useUser = () => useContext(Context);

export default Provider;
