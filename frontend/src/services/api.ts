// API service for communicating with backend
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
  StudentProfile,
  ApiResponse 
} from '../types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://nomore-backend.onrender.com/api'
    : 'http://localhost:3001/api');

class ApiService {
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {},
    token?: string
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Profile endpoints
  async getProfile(token?: string): Promise<StudentProfile> {
    return this.request<StudentProfile>('/profile', {}, token);
  }

  async updateProfile(profile: Partial<StudentProfile>, token?: string): Promise<StudentProfile> {
    return this.request<StudentProfile>('/profile', {
      method: 'PUT',
      body: JSON.stringify(profile),
    }, token);
  }

  // Goals endpoints
  async getGoals(token?: string): Promise<Goal[]> {
    return this.request<Goal[]>('/goals', {}, token);
  }

  async createGoal(goal: Omit<Goal, 'id' | 'userId' | 'createdAt' | 'updatedAt'>, token?: string): Promise<Goal> {
    return this.request<Goal>('/goals', {
      method: 'POST',
      body: JSON.stringify(goal),
    }, token);
  }

  async updateGoal(goalId: string, goal: Partial<Goal>, token?: string): Promise<Goal> {
    return this.request<Goal>(`/goals/${goalId}`, {
      method: 'PUT',
      body: JSON.stringify(goal),
    }, token);
  }

  async deleteGoal(goalId: string, token?: string): Promise<void> {
    return this.request<void>(`/goals/${goalId}`, {
      method: 'DELETE',
    }, token);
  }

  // Habits endpoints
  async getHabits(token?: string): Promise<Habit[]> {
    return this.request<Habit[]>('/habits', {}, token);
  }

  async createHabit(habit: Omit<Habit, 'id' | 'userId' | 'createdAt' | 'updatedAt'>, token?: string): Promise<Habit> {
    return this.request<Habit>('/habits', {
      method: 'POST',
      body: JSON.stringify(habit),
    }, token);
  }

  async updateHabit(habitId: string, habit: Partial<Habit>, token?: string): Promise<Habit> {
    return this.request<Habit>(`/habits/${habitId}`, {
      method: 'PUT',
      body: JSON.stringify(habit),
    }, token);
  }

  async deleteHabit(habitId: string, token?: string): Promise<void> {
    return this.request<void>(`/habits/${habitId}`, {
      method: 'DELETE',
    }, token);
  }

  // Tasks endpoints
  async getTasks(token?: string): Promise<Task[]> {
    return this.request<Task[]>('/tasks', {}, token);
  }

  async createTask(task: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>, token?: string): Promise<Task> {
    return this.request<Task>('/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    }, token);
  }

  async updateTask(taskId: string, task: Partial<Task>, token?: string): Promise<Task> {
    return this.request<Task>(`/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(task),
    }, token);
  }

  async deleteTask(taskId: string, token?: string): Promise<void> {
    return this.request<void>(`/tasks/${taskId}`, {
      method: 'DELETE',
    }, token);
  }

  // Stress logs endpoints
  async getStressLogs(token?: string): Promise<StressLog[]> {
    return this.request<StressLog[]>('/stress', {}, token);
  }

  async createStressLog(log: Omit<StressLog, 'id' | 'userId' | 'createdAt'>, token?: string): Promise<StressLog> {
    return this.request<StressLog>('/stress', {
      method: 'POST',
      body: JSON.stringify(log),
    }, token);
  }

  // Focus sessions endpoints
  async getFocusSessions(token?: string): Promise<FocusSession[]> {
    return this.request<FocusSession[]>('/focus', {}, token);
  }

  async createFocusSession(session: Omit<FocusSession, 'id' | 'userId' | 'createdAt'>, token?: string): Promise<FocusSession> {
    return this.request<FocusSession>('/focus', {
      method: 'POST',
      body: JSON.stringify(session),
    }, token);
  }

  async updateFocusSession(sessionId: string, session: Partial<FocusSession>, token?: string): Promise<FocusSession> {
    return this.request<FocusSession>(`/focus/${sessionId}`, {
      method: 'PUT',
      body: JSON.stringify(session),
    }, token);
  }

  // Expenses endpoints
  async getExpenses(token?: string): Promise<Expense[]> {
    return this.request<Expense[]>('/expenses', {}, token);
  }

  async createExpense(expense: Omit<Expense, 'id' | 'userId' | 'createdAt'>, token?: string): Promise<Expense> {
    return this.request<Expense>('/expenses', {
      method: 'POST',
      body: JSON.stringify(expense),
    }, token);
  }

  async deleteExpense(expenseId: string, token?: string): Promise<void> {
    return this.request<void>(`/expenses/${expenseId}`, {
      method: 'DELETE',
    }, token);
  }

  // Hobby posts endpoints
  async getHobbyPosts(token?: string): Promise<HobbyPost[]> {
    return this.request<HobbyPost[]>('/hobbies', {}, token);
  }

  async createHobbyPost(post: Omit<HobbyPost, 'id' | 'userId' | 'createdAt'>, token?: string): Promise<HobbyPost> {
    return this.request<HobbyPost>('/hobbies', {
      method: 'POST',
      body: JSON.stringify(post),
    }, token);
  }

  // Reflections endpoints
  async getReflections(token?: string): Promise<WeeklyReflection[]> {
    return this.request<WeeklyReflection[]>('/reflections', {}, token);
  }

  async createReflection(reflection: Omit<WeeklyReflection, 'id' | 'userId' | 'createdAt'>, token?: string): Promise<WeeklyReflection> {
    return this.request<WeeklyReflection>('/reflections', {
      method: 'POST',
      body: JSON.stringify(reflection),
    }, token);
  }

  // Career tasks endpoints
  async getCareerTasks(token?: string): Promise<CareerTask[]> {
    return this.request<CareerTask[]>('/career', {}, token);
  }

  async createCareerTask(task: Omit<CareerTask, 'id' | 'userId' | 'createdAt' | 'updatedAt'>, token?: string): Promise<CareerTask> {
    return this.request<CareerTask>('/career', {
      method: 'POST',
      body: JSON.stringify(task),
    }, token);
  }

  async updateCareerTask(taskId: string, task: Partial<CareerTask>, token?: string): Promise<CareerTask> {
    return this.request<CareerTask>(`/career/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(task),
    }, token);
  }

  // AI endpoints
  async aiChat(message: string, context?: any, token?: string): Promise<{ response: string }> {
    return this.request<{ response: string }>('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ message, context }),
    }, token);
  }

  async generateRoutine(token?: string): Promise<{ routine: any }> {
    return this.request<{ routine: any }>('/ai/routine', {
      method: 'POST',
    }, token);
  }

  async getStudyGuidance(subject: string, topic: string, level?: string, token?: string): Promise<{ guidance: string }> {
    return this.request<{ guidance: string }>('/ai/study', {
      method: 'POST',
      body: JSON.stringify({ subject, topic, level }),
    }, token);
  }

  async generateCareerTasks(token?: string): Promise<CareerTask[]> {
    return this.request<CareerTask[]>('/ai/career', {
      method: 'POST',
    }, token);
  }

  // File upload endpoint
  async uploadFile(file: File, type: 'hobby' | 'profile', token?: string): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('File upload failed');
    }

    return await response.json();
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string; version: string }> {
    return this.request<{ status: string; timestamp: string; version: string }>('/health');
  }
}

export const apiService = new ApiService();