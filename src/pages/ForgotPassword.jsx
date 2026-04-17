import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { useToast } from "../contexts/ToastContext";
import "../style/login.css";

export default function ForgotPassword() {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await API.post("/auth/forgot-password", { email });
            setSuccess(true);
            showToast("Password reset link sent!");
        } catch (err) {
            showToast(err.response?.data?.error || "Failed to send reset email.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div style={{ textAlign: "center", marginBottom: "30px" }}>
                    <div style={{
                        width: "60px", height: "60px", background: "#e0e7ff",
                        borderRadius: "18px", display: "flex", alignItems: "center",
                        justifyContent: "center", margin: "0 auto 20px", color: "#4f46e5"
                    }}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M12 15V17M12 7V13M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" />
                        </svg>
                    </div>
                    <h2 style={{ fontSize: "28px", fontWeight: "900", color: "#0f172a" }}>Forgot Password?</h2>
                    <p style={{ color: "#64748b", marginTop: "8px", fontSize: "15px" }}>
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                </div>

                {success ? (
                    <div style={{ textAlign: "center", padding: "20px 0" }}>
                        <div style={{ fontSize: "48px", marginBottom: "16px" }}>📧</div>
                        <h3 style={{ color: "#16a34a", marginBottom: "12px" }}>Check your Email</h3>
                        <p style={{ color: "#64748b", marginBottom: "24px" }}>
                            We have sent a password reset link to <strong>{email}</strong>.
                        </p>
                        <button onClick={() => navigate("/login")} className="submit-button">
                            Back to Login
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="input-label">Email Address</label>
                            <input
                                className="input-field"
                                type="email"
                                placeholder="name@company.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button className="submit-button" type="submit" disabled={loading}>
                            {loading ? "Sending link..." : "Send Reset Link"}
                        </button>

                        <div style={{ textAlign: "center", marginTop: "24px" }}>
                            <span 
                                onClick={() => navigate("/login")} 
                                style={{ color: "#6366f1", cursor: "pointer", fontWeight: "600", fontSize: "14px" }}
                            >
                                ← Back to Login
                            </span>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
