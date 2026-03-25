"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star } from "lucide-react";

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl shadow-2xl rounded-2xl border-0">
        <CardContent className="p-8">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-800">
              💬 Enviar Feedback
            </h1>
            <p className="text-gray-500 mt-2">
              Tu opinión nos ayuda a mejorar la plataforma
            </p>
          </div>

          <form className="space-y-5">
            {/* Nombre */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Nombre (opcional)
              </label>
              <Input placeholder="Tu nombre" className="mt-1" />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email (opcional)
              </label>
              <Input type="email" placeholder="tu@email.com" className="mt-1" />
            </div>

            {/* Tipo */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Tipo de feedback
              </label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecciona una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="suggestion">Sugerencia</SelectItem>
                  <SelectItem value="bug">Reportar problema</SelectItem>
                  <SelectItem value="opinion">Opinión</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Mensaje */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Mensaje
              </label>
              <Textarea
                placeholder="Escribe tu sugerencia o problema..."
                className="mt-1 min-h-[120px]"
              />
            </div>

            {/* Rating */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Calificación (opcional)
              </label>
              <div className="flex gap-2 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={28}
                    className={`cursor-pointer transition ${
                      (hover || rating) >= star
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                  />
                ))}
              </div>
            </div>

            {/* Botón */}
            <Button className="w-full mt-4 text-lg rounded-xl">
              Enviar Feedback 🚀
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
