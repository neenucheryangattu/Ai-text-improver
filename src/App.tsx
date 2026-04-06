import { useState } from "react"
import { Sparkles, Edit3, Copy, CheckCircle2 } from 'lucide-react';
import './index.css';
import { improveText } from "./utils/ai";
function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isImproving, setIsImproving] = useState(false);
  const [tone, setTone] = useState('Professional');
  const [copied, setCopied] = useState(false);

  const tones = ['Professional', 'Casual', 'Concise', 'Academic', 'Creative'];
  const handleImprove = async () => {
    if (!inputText.trim()) return;
    setIsImproving(true);
    
    try {
      const result = await improveText(inputText, tone);
      setOutputText(result);
    } catch (error) {
      console.error('Failed to improve text', error);
      setOutputText('An error occurred while improving your text. Please try again.');
    } finally {
      setIsImproving(false);
    }
  };

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 flex flex-col gap-8 min-h-screen">
      <header className="text-center mt-8 mb-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2">
          AI Text Improver
        </h1>
        <p className="text-slate-400 text-lg">Elevate your writing in seconds with advanced AI</p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 max-h-min">
        {/* Input Panel */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md flex flex-col shadow-lg min-h-[400px]">
          <div className="flex items-center gap-2 mb-4 text-slate-100 font-semibold text-xl">
            <Edit3 size={20} className="text-slate-400" />
            <span>Original Text</span>
          </div>
          
          <div className="flex-1 flex flex-col">
            <textarea
              className="flex-1 w-full bg-transparent border-none text-slate-100 text-base resize-none outline-none min-h-[250px] placeholder:text-slate-500"
              placeholder="Type or paste your text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>

          <div className="mt-4 flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {tones.map((t) => (
                <button
                  key={t}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                    tone === t 
                      ? 'bg-indigo-500 border-indigo-400 text-white' 
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-200'
                  }`}
                  onClick={() => setTone(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            <button 
              className="mt-2 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white border-none py-3 px-6 rounded-xl font-semibold text-base cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(99,102,241,0.4)] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center gap-2"
              disabled={isImproving || !inputText.trim()}
              onClick={handleImprove}
            >
              <Sparkles size={20} className={isImproving ? 'animate-spin' : ''} />
              {isImproving ? 'Improving...' : 'Improve Text'}
            </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md flex flex-col shadow-lg min-h-[400px]">
          <div className="flex items-center justify-between w-full mb-4">
            <div className="flex items-center gap-2 text-slate-100 font-semibold text-xl">
              <Sparkles size={20} className="text-pink-500" />
              <span>Improved Text</span>
            </div>
            
            {outputText && (
              <button 
                className="bg-transparent border-none text-slate-400 cursor-pointer p-2 rounded transition-colors duration-200 hover:text-slate-200 hover:bg-white/10 flex items-center" 
               onClick={handleCopy} 
                title="Copy to clipboard"
              >
                {copied ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Copy size={18} />}
              </button>
  )}
          </div>
          
          <div className="flex-1 bg-black/20 rounded-xl p-4 overflow-y-auto leading-relaxed text-slate-100 shadow-inner">
            {outputText ? (
              <div className="whitespace-pre-wrap">{outputText}</div>
            ) : (
              <div className="text-slate-500 flex items-center justify-center h-full italic">
                Your improved text will appear here...
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
