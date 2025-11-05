import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Paperclip,
  Mic,
  PauseCircle,
  Plus,
  Loader2,
  History,
  UserCircle,
  Trash2,
  FileText,
  ClipboardList,
} from 'lucide-react';

function classNames(...cls) {
  return cls.filter(Boolean).join(' ');
}

// Single file export: ChatApp composes its inner parts to keep App.jsx imports minimal
export default function ChatApp() {
  const [sessions, setSessions] = useState(() => [
    { id: 's1', title: 'Possible DVT workup', messages: seedThread('DVT suspicion in postop patient') },
    { id: 's2', title: 'Chest pain triage', messages: seedThread('Atypical chest pain, rule out ACS vs GERD') },
  ]);
  const [activeId, setActiveId] = useState(sessions[0]?.id || 's1');
  const [input, setInput] = useState('');
  const [uploadItems, setUploadItems] = useState([]); // {name, size, url}
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [stream, setStream] = useState(null);
  const fileInputRef = useRef(null);
  const bottomRef = useRef(null);

  const activeSession = useMemo(
    () => sessions.find((s) => s.id === activeId) || sessions[0],
    [sessions, activeId]
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeSession?.messages?.length]);

  function seedThread(seed) {
    return [
      { role: 'assistant', content: `Welcome to MedRag. Share details about: ${seed}. I will reason over similar cases, your documents, and guidelines.` },
    ];
  }

  function createSession() {
    const id = `s${Date.now()}`;
    const newSession = { id, title: 'New consultation', messages: seedThread('your case') };
    setSessions([newSession, ...sessions]);
    setActiveId(id);
  }

  function deleteSession(id) {
    const next = sessions.filter((s) => s.id !== id);
    setSessions(next);
    if (activeId === id && next.length) setActiveId(next[0].id);
  }

  function renameSession(id, title) {
    setSessions((prev) => prev.map((s) => (s.id === id ? { ...s, title } : s)));
  }

  function handleSend(text) {
    const msg = text?.trim();
    if (!msg) return;

    setSessions((prev) =>
      prev.map((s) =>
        s.id === activeId
          ? { ...s, messages: [...s.messages, { role: 'user', content: msg, attachments: uploadItems }] }
          : s
      )
    );
    setUploadItems([]);
    setInput('');

    // Simulated assistant typing and response
    setTimeout(() => {
      setSessions((prev) =>
        prev.map((s) =>
          s.id === activeId
            ? {
                ...s,
                messages: [
                  ...s.messages,
                  {
                    role: 'assistant',
                    content:
                      'Based on your input, here is a preliminary reasoning path: 1) Identify red flags. 2) Match against patient history and uploaded documents. 3) Suggest tests and differentials with confidence scores. (Demo response) ',
                  },
                ],
              }
            : s
        )
      );
    }, 900);
  }

  function onFilesSelected(files) {
    const arr = Array.from(files || []);
    const items = arr.map((f) => ({ name: f.name, size: f.size, url: URL.createObjectURL(f) }));
    setUploadItems((prev) => [...prev, ...items]);
  }

  async function startRecording() {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(s);
      const chunks = [];
      mr.ondataavailable = (e) => e.data.size && chunks.push(e.data);
      mr.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setUploadItems((prev) => [...prev, { name: `voice-${new Date().toISOString()}.webm`, size: blob.size, url }]);
        s.getTracks().forEach((t) => t.stop());
        setStream(null);
      };
      mr.start();
      setStream(s);
      setMediaRecorder(mr);
      setRecording(true);
    } catch (e) {
      console.error('Microphone error', e);
    }
  }

  function stopRecording() {
    mediaRecorder?.stop();
    setRecording(false);
  }

  return (
    <div className="relative flex h-[calc(100vh-64px-56px)] w-full bg-slate-950 text-slate-100">{/* minus navbar/footer approx */}
      {/* Sidebar */}
      <AnimatePresence initial={false}>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="hidden w-80 shrink-0 border-r border-slate-800 bg-slate-900/60 p-4 lg:block"
          >
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 text-slate-300">
                <History className="h-4 w-4 text-cyan-400" />
                <span className="text-sm uppercase tracking-wide">History</span>
              </div>
              <button
                onClick={createSession}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-700/70 bg-slate-800/50 px-2.5 py-1.5 text-xs hover:bg-slate-800"
              >
                <Plus className="h-4 w-4" /> New
              </button>
            </div>
            <ul className="mt-3 space-y-1">
              {sessions.map((s) => (
                <li key={s.id} className="group">
                  <button
                    onClick={() => setActiveId(s.id)}
                    className={classNames(
                      'flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-800/60',
                      activeId === s.id && 'bg-slate-800/80'
                    )}
                    title={s.title}
                  >
                    <span className="truncate">{s.title}</span>
                    <span className="ml-2 inline-flex items-center gap-2 opacity-0 transition group-hover:opacity-100">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const t = prompt('Rename session', s.title);
                          if (t) renameSession(s.id, t);
                        }}
                        className="text-xs text-slate-400 hover:text-slate-200"
                      >
                        Edit
                      </button>
                      <Trash2
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSession(s.id);
                        }}
                        className="h-4 w-4 text-slate-400 hover:text-rose-400"
                      />
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <div className="inline-flex items-center gap-2 text-slate-300">
                <ClipboardList className="h-4 w-4 text-blue-400" />
                <span className="text-sm uppercase tracking-wide">Patient History</span>
              </div>
              <div className="mt-2 space-y-2 rounded-lg border border-slate-800 bg-slate-900/50 p-3">
                {uploadItems.length === 0 && (
                  <p className="text-xs text-slate-400">No documents or voice notes attached for this message.</p>
                )}
                {uploadItems.map((f, idx) => (
                  <div key={idx} className="flex items-center gap-2 rounded-md bg-slate-800/60 p-2 text-xs">
                    <FileText className="h-4 w-4 text-cyan-400" />
                    <a href={f.url} target="_blank" rel="noreferrer" className="truncate hover:underline">
                      {f.name}
                    </a>
                    <span className="ml-auto text-slate-500">{formatSize(f.size)}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main chat area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/60 px-4 py-3 lg:hidden">
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="rounded-lg border border-slate-700/70 bg-slate-800/50 px-3 py-1.5 text-sm"
          >
            {isSidebarOpen ? 'Hide' : 'Show'} History
          </button>
          <button onClick={createSession} className="rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-3 py-1.5 text-sm">
            New
          </button>
        </div>

        {/* Transcript */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="mx-auto w-full max-w-3xl space-y-4">
            {activeSession?.messages?.map((m, i) => (
              <MessageBubble key={i} role={m.role} content={m.content} attachments={m.attachments} />
            ))}
            <TypingIndicator />
            <div ref={bottomRef} />
          </div>
        </div>

        {/* Input bar */}
        <div className="border-t border-slate-800 bg-slate-900/70 p-4">
          <div className="mx-auto flex max-w-3xl items-end gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700/70 bg-slate-800/50 hover:bg-slate-800"
                title="Attach documents"
              >
                <Paperclip className="h-5 w-5" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                multiple
                onChange={(e) => onFilesSelected(e.target.files)}
                accept=".pdf,.txt,.doc,.docx,.png,.jpg,.jpeg,.webm,.wav,.mp3"
              />

              {recording ? (
                <button
                  onClick={stopRecording}
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 text-rose-300 hover:bg-rose-500/20"
                  title="Stop recording"
                >
                  <PauseCircle className="h-5 w-5" /> Stop
                </button>
              ) : (
                <button
                  onClick={startRecording}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700/70 bg-slate-800/50 hover:bg-slate-800"
                  title="Record voice note"
                >
                  <Mic className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className="relative flex-1">
              <textarea
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(input);
                  }
                }}
                placeholder="Describe the case. Include vitals, symptoms, meds, and timeline..."
                className="max-h-40 w-full resize-none rounded-xl border border-slate-700/70 bg-slate-800/60 px-4 py-3 pr-12 text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
              />
              <button
                onClick={() => handleSend(input)}
                className="absolute right-2 bottom-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/25 hover:brightness-110"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-400">
      <Loader2 className="h-4 w-4 animate-spin text-cyan-400" />
      Awaiting your input or processing...
    </div>
  );
}

function MessageBubble({ role, content, attachments }) {
  const isUser = role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={classNames(
        'rounded-2xl px-4 py-3 shadow-sm',
        isUser
          ? 'ml-auto max-w-[82%] bg-blue-600/20 text-blue-50 ring-1 ring-blue-500/30'
          : 'mr-auto max-w-[82%] bg-slate-800/60 text-slate-100 ring-1 ring-slate-700/60'
      )}
    >
      <div className="flex items-center gap-2 text-xs opacity-80">
        {isUser ? <UserCircle className="h-4 w-4" /> : <img src="/favicon.svg" className="h-4 w-4" alt="MedRag" />}
        <span>{isUser ? 'You' : 'MedRag'}</span>
      </div>
      <p className="mt-1 whitespace-pre-wrap leading-relaxed">{content}</p>
      {!!attachments?.length && (
        <div className="mt-2 space-y-1">
          {attachments.map((a, i) => (
            <a key={i} href={a.url} target="_blank" rel="noreferrer" className="group flex items-center gap-2 rounded-lg bg-slate-900/60 p-2 text-xs ring-1 ring-slate-800/80 hover:bg-slate-900">
              <FileText className="h-4 w-4 text-cyan-400" />
              <span className="truncate group-hover:underline">{a.name}</span>
              <span className="ml-auto text-slate-500">{formatSize(a.size)}</span>
            </a>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function formatSize(bytes) {
  if (!bytes && bytes !== 0) return '';
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let u = 0;
  while (size > 1024 && u < units.length - 1) {
    size = size / 1024;
    u++;
  }
  return `${size.toFixed(1)} ${units[u]}`;
}
