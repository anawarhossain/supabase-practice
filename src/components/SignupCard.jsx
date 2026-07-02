"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignupCard() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Invalid email";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 8) errs.password = "At least 8 characters";
    return errs;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    try {
      // Replace with your API call
      // await fetch("/api/auth/signup", { method: "POST", body: JSON.stringify(form) });

      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());

      //   await fetch(`http://localhost:5000/api/email-send`, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(data),
      //   });

      console.log(data);

      await new Promise((r) => setTimeout(r, 1200));
      setDone(true);
    } catch {
      setErrors({ _form: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  }

//   if (done) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#050505]">
//         <div className="rounded-3xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl p-10 text-center max-w-sm w-full mx-4">
//           <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 text-2xl">
//             ✓
//           </div>
//           <h2 className="text-2xl font-medium text-neutral-200 tracking-tight mb-2">
//             Welcome, {form.name}!
//           </h2>
//           <p className="text-neutral-500 text-sm mb-6">
//             Your account has been created.
//           </p>
//           <button
//             onClick={() => {
//               setDone(false);
//               setForm({ name: "", email: "", password: "" });
//             }}
//             className="w-full h-12 rounded-xl bg-white text-black text-sm font-semibold hover:bg-neutral-200 transition-colors"
//           >
//             Done
//           </button>
//         </div>
//       </div>
//     );
//   }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative rounded-3xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl p-8 md:p-10 max-w-sm w-full mx-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-linear-to-r from-transparent via-orange-500 to-transparent rounded-full" />

        <div className="mb-8">
          <h1 className="text-2xl font-medium text-neutral-200 tracking-tight">
            Create account
          </h1>
          <p className="text-neutral-500 text-sm mt-1">Get started for free.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-medium text-neutral-400 uppercase tracking-widest mb-1.5"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              className={`w-full h-12 px-4 rounded-xl bg-white/5 border text-sm text-neutral-200 placeholder:text-neutral-600 outline-none transition-colors focus:border-orange-500/50 ${errors.name ? "border-red-500/50" : "border-white/10"}`}
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-neutral-400 uppercase tracking-widest mb-1.5"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className={`w-full h-12 px-4 rounded-xl bg-white/5 border text-sm text-neutral-200 placeholder:text-neutral-600 outline-none transition-colors focus:border-orange-500/50 ${errors.email ? "border-red-500/50" : "border-white/10"}`}
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-medium text-neutral-400 uppercase tracking-widest mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className={`w-full h-12 px-4 pr-12 rounded-xl bg-white/5 border text-sm text-neutral-200 placeholder:text-neutral-600 outline-none transition-colors focus:border-orange-500/50 ${errors.password ? "border-red-500/50" : "border-white/10"}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors text-xs"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {errors._form && (
            <p className="text-red-400 text-xs text-center">{errors._form}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 mt-2 rounded-xl bg-white text-black text-sm font-semibold hover:bg-neutral-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="text-neutral-500 text-xs text-center mt-6">
          Already have an account?{" "}
          <Link
            href="/#"
            className="text-orange-500 hover:text-orange-400 transition-colors"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
