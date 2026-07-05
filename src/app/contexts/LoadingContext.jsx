"use client";
import { createContext, useContext } from "react";

const LoadingContext = createContext(null);

export const LoadingProvider = ({ children, isLoading }) => {
  return (
    <LoadingContext.Provider value={{ isLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
};
