# Sistema de Diseño Visual Mutante - "The Cube Spin"

## 🎲 El Concepto Core: "Girar el Cubo"
La aplicación no tiene un diseño estático. Cada vez que el usuario inicia la app o cambia de sección principal, el sistema selecciona de forma **aleatoria** una de las **6 caras del cubo de Rubik** como la "Cara Activa". 

Cada cara funciona como un submundo visual con su propio color de acento, su propio patrón de fondo temático y su paleta de contraste calibrada.

---

## 🎨 Las 6 Identidades Visuales (Las Caras)

### 1. Cara Azul (The Blue Grid)
* **Vibe:** Tecnológico, nocturno, subacuático.
* **Fondo:** Micro-cuadrados sutiles en degradé usando tonos oscuros (`bg-blue-950` combinando patrones geométricos con `bg-slate-900`).
* **Texto Principal:** `text-zinc-100`
* **Acentos y Destacados:** `text-cyan-400` / `bg-blue-600`

### 2. Cara Roja (The Red Alert)
* **Vibe:** Agresivo, velocidad pura, arcade, alta energía.
* **Fondo:** Base gris ultra oscura (`bg-neutral-950`) con destellos o sutiles líneas de escaneo láser en rojo profundo (`bg-red-950/20`).
* **Texto Principal:** `text-white`
* **Acentos y Destacados:** `text-red-500` / `bg-red-700`

### 3. Cara Verde (The Matrix Loop)
* **Vibe:** Enfoque, zen, terminal de código de los 90.
* **Fondo:** Fondo negro puro (`bg-black`) con una grilla digital muy sutil en tonos verde botella.
* **Texto Principal:** `text-zinc-200`
* **Acentos y Destacados:** `text-green-400` / `bg-green-600`

### 4. Cara Naranja (The Neon Sunset)
* **Vibe:** Retro-futurista, synthwave, cálido.
* **Fondo:** Combinación de `bg-stone-950` con gradientes radiales que imitan un resplandor naranja neón apagado en las esquinas.
* **Texto Principal:** `text-stone-100`
* **Acentos y Destacados:** `text-orange-500` / `bg-orange-600`

### 5. Cara Amarilla (The Electric Volt)
* **Vibe:** Alta visibilidad, industrial, contracorriente.
* **Fondo:** Base gris ceniza (`bg-zinc-900`) con bloques de alto contraste.
* **Texto Principal:** `text-zinc-50`
* **Acentos y Destacados:** `text-yellow-400` / `bg-yellow-500`

### 6. Cara Blanca (The Pure Speed)
* **Vibe:** Quirófano, minimalismo escandinavo, modo luz de competencia.
* **Fondo:** Fondo limpio y brillante (`bg-zinc-50`) con tarjetas blancas puras y sombras sutiles que imitan las pegatinas (*stickers*) del cubo.
* **Texto Principal:** `text-zinc-900`
* **Acentos y Destacados:** `text-blue-600` / `bg-zinc-200`

---

## 🛠️ Arquitectura Técnica de Implementación (Para Antigravity/Cursor)

Para que esto funcione de forma profesional sin duplicar código en React, la app usará un **Contexto Global de Estado** (`CubeFaceContext`) o una propiedad inyectada en el diseño principal (`Layout`).

### Estructura del Objeto de Configuración
```typescript
export interface CubeFaceTheme {
  id: 'U' | 'D' | 'F' | 'B' | 'L' | 'R'; // Notación oficial de speedcubing
  colorName: 'white' | 'yellow' | 'green' | 'blue' | 'red' | 'orange';
  bgClass: string;         // Clase de fondo o patrón de Tailwind
  cardClass: string;       // Estilo de los contenedores
  textClass: string;       // Color del texto principal
  accentClass: string;     // Color de botones activos / cronómetro
}