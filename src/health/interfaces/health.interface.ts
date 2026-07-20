/**
 * Health Check Response Interface
 * Defines the structure of health check responses
 */
export interface IHealthCheck {
  status: 'ok' | 'error';
  timestamp: string;
  uptime: number;
  environment: string;
}

/**
 * Database Health Interface
 * Defines database connectivity status
 */
export interface IDatabaseHealth {
  connected: boolean;
  message: string;
}

/**
 * Full Health Status Interface
 */
export interface IHealthStatus {
  status: 'ok' | 'error';
  timestamp: string;
  uptime: number;
  environment: string;
  database?: IDatabaseHealth;
  version?: string;
}
