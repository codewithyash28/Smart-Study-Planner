
export enum Priority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export interface Subject {
  id: string;
  name: string;
  priority: Priority;
}

export type ScheduleItemType = 'STUDY' | 'BREAK';

export interface ScheduleItem {
  id: string;
  title: string;
  startTime: string; // HH:mm format
  endTime: string;   // HH:mm format
  duration: number;  // in minutes
  type: ScheduleItemType;
  subjectId?: string;
}

export interface StudyPlanConfig {
  startTime: string;
  endTime: string;
  sessionDuration: number;
  breakDuration: number;
}
