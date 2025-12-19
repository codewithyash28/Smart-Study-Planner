
import React, { useState } from 'react';
import { Subject, Priority } from '../types';

interface SubjectInputProps {
  subjects: Subject[];
  onAdd: (subject: Subject) => void;
  onRemove: (id: string) => void;
}

const SubjectInput: React.FC<SubjectInputProps> = ({ subjects, onAdd, onRemove }) => {
  const [name, setName] = useState('');
  const [priority, setPriority] = useState<Priority>(Priority.MEDIUM);

  const handleAdd = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!name.trim()) return;
    onAdd({
      id: Math.random().toString(36).substr(2, 9),
      name: name.trim(),
      priority
    });
    setName('');
  };

  return (
    <div className="space-y-5">
      <form onSubmit={handleAdd} className="flex flex-col gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter subject name..."
          className="w-full px-5 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium"
        />
        <div className="flex gap-2">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="flex-1 px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-900 font-bold text-sm focus:outline-none focus:border-indigo-500"
          >
            <option value={Priority.HIGH}>High Priority</option>
            <option value={Priority.MEDIUM}>Normal Priority</option>
            <option value={Priority.LOW}>Low Priority</option>
          </select>
          <button
            type="submit"
            className="bg-slate-900 text-white px-5 rounded-2xl hover:bg-black transition-colors font-bold shadow-sm flex items-center justify-center"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
          </button>
        </div>
      </form>

      <div className="flex flex-wrap gap-2.5">
        {subjects.length === 0 && <p className="text-sm text-slate-400 italic">No subjects added yet.</p>}
        {subjects.map((sub) => (
          <div
            key={sub.id}
            className={`flex items-center gap-2 pl-4 pr-3 py-2 rounded-2xl text-sm font-bold border-2 transition-transform hover:scale-105 ${
              sub.priority === Priority.HIGH ? 'bg-rose-50 border-rose-100 text-rose-700' :
              sub.priority === Priority.MEDIUM ? 'bg-indigo-50 border-indigo-100 text-indigo-700' :
              'bg-slate-50 border-slate-200 text-slate-600'
            }`}
          >
            <span>{sub.name}</span>
            <button
              onClick={() => onRemove(sub.id)}
              className="hover:bg-black/5 rounded-full p-1 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectInput;
