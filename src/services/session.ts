// Create a singleton session manager
class SessionManager {
  private static instance: SessionManager;
  private sessionId: string;

  private constructor() {
    this.sessionId = Math.random().toString(36).substring(2);
  }

  public static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
  }

  public getSessionId(): string {
    return this.sessionId;
  }
}

export const sessionManager = SessionManager.getInstance();