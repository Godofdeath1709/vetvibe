'use client';

import React from 'react';
import RouteGuard from '@/components/common/RouteGuard';
import PortalShell from '@/components/common/PortalShell';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default function AdminDashboardPage() {
  return (
    <RouteGuard allowedRoles={['admin']}>
      <PortalShell>
        <AdminDashboard />
      </PortalShell>
    </RouteGuard>
  );
}
