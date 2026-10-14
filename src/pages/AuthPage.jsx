import {
  ArrowRight,
  BookOpen,
  CircleHelp,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { readStoredValue, useLearning } from "../context/LearningContext";

export default function AuthPage({ mode }) {
  const isLogin = mode === "login";
  const { setUser } = useLearning();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function submit(event) {
    event.preventDefault();
    if (!email.includes("@") || password.length < 4) {
      setError("Enter a valid email and a password with at least 4 characters.");
      return;
    }
    if (!isLogin && !name.trim()) {
      setError("Please enter your name.");
      return;
    }

    const savedUsers = readStoredValue("skillup-users", []);
    let account = savedUsers.find(
      (savedUser) => savedUser.email.toLowerCase() === email.toLowerCase(),
    );
    if (!isLogin) {
      if (account) {
        setError("An account with this email already exists. Try logging in.");
        return;
      }
      account = { name: name.trim(), email };
      localStorage.setItem(
        "skillup-users",
        JSON.stringify([...savedUsers, account]),
      );
    } else if (!account) {
      account = { name: email.split("@")[0], email };
    }
    setUser(account);
    navigate("/");
  }

  return (
    <div className="auth-layout">
      <div className="auth-visual">
        <div className="auth-visual-brand">
          <span className="brand-mark">
            <BookOpen size={21} />
          </span>{" "}
          skill<span className="brand-accent">up</span>
        </div>
        <div className="auth-art-symbol">✦</div>
        <h2>
          Curiosity looks
          <br />
          good on you.
        </h2>
        <p>
          Discover skills, unlock your potential, and build a future you're
          excited about.
        </p>
        <div className="auth-testimonial">
          <div className="proof-avatars">
            <span>👩🏻</span>
            <span>👨🏽</span>
            <span>👩🏾</span>
          </div>
          <span>
            <strong>Loved by learners</strong>
            <small>One lesson can change everything.</small>
          </span>
        </div>
      </div>
      <div className="auth-form-wrap">
        <div className="auth-form">
          <div className="eyebrow">
            {isLogin ? "WELCOME BACK" : "START SOMETHING GOOD"}
          </div>
          <h1>{isLogin ? "Sign in to SkillUp" : "Create your account"}</h1>
          <p>
            {isLogin
              ? "Your next lesson is waiting for you."
              : "Join a community of curious, growing learners."}
          </p>
          <form onSubmit={submit}>
            {!isLogin && (
              <label className="form-field">
                Full name
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                  required
                />
              </label>
            )}
            <label className="form-field">
              Email address
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </label>
            <label className="form-field">
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="At least 4 characters"
                autoComplete={isLogin ? "current-password" : "new-password"}
                required
                minLength={4}
              />
            </label>
            {error && <div className="form-error">{error}</div>}
            <button className="btn btn-primary full-btn" type="submit">
              {isLogin ? "Sign in" : "Create account"} <ArrowRight size={16} />
            </button>
          </form>
          <div className="auth-switch">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <Link to={isLogin ? "/register" : "/login"}>
              {isLogin ? "Create one" : "Sign in"}
            </Link>
          </div>
          <div className="demo-note">
            <CircleHelp size={15} /> Demo authentication only. Never use a real
            password.
          </div>
        </div>
      </div>
    </div>
  );
}