/**
 * Health Module Constants
 */

export const HEALTH_CONSTANTS = {
  /**
   * Health status values
   */
  STATUS: {
    OK: 'ok' as const,
    ERROR: 'error' as const,
  },

  /**
   * Health check response messages
   */
  MESSAGES: {
    HEALTHY: 'Service is running' as const,
    UNHEALTHY: 'Service is down' as const,
    READY: 'Service is ready to accept traffic' as const,
    NOT_READY: 'Service is not ready' as const,
    ALIVE: 'Service is alive' as const,
    DEAD: 'Service is dead' as const,
  },

  /**
   * Default configuration
   */
  DEFAULT_ENVIRONMENT: 'development' as const,
  DEFAULT_VERSION: '1.0.0' as const,
};
