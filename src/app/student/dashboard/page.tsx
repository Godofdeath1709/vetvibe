'use client';

import React from 'react';
import RouteGuard from '@/components/common/RouteGuard';
import PortalShell from '@/components/common/PortalShell';
import StudentDashboard from '@/components/student/StudentDashboard';

export default function StudentDashboardPage() {
  return (
    <RouteGuard allowedRoles={['student']}>
      <PortalShell>
        <StudentDashboard />
      </PortalShell>
    </RouteGuard>
  );
}
