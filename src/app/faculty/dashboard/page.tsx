'use client';

import React from 'react';
import RouteGuard from '@/components/common/RouteGuard';
import PortalShell from '@/components/common/PortalShell';
import FacultyDashboard from '@/components/faculty/FacultyDashboard';

export default function FacultyDashboardPage() {
  return (
    <RouteGuard allowedRoles={['faculty']}>
      <PortalShell>
        <FacultyDashboard />
      </PortalShell>
    </RouteGuard>
  );
}
