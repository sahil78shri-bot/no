// API service for communicating with backend
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
  async getProfile(token?: string) {
    return this.request('/profile', {}, token);
  }

  async updateProfile(profile: any, token?: string) {
    return this.request('/profile', {
      method: 'PUT',
      body: JSON.stringify(profile),
    }, token);
  }

  // Goals endpoints
  async getGoals(token?: string) {
    return this.request('/goals', {}, token);
  }

  async createGoal(goal: any, token?: string) {
    return this.request('/goals', {
      method: 'POST',
      body: JSON.stringify(goal),
    }, token);
  }

  async updateGoal(goalId: string, goal: any, token?: string) {
    return this.request(`/goals/${goalId}`, {
      method: 'PUT',
      body: JSON.stringify(goal),
    }, token);
  }

  async deleteGoal(goalId: string, token?: string) {
    return this.request(`/goals/${goalId}`, {
      method: 'DELETE',
    }, token);
  }

  // Habits endpoints
  async getHabits(token?: string) {
    return this.request('/habits', {}, token);
  }

  async createHabit(habit: any, token?: string) {
    return this.request('/habits', {
      method: 'POST',
      body: JSON.stringify(habit),
    }, token);
  }

  async updateHabit(habitId: string, habit: any, token?: string) {
    return this.request(`/habits/${habitId}`, {
      method: 'PUT',
      body: JSON.stringify(habit),
    }, token);
  }

  async deleteHabit(habitId: string, token?: string) {
    return this.request(`/habits/${habitId}`, {
      method: 'DELETE',
    }, token);
  }

  // Tasks endpoints
  async getTasks(token?: string) {
    return this.request('/tasks', {}, token);
  }

  async createTask(task: any, token?: string) {
    return this.request('/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    }, token);
  }

  async updateTask(taskId: string, task: any, token?: string) {
    return this.request(`/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(task),
    }, token);
  }

  async deleteTask(taskId: string, token?: string) {
    return this.request(`/tasks/${taskId}`, {
      method: 'DELETE',
    }, token);
  }

  // Stress logs endpoints
  async getStressLogs(token?: string) {
    return this.request('/stress', {}, token);
  }

  async createStressLog(log: any, token?: string) {
    return this.request('/stress', {
      method: 'POST',
      body: JSON.stringify(log),
    }, token);
  }

  // Focus sessions endpoints
  async getFocusSessions(token?: string) {
    return this.request('/focus', {}, token);
  }

  async createFocusSession(session: any, token?: string) {
    return this.request('/focus', {
      method: 'POST',
      body: JSON.stringify(session),
    }, token);
  }

  async updateFocusSession(sessionId: string, session: any, token?: string) {
    return this.request(`/focus/${sessionId}`, {
      method: 'PUT',
      body: JSON.stringify(session),
    }, token);
  }

  // Expenses endpoints
  async getExpenses(token?: string) {
    return this.request('/expenses', {}, token);
  }

  async createExpense(expense: any, token?: string) {
    return this.request('/expenses', {
      method: 'POST',
      body: JSON.stringify(expense),
    }, token);
  }

  async deleteExpense(expenseId: string, token?: string) {
    return this.request(`/expenses/${expenseId}`, {
      method: 'DELETE',
    }, token);
  }

  // Hobby posts endpoints
  async getHobbyPosts(token?: string) {
    return this.request('/hobbies', {}, token);
  }

  async createHobbyPost(post: any, token?: string) {
    return this.request('/hobbies', {
      method: 'POST',
      body: JSON.stringify(post),
    }, token);
  }

  // Reflections endpoints
  async getReflections(token?: string) {
    return this.request('/reflections', {}, token);
  }

  async createReflection(reflection: any, token?: string) {
    return this.request('/reflections', {
      method: 'POST',
      body: JSON.stringify(reflection),
    }, token);
  }

  // Career tasks endpoints
  async getCareerTasks(token?: string) {
    return this.request('/career', {}, token);
  }

  async createCareerTask(task: any, token?: string) {
    return this.request('/career', {
      method: 'POST',
      body: JSON.stringify(task),
    }, token);
  }

  async updateCareerTask(taskId: string, task: any, token?: string) {
    return this.request(`/career/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(task),
    }, token);
  }

  // AI endpoints
  async aiChat(message: string, context?: any, token?: string) {
    return this.request('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ message, context }),
    }, token);
  }

  async generateRoutine(token?: string) {
    return this.request('/ai/routine', {
      method: 'POST',
    }, token);
  }

  async getStudyGuidance(subject: string, topic: string, level?: string, token?: string) {
    return this.request('/ai/study', {
      method: 'POST',
      body: JSON.stringify({ subject, topic, level }),
    }, token);
  }

  async generateCareerTasks(token?: string) {
    return this.request('/ai/career', {
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
  async healthCheck() {
    return this.request('/health');
  }
}

export const apiService = new ApiService();