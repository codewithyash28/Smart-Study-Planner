
import React, { useState, useCallback } from 'react';
import { Subject, Priority, ScheduleItem, StudyPlanConfig } from './types';
import SubjectInput from './components/SubjectInput';
import TimeConfig from './components/TimeConfig';
import Timetable from './components/Timetable';
import Dashboard from './components/Dashboard';
import AIBot from './components/AIBot';
import { getStudyTips } from './services/geminiService';

const App: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [config, setConfig] = useState<StudyPlanConfig>({
    startTime: '09:00',
    endTime: '15:00',
    sessionDuration: 45,
    breakDuration: 15
  });
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [aiTips, setAiTips] = useState<string>('');
  const [loadingTips, setLoadingTips] = useState(false);

  const generateSchedule = useCallback(() => {
    if (subjects.length === 0) {
      alert("Please add at least one subject first!");
      return;
    }
    if (config.sessionDuration <= 0) {
      alert("Study duration must be greater than 0!");
      return;
    }

    const start = new Date(`2024-01-01T${config.startTime}:00`);
    const end = new Date(`2024-01-01T${config.endTime}:00`);
    
    if (end <= start) {
      alert("End time must be after start time!");
      return;
    }

    const priorityWeight: Record<Priority, number> = {
      [Priority.HIGH]: 3,
      [Priority.MEDIUM]: 2,
      [Priority.LOW]: 1
    };

    const newSchedule: ScheduleItem[] = [];
    let currentTime = new Date(start);
    const sortedSubjects = [...subjects].sort((a, b) => priorityWeight[b.priority] - priorityWeight[a.priority]);
    let subjectIndex = 0;

    let safetyCounter = 0;
    while (currentTime < end && safetyCounter < 50) {
      safetyCounter++;
      const currentSubject = sortedSubjects[subjectIndex % sortedSubjects.length];
      const sessionEnd = new Date(currentTime.getTime() + config.sessionDuration * 60000);
      
      if (sessionEnd > end) break;

      newSchedule.push({
        id: Math.random().toString(36).substr(2, 9),
        title: `Study: ${currentSubject.name}`,
        startTime: currentTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }),
        endTime: sessionEnd.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }),
        duration: config.sessionDuration,
        type: 'STUDY',
        subjectId: currentSubject.id,
        completed: false
      });

      currentTime = new Date(sessionEnd);

      const breakEnd = new Date(currentTime.getTime() + config.breakDuration * 60000);
      if (breakEnd > end || config.breakDuration <= 0) {
        if (breakEnd > end) break;
      } else {
        newSchedule.push({
          id: Math.random().toString(36).substr(2, 9),
          title: 'Rest & Recharge 🥤',
          startTime: currentTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }),
          endTime: breakEnd.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }),
          duration: config.breakDuration,
          type: 'BREAK',
          completed: false
        });
        currentTime = new Date(breakEnd);
      }
      subjectIndex++;
    }

    setSchedule(newSchedule);
  }, [subjects, config]);

  const fetchAiTips = async () => {
    if (subjects.length === 0) return;
    setLoadingTips(true);
    const tips = await getStudyTips(subjects.map(s => s.name));
    setAiTips(tips);
    setLoadingTips(false);
  };

  const handleUpdateScheduleItem = (updatedItem: ScheduleItem) => {
    setSchedule(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  const handleToggleComplete = (id: string) => {
    setSchedule(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2.5 rounded-xl shadow-indigo-200 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">FocusPlan</h1>
          </div>
          <button 
            onClick={generateSchedule}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            Generate My Plan
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <Dashboard subjects={subjects} schedule={schedule} aiTips={aiTips} loadingTips={loadingTips} onRefreshTips={fetchAiTips} />
          <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-extrabold text-slate-900 mb-5 flex items-center gap-3">
              <span className="w-2 h-8 bg-indigo-500 rounded-full"></span>
              Subjects
            </h2>
            <SubjectInput subjects={subjects} onAdd={(s) => setSubjects(prev => [...prev, s])} onRemove={(id) => setSubjects(prev => prev.filter(s => s.id !== id))} />
          </section>
          <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-extrabold text-slate-900 mb-5 flex items-center gap-3">
              <span className="w-2 h-8 bg-indigo-500 rounded-full"></span>
              Study Times
            </h2>
            <TimeConfig config={config} onChange={setConfig} />
          </section>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 min-h-[500px]">
             <h2 className="text-xl font-extrabold text-slate-900 mb-8 flex items-center gap-3">
              <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
              Today's Schedule
            </h2>
            {schedule.length > 0 ? (
              <Timetable items={schedule} onUpdateItem={handleUpdateScheduleItem} onToggleComplete={handleToggleComplete} />
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="bg-indigo-50 p-8 rounded-full mb-6">
                  <svg className="w-16 h-16 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Ready to start?</h3>
                <p className="text-slate-500 max-w-xs mx-auto">Add your subjects on the left and hit the "Generate" button above.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Floating AI Bot */}
      <AIBot subjects={subjects} />
    </div>
  );
};

export default App;
