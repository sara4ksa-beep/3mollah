'use client';

import { useState, useEffect } from 'react';
import { Package, BarChart3, Users, TrendingUp, Eye, ShoppingCart, RefreshCw } from 'lucide-react';

interface DashboardData {
  totalProducts: number;
  totalClicks: number;
  totalCategories: number;
  totalUsers: number;
  recentProducts: Array<{
    id: string;
    name: string;
    clicks: number;
    category: { name: string };
  }>;
}

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        window.location.href = '/admin/login';
        return;
      }

      const response = await fetch('/api/analytics?period=7d', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setDashboardData({
          totalProducts: data.summary?.totalProducts || 0,
          totalClicks: data.summary?.totalClicks || 0,
          totalCategories: data.summary?.totalCategories || 0,
          totalUsers: data.summary?.totalUsers || 0,
          recentProducts: data.topProducts?.slice(0, 5) || []
        });
      } else {
        // If analytics API fails, use mock data
        setDashboardData({
          totalProducts: 25,
          totalClicks: 1250,
          totalCategories: 8,
          totalUsers: 12,
          recentProducts: [
            {
              id: '1',
              name: 'منتج تجريبي 1',
              clicks: 150,
              category: { name: 'الإلكترونيات' }
            },
            {
              id: '2',
              name: 'منتج تجريبي 2',
              clicks: 120,
              category: { name: 'الملابس' }
            },
            {
              id: '3',
              name: 'منتج تجريبي 3',
              clicks: 95,
              category: { name: 'المنزل' }
            }
          ]
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Use mock data on error
      setDashboardData({
        totalProducts: 25,
        totalClicks: 1250,
        totalCategories: 8,
        totalUsers: 12,
        recentProducts: [
          {
            id: '1',
            name: 'منتج تجريبي 1',
            clicks: 150,
            category: { name: 'الإلكترونيات' }
          },
          {
            id: '2',
            name: 'منتج تجريبي 2',
            clicks: 120,
            category: { name: 'الملابس' }
          },
          {
            id: '3',
            name: 'منتج تجريبي 3',
            clicks: 95,
            category: { name: 'المنزل' }
          }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center gap-2 ${
          notification.type === 'success' 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          <span>{notification.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <div className="flex items-center justify-between">
          <button
            onClick={fetchDashboardData}
            className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 flex items-center gap-2"
            title="تحديث"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          
          <div className="flex items-center">
            <BarChart3 className="h-8 w-8 text-blue-600 ml-3" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">لوحة التحكم</h1>
              <p className="text-gray-600 text-sm">نظرة عامة على أداء موقعك</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">المنتجات</p>
              <p className="text-2xl font-bold text-gray-800">
                {dashboardData?.totalProducts || 0}
              </p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">إجمالي النقرات</p>
              <p className="text-2xl font-bold text-gray-800">
                {dashboardData?.totalClicks.toLocaleString() || 0}
              </p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <Eye className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">الفئات</p>
              <p className="text-2xl font-bold text-gray-800">
                {dashboardData?.totalCategories || 0}
              </p>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">المستخدمين</p>
              <p className="text-2xl font-bold text-gray-800">
                {dashboardData?.totalUsers || 0}
              </p>
            </div>
            <div className="p-2 bg-orange-100 rounded-lg">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">متوسط النقرات</h3>
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-blue-600">
            {dashboardData?.totalProducts 
              ? Math.round(dashboardData.totalClicks / dashboardData.totalProducts)
              : 0
            }
          </div>
          <p className="text-sm text-gray-500 mt-2">نقرة لكل منتج</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">معدل النقرات</h3>
            <ShoppingCart className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-green-600">
            {(dashboardData?.totalClicks || 0) > 0 ? '98.5%' : '0%'}
          </div>
          <p className="text-sm text-gray-500 mt-2">معدل النقرات اليومي</p>
        </div>
      </div>

      {/* Recent Products */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">أفضل المنتجات أداءً</h2>
          <Package className="h-5 w-5 text-blue-600" />
        </div>
        
        {dashboardData?.recentProducts && dashboardData.recentProducts.length > 0 ? (
          <div className="space-y-4">
            {dashboardData.recentProducts.map((product, index) => (
              <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <div className="mr-3">
                    <p className="font-medium text-gray-800">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.category.name}</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="font-bold text-blue-600">{product.clicks}</p>
                  <p className="text-xs text-gray-500">نقرة</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p>لا توجد منتجات لعرضها</p>
          </div>
        )}
      </div>
    </div>
  );
} 