"use client";

interface SectionModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function SectionModal({ children, onClose }: SectionModalProps) {
  return (
    <div className="relative bg-white/10 text-white rounded-xl p-6 pt-10 max-w-xl md:max-w-2xl w-full border border-white/20 shadow-xl backdrop-blur-lg fade-in">
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-3 right-3 text-lg bg-white/20 px-3 py-1 rounded-md hover:bg-white/30 transition"
      >
        ×
      </button>
      {children}
    </div>
  );
}
