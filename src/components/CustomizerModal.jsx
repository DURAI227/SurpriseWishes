import React, { useState } from 'react';
import { Settings, X, Upload, Sparkles, RotateCcw, Image as ImageIcon, Check } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function CustomizerModal({ config, onUpdateConfig, onResetConfig }) {
  const [isOpen, setIsOpen] = useState(false);
  const [recipient, setRecipient] = useState(config.recipientName);
  const [sender, setSender] = useState(config.senderName);
  const [pin, setPin] = useState(config.secretPin);
  const [letter, setLetter] = useState(config.scene5.letterText);
  const [photos, setPhotos] = useState(config.scene6.photos);
  const [savedAlert, setSavedAlert] = useState(false);

  const handleOpen = () => {
    setRecipient(config.recipientName);
    setSender(config.senderName);
    setPin(config.secretPin);
    setLetter(config.scene5.letterText);
    setPhotos(config.scene6.photos);
    setIsOpen(true);
    sounds.playChime();
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newPhoto = {
          id: Date.now() + Math.random(),
          url: event.target.result,
          caption: "A special memory filled with smiles 🌸",
        };
        setPhotos((prev) => [newPhoto, ...prev]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (id) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSave = () => {
    const updated = {
      ...config,
      recipientName: recipient.trim() || config.recipientName,
      senderName: sender.trim() || config.senderName,
      secretPin: pin.trim() || config.secretPin,
      scene5: {
        ...config.scene5,
        letterText: letter,
      },
      scene6: {
        ...config.scene6,
        photos: photos.length > 0 ? photos : config.scene6.photos,
      },
    };

    onUpdateConfig(updated);
    sounds.playChime();
    setSavedAlert(true);
    setTimeout(() => {
      setSavedAlert(false);
      setIsOpen(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating Gear / Customize Trigger */}
      <button
        onClick={handleOpen}
        title="Customize Website Settings"
        aria-label="Customize settings"
        className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-white/90 text-pink-600 hover:text-pink-700 shadow-xl border border-pink-200 transition-all hover:scale-105 active:scale-95 group"
      >
        <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform" />
      </button>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-xl max-h-[90vh] overflow-hidden shadow-2xl border border-pink-100 flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 border-b border-pink-100 flex items-center justify-between bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-pink-100 rounded-xl text-pink-600">
                  <Sparkles className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="font-bold text-slate-800 text-base">Surprise Customizer</h3>
                  <p className="text-xs text-slate-500">Personalize names, passcode, letter & photos</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-sm">
              {savedAlert && (
                <div className="p-3 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs font-semibold">
                  <Check className="w-4 h-4" /> Changes saved successfully!
                </div>
              )}

              {/* Names row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Birthday Person Name
                  </label>
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 text-slate-800"
                    placeholder="e.g. Fawzia Banu"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name (Sender)
                  </label>
                  <input
                    type="text"
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 text-slate-800"
                    placeholder="e.g. Alex"
                  />
                </div>
              </div>

              {/* 6-digit Passcode */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Secret 6-Digit Passcode (Scene 1)
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                  className="w-40 px-3.5 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 text-slate-800 font-mono text-center tracking-widest text-base"
                  placeholder="011126"
                />
                <span className="ml-3 text-xs text-slate-400">Current code to unlock</span>
              </div>

              {/* Letter Content */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Personal Letter Content (Scene 5)
                </label>
                <textarea
                  rows={6}
                  value={letter}
                  onChange={(e) => setLetter(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 text-slate-800 text-xs leading-relaxed"
                />
              </div>

              {/* Photo Upload Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-pink-500" />
                    Personal Gallery Photos (Scene 6)
                  </label>
                  <label className="cursor-pointer text-xs font-semibold text-pink-600 hover:text-pink-700 flex items-center gap-1 bg-pink-50 hover:bg-pink-100 px-3 py-1.5 rounded-lg border border-pink-200 transition-colors">
                    <Upload className="w-3.5 h-3.5" /> Upload Photos
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>

                {/* Thumbnails grid */}
                <div className="grid grid-cols-4 gap-2.5 pt-1">
                  {photos.map((p) => (
                    <div key={p.id} className="relative group rounded-xl overflow-hidden aspect-square border border-pink-100 bg-pink-50">
                      <img src={p.url} alt="Memory" className="w-full h-full object-cover" />
                      <button
                        onClick={() => removePhoto(p.id)}
                        className="absolute top-1 right-1 bg-black/60 hover:bg-rose-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove photo"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="px-6 py-4 bg-slate-50 border-t border-pink-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  onResetConfig();
                  setIsOpen(false);
                }}
                className="text-xs text-slate-500 hover:text-rose-600 flex items-center gap-1.5 font-medium transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset to Defaults
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-200/70 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-xs font-semibold shadow-md shadow-pink-300/40 transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
