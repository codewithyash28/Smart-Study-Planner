
import React from 'react';
import { StudyPlanConfig } from '../types';

interface TimeConfigProps {
  config: StudyPlanConfig;
  onChange: (config: StudyPlanConfig) => void;
}

const TimeConfig: React.FC<TimeConfigProps> = ({ config, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      ...config,
      [name]: name.includes('Duration') ? Math.max(0, parseInt(value) || 0) : value
    });
  };

  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Start Hour</label>
        <input
          type="time"
          name="startTime"
          value={config.startTime}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-900 font-bold focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">End Hour</label>
        <input
          type="time"
          name="endTime"
          value={config.endTime}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-900 font-bold focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Study (Mins)</label>
        <input
          type="number"
          name="sessionDuration"
          value={config.sessionDuration}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-900 font-bold focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Break (Mins)</label>
        <input
          type="number"
          name="breakDuration"
          value={config.breakDuration}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-900 font-bold focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>
    </div>
  );
};

export default TimeConfig;
