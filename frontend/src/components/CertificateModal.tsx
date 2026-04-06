"use client";

import { useEffect } from "react";

interface CertificateModalProps {
  onClose: () => void;
  userName: string;
  examTitle: string;
  date: string;
}

export default function CertificateModal({ onClose, userName, examTitle, date }: CertificateModalProps) {
  
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 print:p-0 bg-black/80 print:bg-white backdrop-blur-sm">
      {/* Container */}
      <div className="bg-white text-black w-full max-w-4xl relative shadow-2xl overflow-hidden print:w-full print:h-screen print:max-w-none print:shadow-none print:overflow-visible">
        
        {/* Certificate Border Design */}
        <div className="p-8 print:p-12 h-full">
          <div className="border-[12px] border-double border-amber-600 p-8 print:p-12 h-full flex flex-col items-center justify-center text-center relative pointer-events-none">
            
            {/* Corner Ornaments */}
            <div className="absolute top-2 left-2 w-16 h-16 border-t-4 border-l-4 border-amber-600"></div>
            <div className="absolute top-2 right-2 w-16 h-16 border-t-4 border-r-4 border-amber-600"></div>
            <div className="absolute bottom-2 left-2 w-16 h-16 border-b-4 border-l-4 border-amber-600"></div>
            <div className="absolute bottom-2 right-2 w-16 h-16 border-b-4 border-r-4 border-amber-600"></div>

            {/* Content */}
            <div className="space-y-6 print:space-y-8 z-10 w-full max-w-2xl px-4">
              <h1 className="text-4xl print:text-5xl font-serif text-amber-700 tracking-widest uppercase">
                Certificate of Excellence
              </h1>
              <p className="text-gray-600 text-lg print:text-xl font-serif italic">
                This is to proudly certify that
              </p>
              
              {/* Name */}
              <div className="py-2 border-b-2 border-amber-600 mx-12">
                <h2 className="text-5xl print:text-6xl font-bold font-serif text-gray-900 capitalize" style={{ fontFamily: 'Georgia, serif' }}>
                  {userName}
                </h2>
              </div>
              
              <p className="text-gray-600 text-lg print:text-xl font-serif italic">
                has successfully completed and mastered the
              </p>
              
              {/* Title */}
              <h3 className="text-2xl print:text-3xl font-bold text-amber-700 uppercase tracking-wide">
                {examTitle}
              </h3>
              
              {/* Footer */}
              <div className="flex justify-between items-end mt-16 pt-8 w-full">
                <div className="text-center w-40">
                  <div className="border-b border-gray-400 mb-2 font-serif text-gray-800">{new Date(date).toLocaleDateString()}</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider">Date Issued</div>
                </div>
                
                {/* Gold Seal / Badge */}
                <div className="w-24 h-24 print:w-32 print:h-32 bg-amber-500 rounded-full flex flex-col items-center justify-center border-4 border-amber-600 shadow-lg shrink-0 transform -translate-y-4">
                  <div className="text-[0.6rem] print:text-xs text-white uppercase font-bold text-center leading-tight">FluentBee<br/>Language<br/>Institute</div>
                </div>
                
                <div className="text-center w-40">
                  <div className="border-b border-gray-400 mb-2 font-signature text-xl text-gray-800" style={{ fontFamily: 'cursive' }}>A. Şeker</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider">Director</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons (Hidden on Print) */}
        <div className="absolute top-4 right-4 flex gap-2 print:hidden z-20">
          <button 
            onClick={handlePrint}
            className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded shadow-md font-medium transition pointer-events-auto"
          >
            🖨️ PDF İndir / Yazdır
          </button>
          <button 
            onClick={onClose}
            className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded shadow-md font-medium transition pointer-events-auto"
          >
            Kapat
          </button>
        </div>
      </div>
      
      {/* Global Print Styles to force landscape and A4 page */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          @page { size: A4 landscape; margin: 0; }
          body { 
            visibility: hidden; 
            background: white !important;
          }
          /* We hide everything except our modal wrapper */
          body * {
            visibility: hidden;
          }
          .fixed {
            position: absolute !important;
            visibility: visible !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            overflow: hidden !important;
          }
          .fixed * {
            visibility: visible !important;
          }
        }
      `}} />
    </div>
  );
}
