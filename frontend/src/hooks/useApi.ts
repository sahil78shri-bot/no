import { useAuth0 } from '@auth0/auth0-react';
import { apiService } from '../services/api';
import { 
  Goal, 
  Habit, 
  Task, 
  StressLog, 
  FocusSession, 
  Expense, 
  HobbyPost, 
  WeeklyReflection, 
  CareerTask, 
  StudentProfile 
} from '../types';

export const useApi = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const getToken = async (): Promise<string | undefined> => {
    if (!isAuthenticated) return undefined;
    
    try {
      return await getAccessTokenSilently();
    } catch (error) {
      console.error('Failed to get access token:', error);
      return undefined;
    }
  };

  const api = {
    // Profile endpoints
    getProfile: async (): Promise<StudentProfile> => {
      const token = await getToken();
      return apiService.getProfile(token);
    },
    updateProfile: async (profile: Partial<StudentProfile>): Promise<StudentProfile> => {
      const token = await getToken();
      return apiService.updateProfile(profile, token);
    },

    // Goals endpoints
    getGoals: async (): Promise<Goal[]> => {
      const token = await getToken();
      return apiService.getGoals(token);
    },
    createGoal: async (goal: Omit<Goal, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<Goal> => {
      const token = await getToken();
      return apiService.createGoal(goal, token);
    },
    updateGoal: async (goalId: string, goal: Partial<Goal>): Promise<Goal> => {
      const token = await getToken();
      return apiService.updateGoal(goalId, goal, token);
    },
    deleteGoal: async (goalId: string): Promise<void> => {
      const token = await getToken();
      return apiService.deleteGoal(goalId, token);
    },

    // Habits endpoints
    getHabits: async (): Promise<Habit[]> => {
      const token = await getToken();
      return apiService.getHabits(token);
    },
    createHabit: async (habit: Omit<Habit, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<Habit> => {
      const token = await getToken();
      return apiService.createHabit(habit, token);
    },
    updateHabit: async (habitId: string, habit: Partial<Habit>): Promise<Habit> => {
      const token = await getToken();
      return apiService.updateHabit(habitId, habit, token);
    },
    deleteHabit: async (habitId: string): Promise<void> => {
      const token = await getToken();
      return apiService.deleteHabit(habitId, token);
    },

    // Tasks endpoints
    getTasks: async (): Promise<Task[]> => {
      const token = await getToken();
      return apiService.getTasks(token);
    },
    createTask: async (task: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<Task> => {
      const token = await getToken();
      return apiService.createTask(task, token);
    },
    updateTask: async (taskId: string, task: Partial<Task>): Promise<Task> => {
      const token = await getToken();
      return apiService.updateTask(taskId, task, token);
    },
    deleteTask: async (taskId: string): Promise<void> => {
      const token = await getToken();
      return apiService.deleteTask(taskId, token);
    },

    // Stress logs endpoints
    getStressLogs: async (): Promise<StressLog[]> => {
      const token = await getToken();
      return apiService.getStressLogs(token);
    },
    createStressLog: async (log: Omit<StressLog, 'id' | 'userId' | 'createdAt'>): Promise<StressLog> => {
      const token = await getToken();
      return apiService.createStressLog(log, token);
    },

    // Focus sessions endpoints
    getFocusSessions: async (): Promise<FocusSession[]> => {
      const token = await getToken();
      return apiService.getFocusSessions(token);
    },
    createFocusSession: async (session: Omit<FocusSession, 'id' | 'userId' | 'createdAt'>): Promise<FocusSession> => {
      const token = await getToken();
      return apiService.createFocusSession(session, token);
    },
    updateFocusSession: async (sessionId: string, session: Partial<FocusSession>): Promise<FocusSession> => {
      const token = await getToken();
      return apiService.updateFocusSession(sessionId, session, token);
    },

    // Expenses endpoints
    getExpenses: async (): Promise<Expense[]> => {
      const token = await getToken();
      return apiService.getExpenses(token);
    },
    createExpense: async (expense: Omit<Expense, 'id' | 'userId' | 'createdAt'>): Promise<Expense> => {
      const token = await getToken();
      return apiService.createExpense(expense, token);
    },
    deleteExpense: async (expenseId: string): Promise<void> => {
      const token = await getToken();
      return apiService.deleteExpense(expenseId, token);
    },

    // Hobby posts endpoints
    getHobbyPosts: async (): Promise<HobbyPost[]> => {
      const token = await getToken();
      return apiService.getHobbyPosts(token);
    },
    createHobbyPost: async (post: Omit<HobbyPost, 'id' | 'userId' | 'createdAt'>): Promise<HobbyPost> => {
      const token = await getToken();
      return apiService.createHobbyPost(post, token);
    },

    // Reflections endpoints
    getReflections: async (): Promise<WeeklyReflection[]> => {
      const token = await getToken();
      return apiService.getReflections(token);
    },
    createReflection: async (reflection: Omit<WeeklyReflection, 'id' | 'userId' | 'createdAt'>): Promise<WeeklyReflection> => {
      const token = await getToken();
      return apiService.createReflection(reflection, token);
    },

    // Career tasks endpoints
    getCareerTasks: async (): Promise<CareerTask[]> => {
      const token = await getToken();
      return apiService.getCareerTasks(token);
    },
    createCareerTask: async (task: Omit<CareerTask, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<CareerTask> => {
      const token = await getToken();
      return apiService.createCareerTask(task, token);
    },
    updateCareerTask: async (taskId: string, task: Partial<CareerTask>): Promise<CareerTask> => {
      const token = await getToken();
      return apiService.updateCareerTask(taskId, task, token);
    },

    // AI endpoints
    aiChat: async (message: string, context?: any): Promise<{ response: string }> => {
      const token = await getToken();
      return apiService.aiChat(message, context, token);
    },
    generateRoutine: async (): Promise<{ routine: any }> => {
      const token = await getToken();
      return apiService.generateRoutine(token);
    },
    getStudyGuidance: async (subject: string, topic: string, level?: string): Promise<{ guidance: string }> => {
      const token = await getToken();
      return apiService.getStudyGuidance(subject, topic, level, token);
    },
    generateCareerTasks: async (): Promise<CareerTask[]> => {
      const token = await getToken();
      return apiService.generateCareerTasks(token);
    },

    // File upload endpoint
    uploadFile: async (file: File, type: 'hobby' | 'profile'): Promise<{ url: string }> => {
      const token = await getToken();
      return apiService.uploadFile(file, type, token);
    },

    // Health check (no auth needed)
    healthCheck: (): Promise<{ status: string; timestamp: string; version: string }> => apiService.healthCheck(),
  };

  return api;
};