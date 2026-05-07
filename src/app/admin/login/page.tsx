"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function AdminLoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/admin";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        router.push(redirect);
        router.refresh();
      } else {
        setError(data.error || "Wrong admin password");
      }
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="password"
          className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5"
        >
          Admin Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoFocus
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-gray-900 bg-gray-50 focus:bg-white transition-colors"
          placeholder="••••"
        />
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm px-3 py-2 rounded-md">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold py-2.5 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-colors disabled:opacity-50 shadow-sm"
      >
        {loading ? "Signing in…" : "Sign in as Admin"}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 items-center justify-center mb-4 shadow-lg shadow-amber-200">
            <svg
              className="w-7 h-7 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900">Admin Sign In</h1>
          <p className="text-sm text-gray-500 mt-1">
            BIG Hall Event Wiki — admin access
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <Suspense
            fallback={<div className="text-sm text-gray-400">Loading…</div>}
          >
            <AdminLoginForm />
          </Suspense>
        </div>

        <p className="text-xs text-gray-400 text-center mt-6">
          Trouble signing in? Contact Sharlene.
        </p>
      </div>
    </div>
  );
}
