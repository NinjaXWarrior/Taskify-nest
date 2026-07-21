import { Injectable } from '@nestjs/common';

export type Permission = `${string}:${string}`; // e.g. project:create, task:delete

@Injectable()
export class PermissionsService {
  // A simple in-memory permissions matrix mapping roles to allowed permissions.
  // In a real app this could come from DB or config.
  private matrix: Record<string, string[]> = {
    ADMIN: [
      'project:create',
      'project:update',
      'project:delete',
      'task:create',
      'task:update',
      'task:delete',
      'user:manage',
    ],
    MANAGER: [
      'project:create',
      'project:update',
      'task:create',
      'task:update',
      'task:delete',
    ],
    TEAM_LEAD: ['task:create', 'task:update'],
    EMPLOYEE: ['task:update'],
    USER: [],
  };

  hasPermission(roles: string[] | string, permission: string): boolean {
    const roleList = Array.isArray(roles) ? roles : [roles];

    for (const r of roleList) {
      const allowed = this.matrix[r] || [];
      if (allowed.includes(permission)) return true;
    }

    return false;
  }

  // Allow updating matrix at runtime
  setRolePermissions(role: string, permissions: Permission[]) {
    this.matrix[role] = permissions;
  }
}
