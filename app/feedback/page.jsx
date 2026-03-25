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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.message) {
      alert("El mensaje es obligatorio");
      return;
    }

    if (form.message.length < 5) {
      alert("El mensaje es muy corto");
      return;
    }

    if (!captchaToken) {
      alert("Verifica el captcha");
      return;
    }

    setLoading(true);

    try {
      // 🔐 VALIDAR CAPTCHA EN BACKEND
      const verify = await fetch("/api/verify-captcha", {
        method: "POST",
        body: JSON.stringify({ token: captchaToken }),
      });

      const data = await verify.json();

      if (!data.success) {
        throw new Error("Captcha inválido");
      }

      // ✅ INSERTAR EN SUPABASE
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

      setForm({
        name: "",
        email: "",
        type: "SUGGESTION",
        message: "",
      });
      setRating(0);
      setCaptchaToken(null);
    } catch (error) {
      console.error(error);
      alert("❌ Error enviando feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Enviar Feedback</h1>
        <p className="text-center text-gray-500 mb-6">
          Tu opinión nos ayuda a mejorar
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nombre */}
          <div>
            <label className="text-sm font-medium">Nombre (opcional)</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              placeholder="Tu nombre"
              className="w-full mt-1 p-3 border rounded-lg"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email (opcional)</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="tu@email.com"
              className="w-full mt-1 p-3 border rounded-lg"
            />
          </div>

          {/* Tipo */}
          <div>
            <label className="text-sm font-medium">Tipo</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg"
            >
              <option value="SUGGESTION">Sugerencia</option>
              <option value="BUG">Problema</option>
              <option value="OPINION">Opinión</option>
            </select>
          </div>

          {/* Mensaje */}
          <div>
            <label className="text-sm font-medium">Mensaje *</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Escribe tu mensaje..."
              className="w-full mt-1 p-3 border rounded-lg min-h-[120px]"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="text-sm font-medium">Calificación</label>
            <div className="flex gap-2 mt-2">
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
          </div>

          {/* CAPTCHA 🔐 */}
          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              onChange={(token) => setCaptchaToken(token)}
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            disabled={loading || !form.message || !captchaToken}
            className="w-full bg-[#000180] text-white py-3 rounded-lg hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Enviando..." : "Enviar Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
}
