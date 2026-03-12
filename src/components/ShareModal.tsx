import React, { useState } from 'react';
import { Icons } from './Icons';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title?: string;
}

const ShareModal: React.FC<Props> = ({ isOpen, onClose, url, title }) => {
  const [copyMsg, setCopyMsg] = useState('');

  if (!isOpen) return null;

  const shareText = `${title ? title + ' - ' : ''}Echa un vistazo: ${url}`;

  const canNativeShare = typeof navigator !== 'undefined' && 'share' in navigator;

  const handleNativeShare = async () => {
    if (!canNativeShare) return;
    try {
      await (navigator as any).share({ title, text: shareText, url });
      onClose();
    } catch (err: any) {
      // If user cancelled, no need to show error. Otherwise display a small message.
      if (err && err.name !== 'AbortError') {
        console.error('Native share failed', err);
        setCopyMsg('No se pudo abrir el diálogo nativo');
        setTimeout(() => setCopyMsg(''), 3000);
      }
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopyMsg('Enlace copiado');
      setTimeout(() => setCopyMsg(''), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
      setCopyMsg('No se pudo copiar');
      setTimeout(() => setCopyMsg(''), 2500);
    }
  };

  const handleWhatsApp = () => {
    const wa = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    try {
      const newWin = window.open(wa, '_blank', 'noopener,noreferrer');
      if (!newWin) {
        // Popup blocked — show fallback message so user can copy the link
        setCopyMsg('El navegador bloqueó la apertura. Copia el enlace manualmente.');
        setTimeout(() => setCopyMsg(''), 3000);
      } else {
        newWin.focus();
        onClose();
      }
    } catch (err) {
      console.error('Failed to open WhatsApp', err);
      setCopyMsg('No se pudo abrir WhatsApp');
      setTimeout(() => setCopyMsg(''), 3000);
    }
  };

  const handleEmail = () => {
    const mailto = `mailto:?subject=${encodeURIComponent(title || 'Mira esto')}&body=${encodeURIComponent(shareText)}`;
    window.location.href = mailto;
  };

  const handleOpen = () => {
    try {
      const newWin = window.open(url, '_blank', 'noopener,noreferrer');
      if (!newWin) {
        setCopyMsg('El navegador bloqueó la apertura. Copia el enlace manualmente.');
        setTimeout(() => setCopyMsg(''), 3000);
      } else {
        newWin.focus();
        onClose();
      }
    } catch (err) {
      console.error('Failed to open link', err);
      setCopyMsg('No se pudo abrir la pestaña');
      setTimeout(() => setCopyMsg(''), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-[14000] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-oksap-primary/20 border border-oksap-navy/30 rounded-2xl shadow-xl w-[90%] max-w-md p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-oksap-navy">Compartir {title ? `— ${title}` : ''}</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-oksap-primary/30 text-oksap-navy">
            <Icons.X size={20} />
          </button>
        </div>

        <p className="text-sm text-oksap-accent mb-4">Comparte tu portfolio rápidamente:</p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {canNativeShare ? (
            <>
              <button type="button" onClick={handleNativeShare} className="flex items-center gap-2 p-3 rounded-lg border border-oksap-navy/30 text-oksap-navy hover:shadow-sm hover:bg-oksap-primary/25">
                <Icons.Share2 size={18} />
                <span>Abrir diálogo nativo</span>
              </button>

              <button type="button" onClick={handleCopy} className="flex items-center gap-2 p-3 rounded-lg border border-oksap-navy/30 text-oksap-navy hover:shadow-sm hover:bg-oksap-primary/25">
                <Icons.Copy size={18} />
                <span>Copiar enlace</span>
              </button>
            </>
          ) : (
            <>
              <button type="button" onClick={handleCopy} className="flex items-center gap-2 p-3 rounded-lg border border-oksap-navy/30 text-oksap-navy hover:shadow-sm hover:bg-oksap-primary/25">
                <Icons.Copy size={18} />
                <span>Copiar enlace</span>
              </button>

              <button type="button" onClick={handleWhatsApp} className="flex items-center gap-2 p-3 rounded-lg border border-oksap-navy/30 text-oksap-navy hover:shadow-sm hover:bg-oksap-primary/25">
                <Icons.Message size={18} />
                <span>WhatsApp</span>
              </button>
            </>
          )}

          <button type="button" onClick={handleEmail} className="flex items-center gap-2 p-3 rounded-lg border border-oksap-navy/30 text-oksap-navy hover:shadow-sm hover:bg-oksap-primary/25">
            <Icons.Mail size={18} />
            <span>Email</span>
          </button>

          <button type="button" onClick={handleOpen} className="flex items-center gap-2 p-3 rounded-lg border border-oksap-navy/30 text-oksap-navy hover:shadow-sm hover:bg-oksap-primary/25">
            <Icons.ExternalLink size={18} />
            <span>Abrir en pestaña</span>
          </button>
        </div>

        <div className="flex items-center justify-between">
          <button onClick={handleOpen} className="text-sm text-oksap-navy font-bold">Abrir en pestaña</button>
          <div className="text-sm text-oksap-accent">{copyMsg}</div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
