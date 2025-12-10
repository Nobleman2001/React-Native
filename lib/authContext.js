import { createContext, useEffect, useState } from "react";
import { ID } from "react-native-appwrite";
import { account } from "./appwrite";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    checkExistingSession();
  }, []);

  const checkExistingSession = async () => {
    try {
      const currentUser = await account.get();
      setUser(currentUser);
      console.log(currentUser);
    } catch (error) {
      console.log(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email, password) => {
    try {
      await account.create({
        userId: ID.unique(),
        email: email,
        password: password,
      });
      await signIn(email, password);
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    }
  };

  const signIn = async (email, password) => {
    try {
      try {
        const currentSession = await account.getSession({
          sessionId: "current",
        });
        if (currentSession) {
          await account.deleteSession({
            sessionId: "current",
          });
        }
      } catch (error) {
        console.log(error);
      }

      // Create new session
      await account.createEmailPasswordSession({
        email: email,
        password: password,
      });
      const currentUser = await account.get();
      setUser(currentUser);
      console.log(currentUser);
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await account.deleteSession({
        sessionId: "current",
      });
      setUser(null);
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  };

  //  handle cart delete
  const handleCartItemDelete = (id) => {
    setCartItems((prev) => prev.filter((p) => p.$id !== id));
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    cartItems,
    setCartItems,
    handleCartItemDelete,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
