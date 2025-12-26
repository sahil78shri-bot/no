import { useAuth0 } from '@auth0/auth0-react';
import { apiService } from '../services/api';

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
    getProfile: async () => {
      const token = await getToken();
      return apiService.getProfile(token);
    },
    updateProfile: async (profile: any) => {
      const token = await getToken();
      return apiService.updateProfile(profile, token);
    },

    // Goals endpoints
    getGoals: async () => {
      const token = await getToken();
      return apiService.getGoals(token);
    },
    createGoal: async (goal: any) => {
      const token = await getToken();
      return apiService.createGoal(goal, token);
    },
    updateGoal: async (goalId: string, goal: any) => {
      const token = await getToken();
      return apiService.updateGoal(goalId, goal, token);
    },
    deleteGoal: async (goalId: string) => {
      const token = await getToken();
      return apiService.deleteGoal(goalId, token);
    },

    // Habits endpoints
    getHabits: async () => {
      const token = await getToken();
      return apiService.getHabits(token);
    },
    createHabit: async (habit: any) => {
      const token = await getToken();
      return apiService.createHabit(habit, token);
    },
    updateHabit: async (habitId: string, habit: any) => {
      const token = await getToken();
      return apiService.updateHabit(habitId, habit, token);
    },
    deleteHabit: async (habitId: string) => {
      const token = await getToken();
      return apiService.deleteHabit(habitId, token);
    },

    // Tasks endpoints
    getTasks: async () => {
      const token = await getToken();
      return apiService.getTasks(token);
    },
    createTask: async (task: any) => {
      const token = await getToken();
      return apiService.createTask(task, token);
    },
    updateTask: async (taskId: string, task: any) => {
      const token = await getToken();
      return apiService.updateTask(taskId, task, token);
    },
    deleteTask: async (taskId: string) => {
      const token = await getToken();
      return apiService.deleteTask(taskId, token);
    },

    // Stress logs endpoints
    getStressLogs: async () => {
      const token = await getToken();
      return apiService.getStressLogs(token);
    },
    createStressLog: async (log: any) => {
      const token = await getToken();
      return apiService.createStressLog(log, token);
    },

    // Focus sessions endpoints
    getFocusSessions: async () => {
      const token = await getToken();
      return apiService.getFocusSessions(token);
    },
    createFocusSession: async (session: any) => {
      const token = await getToken();
      return apiService.createFocusSession(session, token);
    },
    updateFocusSession: async (sessionId: string, session: any) => {
      const token = await getToken();
      return apiService.updateFocusSession(sessionId, session, token);
    },

    // Expenses endpoints
    getExpenses: async () => {
      const token = await getToken();
      return apiService.getExpenses(token);
    },
    createExpense: async (expense: any) => {
      const token = await getToken();
      return apiService.createExpense(expense, token);
    },
    deleteExpense: async (expenseId: string) => {
      const token = await getToken();
      return apiService.deleteExpense(expenseId, token);
    },

    // Hobby posts endpoints
    getHobbyPosts: async () => {
      const token = await getToken();
      return apiService.getHobbyPosts(token);
    },
    createHobbyPost: async (post: any) => {
      const token = await getToken();
      return apiService.createHobbyPost(post, token);
    },

    // Reflections endpoints
    getReflections: async () => {
      const token = await getToken();
      return apiService.getReflections(token);
    },
    createReflection: async (reflection: any) => {
      const token = await getToken();
      return apiService.createReflection(reflection, token);
    },

    // Career tasks endpoints
    getCareerTasks: async () => {
      const token = await getToken();
      return apiService.getCareerTasks(token);
    },
    createCareerTask: async (task: any) => {
      const token = await getToken();
      return apiService.createCareerTask(task, token);
    },
    updateCareerTask: async (taskId: string, task: any) => {
      const token = await getToken();
      return apiService.updateCareerTask(taskId, task, token);
    },

    // AI endpoints
    aiChat: async (message: string, context?: any) => {
      const token = await getToken();
      return apiService.aiChat(message, context, token);
    },
    generateRoutine: async () => {
      const token = await getToken();
      return apiService.generateRoutine(token);
    },
    getStudyGuidance: async (subject: string, topic: string, level?: string) => {
      const token = await getToken();
      return apiService.getStudyGuidance(subject, topic, level, token);
    },
    generateCareerTasks: async () => {
      const token = await getToken();
      return apiService.generateCareerTasks(token);
    },

    // File upload endpoint
    uploadFile: async (file: File, type: 'hobby' | 'profile') => {
      const token = await getToken();
      return apiService.uploadFile(file, type, token);
    },

    // Health check (no auth needed)
    healthCheck: () => apiService.healthCheck(),
  };

  return api;
};