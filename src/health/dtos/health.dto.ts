import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Health Check Response DTO
 * Data Transfer Object for health check responses
 */
export class HealthCheckDto {
  /**
   * Health status - 'ok' for healthy, 'error' for unhealthy
   */
  @ApiProperty({
    type: String,
    enum: ['ok', 'error'],
    example: 'ok',
    description: 'Health status of the service',
  })
  status: 'ok' | 'error';

  /**
   * ISO timestamp of the health check
   */
  @ApiProperty({
    type: String,
    example: '2024-01-15T10:30:45.123Z',
    description: 'ISO timestamp of the health check',
  })
  timestamp: string;

  /**
   * Server uptime in seconds
   */
  @ApiProperty({
    type: Number,
    example: 3600,
    description: 'Server uptime in seconds',
  })
  uptime: number;

  /**
   * Current environment (dev, prod, test, etc.)
   */
  @ApiProperty({
    type: String,
    example: 'development',
    description: 'Current environment',
  })
  environment: string;

  /**
   * Application version
   */
  @ApiPropertyOptional({
    type: String,
    example: '1.0.0',
    description: 'Application version',
  })
  version?: string;

  /**
   * Database connectivity status
   */
  @ApiPropertyOptional({
    type: Object,
    properties: {
      connected: { type: 'boolean', example: true },
      message: { type: 'string', example: 'Database connection is active' },
    },
    description: 'Database connectivity status',
  })
  database?: {
    connected: boolean;
    message: string;
  };

  /**
   * Additional details
   */
  @ApiPropertyOptional({
    type: Object,
    example: {
      nodeVersion: 'v18.12.0',
      platform: 'darwin',
      memory: {
        heapUsed: 45,
        heapTotal: 120,
        rss: 150,
      },
    },
    description: 'Additional system details',
  })
  details?: Record<string, any>;
}

/**
 * Health Check Response for Simple Health Endpoint
 */
export class SimpleHealthDto {
  @ApiProperty({
    type: String,
    enum: ['ok', 'error'],
    example: 'ok',
    description: 'Service status',
  })
  status: 'ok' | 'error';

  @ApiProperty({
    type: String,
    example: 'Service is running',
    description: 'Status message',
  })
  message: string;

  @ApiProperty({
    type: String,
    example: '2024-01-15T10:30:45.123Z',
    description: 'ISO timestamp of the check',
  })
  timestamp: string;
}

/**
 * Kubernetes Liveness Probe Response DTO
 * Indicates if the service process is alive
 */
export class LivenessProbeDto {
  @ApiProperty({
    type: Boolean,
    example: true,
    description: 'Indicates if the service process is alive and responding',
  })
  alive: boolean;
}

/**
 * Kubernetes Readiness Probe Response DTO
 * Indicates if the service is ready to accept traffic
 */
export class ReadinessProbeDto {
  @ApiProperty({
    type: Boolean,
    example: true,
    description: 'Indicates if the service is ready to accept traffic from load balancers',
  })
  ready: boolean;
}
