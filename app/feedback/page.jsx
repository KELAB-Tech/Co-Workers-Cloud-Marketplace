"use client";

import { supabase } from "@/lib/supabase";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    type: "SUGGESTION",
    message: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrorMsg("");
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    if (!form.message) return "El mensaje es obligatorio";
    if (form.message.length < 5) return "El mensaje es muy corto";

    if (form.email && !isValidEmail(form.email)) return "El email no es válido";

    if (!form.type) return "Selecciona un tipo";

    if (!captchaToken) return "Verifica el captcha";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setLoading(true);

    try {
      // 🔐 validar captcha en backend
      const verify = await fetch("/lib/api/verify-captcha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: captchaToken }),
      });

      const data = await verify.json();

      if (!data.success) throw new Error("Captcha inválido");

      // 💾 insertar en supabase
      const { error } = await supabase.from("feedback").insert([
        {
          name: form.name || null,
          email: form.email || null,
          type: form.type,
          message: form.message,
          rating: rating || null,
        },
      ]);

      if (error) throw error;

      alert("✅ Feedback enviado");

      // reset
      setForm({
        name: "",
        email: "",
        type: "SUGGESTION",
        message: "",
      });
      setRating(0);
      setCaptchaToken(null);
      setErrorMsg("");
    } catch (error) {
      console.error(error);
      setErrorMsg("Error enviando feedback");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled =
    loading || !form.message || form.message.length < 5 || !captchaToken;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Enviar Feedback</h1>
        <p className="text-center text-gray-500 mb-6">
          Tu opinión nos ayuda a mejorar
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nombre */}
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nombre (opcional)"
            className="w-full p-3 border rounded-lg"
          />

          {/* Email */}
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email (opcional)"
            className="w-full p-3 border rounded-lg"
          />

          {/* Tipo */}
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          >
            <option value="SUGGESTION">Sugerencia</option>
            <option value="BUG">Problema</option>
            <option value="OPINION">Opinión</option>
          </select>

          {/* Mensaje */}
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Escribe tu mensaje..."
            className="w-full p-3 border rounded-lg min-h-[120px]"
          />

          {/* Rating */}
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <span
                key={n}
                onClick={() => setRating(n)}
                className={`cursor-pointer text-2xl ${
                  rating >= n ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>

          {/* CAPTCHA 🔐 */}
          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              onChange={(token) => setCaptchaToken(token)}
            />
          </div>

          {/* Error */}
          {errorMsg && (
            <p className="text-red-500 text-sm text-center">{errorMsg}</p>
          )}

          {/* Botón */}
          <button
            type="submit"
            disabled={isDisabled}
            className="w-full bg-[#000180] text-white py-3 rounded-lg hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Enviando..." : "Enviar Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
}
