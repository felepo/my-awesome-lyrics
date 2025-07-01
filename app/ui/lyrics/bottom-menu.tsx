'use client';

interface BottomMenuProps {
  fontSize: number;
  bgColor: string;
  onFontSizeChange: (delta: number) => void;
  onBgColorChange: (color: string) => void;
}

export default function BottomMenu({ 
  fontSize, 
  bgColor, 
  onFontSizeChange, 
  onBgColorChange 
}: BottomMenuProps) {
  return (
    <div className="fixed bottom-0 left-0 w-full z-10 bg-white/90 backdrop-blur flex justify-center items-center gap-6 py-4 shadow-lg border-t">
      {/* Font size controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onFontSizeChange(-2)}
          className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-lg"
          aria-label="Disminuir tamaño de fuente"
        >
          A-
        </button>
        <span className="font-medium">{fontSize}px</span>
        <button
          onClick={() => onFontSizeChange(2)}
          className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-lg"
          aria-label="Aumentar tamaño de fuente"
        >
          A+
        </button>
      </div>
      {/* Background color picker */}
      <div className="flex items-center gap-2">
        <label htmlFor="bgColor" className="font-medium">Fondo:</label>
        <input
          id="bgColor"
          type="color"
          value={bgColor}
          onChange={e => onBgColorChange(e.target.value)}
          className="w-8 h-8 p-0 border-0 bg-transparent cursor-pointer"
          aria-label="Cambiar color de fondo"
        />
      </div>
    </div>
  );
} 