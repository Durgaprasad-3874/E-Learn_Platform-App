import { createContext, useContext, useEffect, useState } from "react";

const LearningContext = createContext(null);

export function readStoredValue(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

export function LearningProvider({ children }) {
  const [enrolled, setEnrolled] = useState(() =>
    readStoredValue("skillup-enrolled", []),
  );
  const [progress, setProgress] = useState(() =>
    readStoredValue("skillup-progress", {}),
  );
  const [user, setUser] = useState(() =>
    readStoredValue("skillup-user", null),
  );

  useEffect(
    () => localStorage.setItem("skillup-enrolled", JSON.stringify(enrolled)),
    [enrolled],
  );
  useEffect(
    () => localStorage.setItem("skillup-progress", JSON.stringify(progress)),
    [progress],
  );
  useEffect(
    () => localStorage.setItem("skillup-user", JSON.stringify(user)),
    [user],
  );

  const enroll = (id) =>
    setEnrolled((current) =>
      current.includes(id) ? current : [...current, id],
    );
  const updateProgress = (id, value) =>
    setProgress((current) => ({
      ...current,
      [id]: Math.max(0, Math.min(100, value)),
    }));

  return (
    <LearningContext.Provider
      value={{ enrolled, progress, user, setUser, enroll, updateProgress }}
    >
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning() {
  return useContext(LearningContext);
}