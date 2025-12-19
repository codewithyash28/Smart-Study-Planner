
import React from 'react';
import { Subject, ScheduleItem } from '../types';

interface DashboardProps {
  subjects: Subject[];
  schedule: ScheduleItem[];
  aiTips: string;
  loadingTips: boolean;
  onRefreshTips: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ subjects, schedule, aiTips, loadingTips, onRefreshTips }) => {
  const studySessions = schedule.filter(item => item.type === 'STUDY');
  const completedSessionsCount = studySessions.filter(s => s.completed).length;
  const totalStudyMinutes = studySessions.reduce((acc, item) => acc + item.duration, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-indigo-600 p-5 rounded-3xl text-white shadow-xl shadow-indigo-100 transition-transform hover:scale-[1.02]">
          <p className="text-[10px] font-black opacity-70 uppercase tracking-wider mb-1">Study Sessions</p>
          <p className="text-3xl font-black">
            {completedSessionsCount}<span className="text-lg opacity-60">/{studySessions.length}</span>
          </p>
          <div className="mt-2 text-xs font-bold bg-white/20 py-1 px-2 rounded-lg inline-block">
            {completedSessionsCount === studySessions.length && studySessions.length > 0 ? 'All Done! 🔥' : `${totalStudyMinutes} mins total`}
          </div>
        </div>
        <div className="bg-white p-5 rounded-3xl text-slate-900 border-2 border-slate-100 shadow-sm transition-transform hover:scale-[1.02]">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Progress</p>
          <p className="text-3xl font-black text-emerald-600">
            {studySessions.length > 0 ? Math.round((completedSessionsCount / studySessions.length) * 100) : 0}<span className="text-lg">%</span>
          </p>
          <div className="mt-2 text-xs font-bold text-slate-500">Keep ticking them off!</div>
        </div>
      </div>

      <div className="bg-indigo-50 border-2 border-indigo-100 p-6 rounded-3xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-indigo-900 font-black flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.464 15.05a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 14a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
              AI Study Coach
            </h3>
            <button 
              onClick={onRefreshTips} 
              disabled={subjects.length === 0 || loadingTips}
              className="bg-white text-indigo-600 text-xs font-black px-4 py-2 rounded-xl shadow-sm hover:shadow-md disabled:opacity-50 active:scale-95 transition-all"
            >
              {loadingTips ? 'Thinking...' : 'Get Tips'}
            </button>
          </div>
          
          <div className="text-sm font-medium text-indigo-900 leading-relaxed bg-white/50 p-4 rounded-2xl border border-indigo-100">
            {aiTips ? (
              <div className="whitespace-pre-line">{aiTips}</div>
            ) : (
              <p className="italic text-indigo-400">
                Tap "Get Tips" to see how Gemini suggests you tackle your subjects today!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
