"use client";

interface SectionModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function SectionModal({ children, onClose }: SectionModalProps) {
  return (
    <div className="relative bg-white/10 text-white rounded-xl p-6 pt-10 max-w-xl w-full border border-white/20 shadow-lg overflow-hidden">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-xs bg-white/20 px-2 py-1 rounded hover:bg-white/40 z-10"
      >
        ✕ Close
      </button>
      {children}
    </div>
  );
}
