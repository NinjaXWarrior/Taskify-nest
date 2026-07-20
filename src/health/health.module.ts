import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

/**
 * Health Module
 * Provides health check and monitoring endpoints
 * Features:
 * - Basic health check
 * - Detailed health status with uptime
 * - Full health status with all metrics
 * - Kubernetes liveness and readiness probes
 */
@Module({
  controllers: [HealthController],
  providers: [HealthService],
  exports: [HealthService],
})
export class HealthModule {}
