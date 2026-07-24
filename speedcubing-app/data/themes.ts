// data/themes.ts

export interface CubeTheme {
    color: 'azul' | 'rojo' | 'verde' | 'naranja' | 'amarillo' | 'blanco';
    bg: string;
    card: string;
    text: string;
    accent: string;
    algoBg: string;
}

export const CUBE_THEMES: CubeTheme[] = [
    {
        color: 'azul',
        bg: 'bg-blue-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900 via-zinc-950 to-black',
        card: 'bg-blue-900/10 border-blue-800/40 hover:border-blue-500/30 text-blue-100',
        text: 'text-blue-100',
        accent: 'bg-blue-600 text-white hover:bg-blue-500 border-blue-400',
        algoBg: 'bg-blue-950/90 border-blue-900 text-cyan-400'
    },
    {
        color: 'rojo',
        bg: 'bg-neutral-950 bg-[linear-gradient(to_bottom,_rgba(220,38,38,0.05),_transparent)]',
        card: 'bg-red-950/10 border-red-900/30 hover:border-red-500/30 text-neutral-200',
        text: 'text-neutral-200',
        accent: 'bg-red-600 text-white hover:bg-red-500 border-red-400',
        algoBg: 'bg-zinc-950 border-red-950 text-red-400'
    },
    {
        color: 'verde',
        bg: 'bg-black bg-[linear-gradient(to_right,#00ff0005_1px,transparent_1px),linear-gradient(to_bottom,#00ff0005_1px,transparent_1px)] bg-[size:24px_24px]',
        card: 'bg-zinc-900/30 border-green-900/30 hover:border-green-500/30 text-zinc-300',
        text: 'text-zinc-300',
        accent: 'bg-green-600 text-white hover:bg-green-500 border-green-400',
        algoBg: 'bg-black border-green-950 text-green-400'
    },
    {
        color: 'naranja',
        bg: 'bg-stone-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-950/30 via-stone-950 to-black',
        card: 'bg-orange-900/10 border-orange-950 hover:border-orange-500/30 text-orange-100',
        text: 'text-orange-100',
        accent: 'bg-orange-600 text-white hover:bg-orange-500 border-orange-400',
        algoBg: 'bg-zinc-950 border-orange-950 text-orange-400'
    },
    {
        color: 'amarillo',
        bg: 'bg-zinc-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-950/20 via-zinc-950 to-black',
        card: 'bg-yellow-950/10 border-yellow-900/30 hover:border-yellow-500/30 text-zinc-200',
        text: 'text-zinc-200',
        accent: 'bg-yellow-500 text-zinc-950 hover:bg-yellow-400 border-yellow-300 font-bold',
        algoBg: 'bg-zinc-900/80 border-yellow-950 text-yellow-400'
    },
    {
        color: 'blanco',
        bg: 'bg-zinc-50',
        card: 'bg-white border-zinc-200 hover:border-zinc-300 shadow-sm text-zinc-800',
        text: 'text-zinc-900',
        accent: 'bg-zinc-200 text-zinc-800 hover:bg-zinc-300 border-zinc-300 font-bold',
        algoBg: 'bg-zinc-100 border-zinc-200 text-blue-600 font-bold'
    }
];

// Función clave: Elige una cara del cubo al azar cada vez que se llama
export const getRandomTheme = (): CubeTheme => {
    const randomIndex = Math.floor(Math.random() * CUBE_THEMES.length);
    return CUBE_THEMES[randomIndex];
};