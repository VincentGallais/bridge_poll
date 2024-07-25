import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { supabase } from '../lib/supabase';
import { Session, User } from '@supabase/supabase-js';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  isAuthenticated: boolean;
  userData: { bridge_level: string; country: string; role: string } | null;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isAuthenticated: false,
  userData: null,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [userData, setUserData] = useState<{ bridge_level: string; country: string; role: string } | null>(null);

  useEffect(() => {
    const fetchUserData = async (userId: string) => {
      const { data, error } = await supabase.from("userInformations").select("*").eq("user_id", userId).single();
      if (error) {
        console.error("Error fetching user data:", error);
        return;
      }
      setUserData(data);
    };

    const handleAuthChange = async (_event: string, session: Session | null) => {
      setSession(session);
      if (session?.user) {
        await fetchUserData(session.user.id);
      }
    };

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        await fetchUserData(session.user.id);
      } else {
        supabase.auth.signInAnonymously();
      }
    });

    supabase.auth.onAuthStateChange(handleAuthChange);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user,
        isAuthenticated: !!session?.user && !session.user.is_anonymous,
        userData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
