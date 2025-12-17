import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../types';
import { Download, Play, List, ChevronDown, ChevronUp, FileText, Monitor, Smartphone } from 'lucide-react';

interface StatusRowProps {
  product: Product;
  id?: string;
  isFeaturesOpen: boolean;
  onToggleFeatures: () => void;
}

const StatusRow: React.FC<StatusRowProps> = ({ product, id, isFeaturesOpen, onToggleFeatures }) => {
  const [showGuide, setShowGuide] = useState(false);
  
  // Close guide if features are opened via props
  useEffect(() => {
    if (isFeaturesOpen) {
      setShowGuide(false);
    }
  }, [isFeaturesOpen]);

  const toggleGuide = () => {
    setShowGuide(!showGuide);
    if (isFeaturesOpen) {
      onToggleFeatures(); // Close features if opening guide
    }
  };

  const handleToggleFeatures = () => {
    onToggleFeatures();
    if (showGuide) setShowGuide(false);
  };

  return (
    <div 
        id={id}
        className="group relative overflow-hidden bg-zinc-900/40 border border-zinc-800 transition-all duration-500 rounded-lg mb-3 hover:scale-[1.02] hover:-translate-y-1 hover:border-brand-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]"
    >
        {/* Glow effect on hover */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-500 to-transparent opacity-0 group-hover:opacity-10 transition-opacity blur duration-500" />
        
        <div className="relative p-4 sm:p-6">
            <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6">
                
                {/* Left: Info */}
                <div className="flex-1 min-w-0 w-full">
                    <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-bold text-white group-hover:text-brand-400 transition-colors truncate">
                            {product.name}
                        </h3>
                        <span className="px-2 py-0.5 rounded text-xs font-mono bg-zinc-800 text-zinc-400 border border-zinc-700">
                            {product.category}
                        </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-500 font-mono">
                        <span>{product.version}</span>
                        <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                        <span>Updated {product.lastUpdated}</span>
                    </div>
                    {product.description && (
                        <p className="mt-2 text-sm text-zinc-400 font-sans max-w-2xl">
                            {product.description}
                        </p>
                    )}
                </div>

                {/* Right: Actions */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-3 w-full xl:w-auto mt-2 xl:mt-0">
                    
                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                        {/* Features Toggle */}
                        {product.features && product.features.length > 0 && (
                            <button 
                            onClick={handleToggleFeatures}
                            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-md border text-sm font-medium transition-all ${
                                isFeaturesOpen 
                                ? 'bg-zinc-800 text-white border-zinc-700 shadow-inner' 
                                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700 hover:bg-zinc-800'
                            }`}
                          >
                            <List size={14} />
                            <span>Features</span>
                            {isFeaturesOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>
                        )}

                        {/* Setup Guide Button (Toggle) */}
                        {product.youtubeVideoId && (
                             <button 
                             onClick={toggleGuide}
                             className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-md border text-sm font-medium transition-all ${
                                 showGuide 
                                 ? 'bg-zinc-800 text-white border-zinc-700 shadow-inner' 
                                 : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700 hover:bg-zinc-800'
                             }`}
                           >
                             <Play size={14} className={showGuide ? "rotate-90 transition-transform" : "transition-transform"} />
                             <span>Setup Guide</span>
                           </button>
                        )}

                        {/* Requirement File Button */}
                        {product.requirementUrl && (
                           <a 
                             href={product.requirementUrl}
                             target="_blank"
                             rel="noopener noreferrer"
                             className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-md border text-sm font-medium transition-all bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700 hover:bg-zinc-800"
                           >
                             <FileText size={14} />
                             <span>Requirement file</span>
                           </a>
                        )}

                        {/* Recommended Emulator Button */}
                        {product.recommendedEmulatorUrl && (
                           <a 
                             href={product.recommendedEmulatorUrl}
                             target="_blank"
                             rel="noopener noreferrer"
                             className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-md border text-sm font-medium transition-all bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700 hover:bg-zinc-800"
                           >
                             <Monitor size={14} />
                             <span>Recommended Emulator</span>
                           </a>
                        )}

                        {/* Clean Emulator Button */}
                        {product.cleanEmulatorUrl && (
                           <a 
                             href={product.cleanEmulatorUrl}
                             target="_blank"
                             rel="noopener noreferrer"
                             className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-md border text-sm font-medium transition-all bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700 hover:bg-zinc-800"
                           >
                             <Smartphone size={14} />
                             <span>Clean Emulator</span>
                           </a>
                        )}

                        {/* Download Button */}
                        {product.downloadUrl && (
                        <a 
                            href={product.downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2 rounded-md bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm transition-all shadow-lg shadow-brand-500/20 hover:shadow-brand-500/40 active:scale-95 whitespace-nowrap border border-brand-500/50"
                        >
                            <Download size={16} />
                            <span>Download</span>
                        </a>
                        )}
                    </div>
                </div>
            </div>
        </div>

        {/* Features List Section */}
        {isFeaturesOpen && product.features && (
            <div className="relative border-t border-zinc-800 bg-black/40 p-4 sm:p-6 animate-in slide-in-from-top-2 duration-200">
                {/* Legend Moved to Top */}
                <div className="mb-4 flex items-center justify-end gap-4 text-xs font-mono text-zinc-500 border-b border-zinc-800/50 pb-3">
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div> Safe</div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-400"></div> Use with caution</div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div> Detected/Unsafe</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {product.features.map((feature, idx) => {
                        let statusColor = "bg-zinc-500";
                        let statusGlow = "";
                        
                        if (feature.status === 'SAFE') {
                            statusColor = "bg-green-500";
                            statusGlow = "shadow-[0_0_8px_rgba(34,197,94,0.6)]";
                        } else if (feature.status === 'UNSAFE') {
                            statusColor = "bg-red-500";
                            statusGlow = "shadow-[0_0_8px_rgba(239,68,68,0.6)]";
                        } else if (feature.status === 'RISK') {
                            statusColor = "bg-yellow-400";
                            statusGlow = "shadow-[0_0_8px_rgba(250,204,21,0.6)]";
                        }

                        return (
                            <div key={idx} className="flex items-center gap-3 p-2 rounded border border-zinc-800/50 bg-zinc-900/30 hover:bg-zinc-900/60 transition-colors">
                                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${statusColor} ${statusGlow}`}></div>
                                <span className="text-sm text-zinc-300 font-mono tracking-tight">{feature.name}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        )}

        {/* Embedded Video Section */}
        {showGuide && product.youtubeVideoId && (
            <div className="relative border-t border-zinc-800 bg-black/50 p-4 sm:p-6 animate-in slide-in-from-top-2 duration-200">
                <div className="max-w-3xl mx-auto">
                    <p className="text-sm text-zinc-400 mb-3 font-mono">
                        <span className="text-brand-500">root@realxiter:~$</span> playing setup_guide.mp4
                    </p>
                    <div className="aspect-video w-full rounded-lg overflow-hidden border border-zinc-800 shadow-2xl relative bg-zinc-900">
                        <iframe 
                            width="100%" 
                            height="100%" 
                            src={`https://www.youtube.com/embed/${product.youtubeVideoId.includes('?') ? product.youtubeVideoId.split('?')[0] : product.youtubeVideoId}?${product.youtubeVideoId.includes('?') ? product.youtubeVideoId.split('?')[1] : ''}`} 
                            title="Setup Guide" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default StatusRow;