import { Suspense } from 'react';
import { Spin } from 'antd';
import Statistics from '@/common/components/server_components/Statistics/Statistics';

export default function StatisticsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Estadísticas</h1>
        
        <Suspense fallback={
          <div className="flex justify-center items-center h-64">
            <Spin size="large" />
          </div>
        }>
          <Statistics />
        </Suspense>
      </div>
    </div>
  );
}
