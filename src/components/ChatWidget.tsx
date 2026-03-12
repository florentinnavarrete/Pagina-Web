
import React, { useState, useRef, useEffect } from 'react';
import { Icons } from './Icons';
import { sendMessageToGemini } from '../services/geminiService';
import type { ChatMessage } from '../types';
import { Sender } from '../types';
// Import assistant avatars from src/assets so bundler resolves them correctly
import eliasImg from '../assets/Elias1.png';
import claraImg from '../assets/Clara.png';
import sandraImg from '../assets/Sandra.png';
import { GenerateContentResponse } from '@google/genai';
import { COMPANY_INFO } from '../constants';
import AnimatedImage from './AnimatedImage';

// Define Assistant Type
interface Assistant {
  id: string;
  name: string;
  avatar: string;
}

const ASSISTANTS: Assistant[] = [
  { id: 'elias', name: 'Elias', avatar: eliasImg },
  { id: 'clara', name: 'Clara', avatar: claraImg },
  { id: 'sandra', name: 'Sandra', avatar: sandraImg },
];

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAssistant, setSelectedAssistant] = useState<Assistant | null>(null);
  const [input, setInput] = useState('');
  
  // Initial empty state, welcome message is set when assistant is chosen
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, selectedAssistant]);

  // Handle assistant selection
  const handleSelectAssistant = (assistant: Assistant) => {
    setSelectedAssistant(assistant);
    setMessages([
      {
        id: 'welcome',
        text: `Hola, soy ${assistant.name}. ¿En qué puedo ayudarte?`,
        sender: Sender.MODEL,
        timestamp: new Date()
      }
    ]);
  };

  // Handle sending messages to AI
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      sender: Sender.USER,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Prepare history for API
      const history = messages.map(m => ({
        role: m.sender === Sender.MODEL ? 'model' as const : 'user' as const,
        parts: [{ text: m.text }]
      }));

      const streamResponse = await sendMessageToGemini(userMsg.text, history);
      
      const modelMsgId = (Date.now() + 1).toString();
      // Initialize empty model message
      setMessages(prev => [...prev, {
        id: modelMsgId,
        text: '',
        sender: Sender.MODEL,
        timestamp: new Date()
      }]);

      let fullText = '';

      for await (const chunk of streamResponse) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
            fullText += c.text;
            setMessages(prev => prev.map(msg => 
                msg.id === modelMsgId ? { ...msg, text: fullText } : msg
            ));
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: "Lo siento, hubo un error de conexión. Por favor intenta más tarde.",
        sender: Sender.MODEL,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Prevent scrolling on body when mobile chat is open
  useEffect(() => {
    if (window.innerWidth < 640) {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Determine launcher avatar (Default to Elias image import, otherwise use selected)
  const launcherAvatar = selectedAssistant ? selectedAssistant.avatar : eliasImg;

  // Render message content: remove markdown asterisks/bullets and replace placeholders with clickable labels
  const renderMessageContent = (msg: ChatMessage) => {
    // Clean text: remove asterisks, bullets, and punctuation after placeholders
    const sanitize = (text: string) => {
      return text
        .replace(/\*/g, '') // remove asterisks
        // Remove punctuation (. , ; :) that appears right after closing bracket ]
        .replace(/\]([.,;:])\s*/g, '] ')
        .split('\n')
        .map(line => line.replace(/^\s*[-•]\s*/, '').trim())
        .filter(Boolean);
    };

    // Clean the message text before processing
    const cleanedText = msg.text
      .replace(/\*/g, '')
      .replace(/\]([.,;:])\s*/g, '] ');

    // If contains placeholders, render anchors with proper labels
    if (cleanedText.includes('[LINKEDIN]') || cleanedText.includes('[WEBSITE]') || cleanedText.includes('[EMAIL]') || cleanedText.includes('[SOCIAL:')) {
      const tokens = cleanedText.split(/(\[LINKEDIN\]|\[WEBSITE\]|\[EMAIL\]|\[SOCIAL:[^\]]+\])/);
      const websiteUrl = COMPANY_INFO.website;
      const websiteLabel = (websiteUrl || '').replace(/^https?:\/\//, '').replace(/\/$/, '');

      return (
        <div>
          {tokens.map((token, i) => {
            const nextToken = tokens[i + 1];
            const isNextPlaceholder = nextToken && /^(\[LINKEDIN\]|\[WEBSITE\]|\[EMAIL\]|\[SOCIAL:[^\]]+\])$/.test(nextToken);
            // Skip labels ending with ':' if next token is a placeholder
            if (isNextPlaceholder && /:\s*$/.test(token.trim())) {
              return null;
            }

            if (token === '[LINKEDIN]') {
              const social = COMPANY_INFO.socials.find((s: any) => s.id === 'linkedin');
              if (social) {
                const IconComp: any = Icons.Linkedin;
                return (
                  <div key={i}>
                    <a href={social.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                      <span className="w-5 h-5" style={{ color: 'var(--oksap-silver-hex)' }}><IconComp size={18} /></span>
                      <span className="text-oksap-navy font-medium underline">{social.name}</span>
                    </a>
                  </div>
                );
              }
            }
            if (token === '[WEBSITE]') {
              return (
                <div key={i}>
                  <a href={websiteUrl} target="_blank" rel="noopener noreferrer" title={`${websiteLabel} - web`} className="inline-flex items-center gap-2">
                    <span className="w-5 h-5" style={{ color: 'var(--oksap-silver-hex)' }}><Icons.Globe size={16} /></span>
                    <span className="text-oksap-navy font-medium underline">{websiteLabel}</span>
                  </a>
                </div>
              );
            }
            if (token === '[EMAIL]') {
              return (
                <div key={i}>
                  <a href={`mailto:${COMPANY_INFO.email}`} title={`Enviar email a ${COMPANY_INFO.email}`} className="inline-flex items-center gap-2">
                    <span className="w-5 h-5" style={{ color: 'var(--oksap-silver-hex)' }}><Icons.Mail size={16} /></span>
                    <span className="text-oksap-navy font-medium underline">{COMPANY_INFO.email}</span>
                  </a>
                </div>
              );
            }
            const socialMatch = token.match(/^\[SOCIAL:([^\]]+)\]$/);
            if (socialMatch) {
              const id = socialMatch[1];
              const social = COMPANY_INFO.socials.find((s: any) => s.id === id);
              if (social) {
                const IconComp: any = (
                  id === 'linkedin' ? Icons.Linkedin :
                  id === 'instagram' ? Icons.Instagram :
                  id === 'x' ? Icons.XIcon :
                  id === 'tiktok' ? Icons.TikTok :
                  Icons.Globe
                );
                return (
                  <div key={i}>
                    <a href={social.url} target="_blank" rel="noopener noreferrer" title={social.name} className="inline-flex items-center gap-2">
                      <span className="w-5 h-5" style={{ color: 'var(--oksap-silver-hex)' }}><IconComp size={18} /></span>
                      <span className="text-oksap-navy font-medium underline">{social.name}</span>
                    </a>
                  </div>
                );
              }
            }
            // plain text part
            return sanitize(token).map((line, idx) => <div key={`${i}-${idx}`}>{line}</div>);
          })}
        </div>
      );
    }

    // default: sanitized lines
    return (
      <div>
        {sanitize(msg.text).map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg shadow-oksap-navy/30 z-[99999] transition-all transform hover:scale-105 flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: 'var(--oksap-silver-hex)' }}
          aria-label="Chat with AI"
        >
          {/* Dynamic Avatar based on selection */}
          <AnimatedImage
            src={launcherAvatar}
            alt="Chat Assistant"
            className="w-full h-full"
            roundedClassName="rounded-full"
            imageClassName="object-cover"
            enableScrollFx={false}
            enableHoverFx={false}
          />
        </button>
      )}

      {/* Chat Window Container */}
      {isOpen && (
        <div className="fixed z-[99999] bg-oksap-light flex flex-col shadow-2xl animate-slide-up
            inset-0 
          sm:inset-auto sm:bottom-6 sm:right-6 sm:w-96 sm:h-[600px] sm:rounded-2xl overflow-hidden" style={{ borderWidth: '2px', borderColor: 'var(--oksap-dark-hex)' }}>
          
          {/* VIEW 1: ASSISTANT SELECTION SCREEN */}
          {!selectedAssistant ? (
             <div className="flex flex-col h-full bg-gradient-to-b from-oksap-light to-oksap-light">
               <div className="p-4 text-white flex justify-between items-center shrink-0 shadow-lg" style={{ backgroundColor: 'var(--oksap-dark-hex)' }}>
                 <span className="font-bold text-lg">Chatea con OKSAP</span>
                 <button 
                   onClick={() => setIsOpen(false)}
                   className="p-1 hover:bg-white/10 rounded-full transition-colors"
                 >
                   <Icons.X size={24} />
                 </button>
               </div>
               
               <div className="flex-1 bg-oksap-light flex flex-col items-center justify-center p-6 text-center">
                 <div className="mb-8">
                   <h3 className="text-2xl font-bold text-oksap-navy mb-2">¡Hola!</h3>
                   <p className="text-gray-500">Elige con qué asistente quieres hablar hoy:</p>
                 </div>

                 <div className="grid grid-cols-1 gap-4 w-full max-w-xs">
                   {ASSISTANTS.map((assistant) => (
                     <button
                       key={assistant.id}
                       onClick={() => handleSelectAssistant(assistant)}
                       className="flex items-center gap-4 p-4 rounded-xl bg-oksap-primary/20 hover:shadow-lg hover:bg-gradient-to-r hover:from-oksap-primary/30 to-oksap-silver/10 transition-all duration-300 group text-left" style={{ borderWidth: '2px', borderColor: 'var(--oksap-dark-hex)' }}
                     >
                          <div className="w-14 h-14 rounded-full border-3 relative shadow-md group-hover:scale-105 transition-transform" style={{ borderColor: 'var(--oksap-silver-hex)', backgroundColor: 'rgb(var(--oksap-silver) / 0.2)' }}>
                          <AnimatedImage
                            src={assistant.avatar}
                            alt={assistant.name}
                            className="w-full h-full"
                            roundedClassName="rounded-full"
                            imageClassName="object-cover"
                            enableScrollFx={false}
                            enableHoverFx={false}
                          />
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full z-10"></div>
                        </div>
                        <div>
                          <span className="block font-bold text-oksap-navy text-lg group-hover:text-oksap-accent transition-colors">{assistant.name}</span>
                          <span className="text-xs text-oksap-silver font-medium uppercase tracking-wider">Asistente Virtual</span>
                        </div>
                        <div className="ml-auto text-oksap-silver group-hover:text-oksap-accent transition-colors">
                          <Icons.ChevronRight size={20} />
                        </div>
                     </button>
                   ))}
                 </div>
               </div>
             </div>
          ) : (
            /* VIEW 2: CHAT INTERFACE */
            <div className="flex flex-col h-full bg-oksap-light">
              {/* Header */}
              <div className="text-white p-4 flex justify-between items-center sm:rounded-t-2xl shrink-0 shadow-lg" style={{ backgroundColor: 'var(--oksap-dark-hex)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border-2 relative" style={{ borderColor: 'var(--oksap-silver-hex)', backgroundColor: 'rgb(var(--oksap-silver) / 0.12)' }}>
                     <AnimatedImage
                       src={selectedAssistant.avatar}
                       alt={selectedAssistant.name}
                       className="w-full h-full"
                       roundedClassName="rounded-full"
                       imageClassName="object-cover"
                       enableScrollFx={false}
                       enableHoverFx={false}
                     />
                     <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full z-10"></div>
                  </div>
                  <div>
                    <span className="block font-bold leading-tight">{selectedAssistant.name}</span>
                    <span className="text-xs text-oksap-silver uppercase tracking-wider">En línea</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  {/* Change Assistant Button */}
                  <button 
                    onClick={() => setSelectedAssistant(null)}
                    className="p-2 text-oksap-silver hover:text-white hover:bg-white/10 rounded-full transition-colors"
                    title="Cambiar asistente"
                  >
                    <Icons.UsersRound size={20} />
                  </button>
                  {/* Close Button */}
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-oksap-silver hover:text-white hover:bg-white/10 rounded-full transition-colors"
                  >
                    <Icons.X size={24} />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-oksap-light via-oksap-silver/5 to-oksap-light space-y-4">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.sender === Sender.USER ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  >
                    {/* Optional: Show tiny avatar next to model messages */}
                    {msg.sender === Sender.MODEL && (
                        <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 mr-2 mt-1 border-2 shadow-sm" style={{ borderColor: 'var(--oksap-silver-hex)' }}>
                         <AnimatedImage
                           src={selectedAssistant.avatar}
                           alt="Bot"
                           className="w-full h-full"
                           roundedClassName="rounded-full"
                           imageClassName="object-cover"
                           enableScrollFx={false}
                           enableHoverFx={false}
                         />
                       </div>
                    )}
                    
                    <div 
                      className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-md border-2 transition-all ${msg.sender === Sender.USER ? 'rounded-tr-none' : 'rounded-tl-none hover:shadow-lg'}`}
                      style={msg.sender === Sender.USER 
                        ? { backgroundColor: 'var(--oksap-accent-hex)', borderColor: 'var(--oksap-accent-hex)', color: 'white' }
                        : { backgroundColor: 'rgb(var(--oksap-primary) / 0.2)', borderColor: 'var(--oksap-silver-hex)', color: 'var(--oksap-navy-hex)' }
                      }
                    >
                      {renderMessageContent(msg)}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start items-end animate-fade-in">
                    <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 mr-2 mb-1 border-2 shadow-sm" style={{ borderColor: 'var(--oksap-silver-hex)' }}>
                         <AnimatedImage
                           src={selectedAssistant.avatar}
                           alt="Bot Typing"
                           className="w-full h-full"
                           roundedClassName="rounded-full"
                           imageClassName="object-cover"
                           enableScrollFx={false}
                           enableHoverFx={false}
                         />
                    </div>
                    <div className="bg-oksap-primary/20 border-2 p-3 rounded-2xl rounded-tl-none flex gap-2 shadow-md" style={{ borderColor: 'var(--oksap-silver-hex)' }}>
                        <div className="w-2 h-2 bg-oksap-accent rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-oksap-accent rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-oksap-accent rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-oksap-primary/15 shrink-0 pb-8 sm:pb-4 shadow-lg" style={{ borderTopWidth: '2px', borderTopColor: 'var(--oksap-dark-hex)' }}>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={`Escribe a ${selectedAssistant.name}...`}
                    className="flex-1 bg-oksap-light text-oksap-navy placeholder:text-oksap-accent rounded-full px-4 py-3 focus:outline-none text-base transition-all border-2"
                    style={{ 
                      borderColor: 'var(--oksap-accent-hex)',
                      boxShadow: 'none'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--oksap-navy-hex)';
                      e.currentTarget.style.boxShadow = '0 0 0 2px rgb(var(--oksap-navy) / 0.1)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--oksap-accent-hex)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    autoFocus
                  />
                  <button 
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    className="text-white rounded-full hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md flex items-center justify-center"
                    style={{ backgroundColor: 'var(--oksap-silver-hex)', width: '44px', height: '44px' }}
                  >
                    <Icons.Send size={20} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChatWidget;
