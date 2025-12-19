
import React from 'react';
import { ScheduleItem } from '../types';

interface TimetableProps {
  items: ScheduleItem[];
  onUpdateItem: (item: ScheduleItem) => void;
}

const Timetable: React.FC<TimetableProps> = ({ items, onUpdateItem }) => {
  return (
    <div className="space-y-4 relative before:absolute before:left-[23px] before:top-4 before:bottom-4 before:w-1 before:bg-slate-100">
      {items.map((item) => (
        <div key={item.id} className="relative pl-14">
          <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl flex items-center justify-center border-4 border-white z-10 shadow-sm transition-transform hover:scale-110 ${
            item.type === 'STUDY' ? 'bg-indigo-500' : 'bg-emerald-400'
          }`}>
            {item.type === 'STUDY' ? (
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            ) : (
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            )}
          </div>
          <div className={`p-5 rounded-3xl border-2 transition-all hover:shadow-lg active:scale-[0.99] cursor-pointer ${
            item.type === 'STUDY' ? 'bg-white border-slate-100 hover:border-indigo-200' : 'bg-emerald-50/30 border-emerald-100 hover:border-emerald-300'
          }`} onClick={() => {
            const newTitle = prompt('What are we studying specifically?', item.title.replace('Study: ', ''));
            if (newTitle) onUpdateItem({ ...item, title: `Study: ${newTitle}` });
          }}>
            <div className="flex justify-between items-center mb-2">
              <h3 className={`font-black text-lg sm:text-xl ${item.type === 'STUDY' ? 'text-slate-900' : 'text-emerald-900'}`}>
                {item.title}
              </h3>
              <span className={`text-[10px] font-black px-3 py-1 rounded-xl shadow-sm border ${
                item.type === 'STUDY' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-white text-emerald-600 border-emerald-100'
              }`}>
                {item.duration} MINS
              </span>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-sm font-bold text-slate-400 flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-lg">
                <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {item.startTime} — {item.endTime}
              </p>
              {item.type === 'STUDY' && (
                <div className="hidden sm:flex items-center gap-1 text-[10px] font-black text-indigo-400 uppercase tracking-tighter">
                  Deep Work Mode
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timetable;
