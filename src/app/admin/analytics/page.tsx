'use client';

import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, ShoppingCart, Calendar, Filter, Eye, Activity } from 'lucide-react';
import AdminSidebar from '@/components/AdminSidebar';

interface AnalyticsData {
  summary: {
    totalClicks: number;
    totalProducts: number;
    totalCategories: number;
  };
  topProducts: Array<{
    id: string;
    name: string;
    clicks: number;
    category: { name: string };
  }>;
  categoryStats: Array<{
    id: string;
    name: string;
    _count: { products: number };
    totalClicks: number;
  }>;
  dailyStats: Array<{
    date: string;
    clicks: number;
  }>;
  recentClicks: Array<{
    id: string;
    clickedAt: string;
    ipAddress: string;
    product: { name: string; category: { name: string } };
  }>;
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('7d');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkAuth();
    fetchAnalytics();
  }, [period, categoryFilter]);

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken');
    const userData = localStorage.getItem('adminUser');
    
    if (!token || !userData) {
      window.location.href = '/admin/login';
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch (error) {
      console.error('Error parsing user data:', error);
      window.location.href = '/admin/login';
    }
  };

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        window.location.href = '/admin/login';
        return;
      }

      const params = new URLSearchParams({ period });
      if (categoryFilter) {
        params.append('categoryId', categoryFilter);
      }

      const response = await fetch(`/api/analytics?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      } else {
        console.error('Failed to fetch analytics');
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    window.location.href = '/admin/login';
  };

  if (loading || !user) {
    return (
      <div className="flex h-screen">
        <div className="flex-1 bg-gray-100">
          <div className="p-6">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-24 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="flex h-screen bg-gray-100">
        <AdminSidebar 
          userRole={user.role} 
          userName={user.name} 
          onLogout={handleLogout} 
        />
        <div className="flex-1 mr-64">
          <div className="p-6">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              حدث خطأ في تحميل الإحصائيات
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar 
        userRole={user.role} 
        userName={user.name} 
        onLogout={handleLogout} 
      />

      {/* Main Content */}
      <div className="flex-1 mr-64">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-800 text-heading">الإحصائيات المفصلة</h1>
            </div>
            
            {/* Filters */}
            <div className="flex items-center gap-4">
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7d">آخر 7 أيام</option>
                <option value="30d">آخر 30 يوم</option>
                <option value="90d">آخر 90 يوم</option>
                <option value="all">جميع الفترات</option>
              </select>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <div className="mr-4">
                  <p className="text-sm text-gray-600 text-body">إجمالي النقرات</p>
                  <p className="text-2xl font-bold text-gray-800 text-heading">{analytics.summary.totalClicks.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <ShoppingCart className="h-6 w-6 text-green-600" />
                </div>
                <div className="mr-4">
                  <p className="text-sm text-gray-600 text-body">المنتجات</p>
                  <p className="text-2xl font-bold text-gray-800 text-heading">{analytics.summary.totalProducts}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Filter className="h-6 w-6 text-purple-600" />
                </div>
                <div className="mr-4">
                  <p className="text-sm text-gray-600 text-body">الفئات</p>
                  <p className="text-2xl font-bold text-gray-800 text-heading">{analytics.summary.totalCategories}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
                <div className="mr-4">
                  <p className="text-sm text-gray-600 text-body">متوسط النقرات</p>
                  <p className="text-2xl font-bold text-gray-800 text-heading">
                    {analytics.summary.totalProducts > 0 
                      ? Math.round(analytics.summary.totalClicks / analytics.summary.totalProducts)
                      : 0
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Top Products */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <Activity className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-800 text-subheading">أفضل المنتجات أداءً</h2>
              </div>
              <div className="space-y-4">
                {analytics.topProducts.length > 0 ? (
                  analytics.topProducts.map((product, index) => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center">
                        <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        <div className="mr-3">
                          <p className="font-medium text-gray-800 text-body">{product.name}</p>
                          <p className="text-sm text-gray-500 text-caption">{product.category.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-blue-600 text-heading">{product.clicks}</p>
                        <p className="text-xs text-gray-500 text-caption">نقرة</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-body">لا توجد بيانات متاحة</p>
                  </div>
                )}
              </div>
            </div>

            {/* Category Performance */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <Filter className="h-6 w-6 text-green-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-800 text-subheading">أداء الفئات</h2>
              </div>
              <div className="space-y-4">
                {analytics.categoryStats.length > 0 ? (
                  analytics.categoryStats.map((category) => (
                    <div key={category.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div>
                        <p className="font-medium text-gray-800 text-body">{category.name}</p>
                        <p className="text-sm text-gray-500 text-caption">{category._count.products} منتج</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600 text-heading">{category.totalClicks}</p>
                        <p className="text-xs text-gray-500 text-caption">نقرة</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-body">لا توجد بيانات متاحة</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-6">
              <Eye className="h-6 w-6 text-purple-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800 text-subheading">النشاط الأخير</h2>
            </div>
            <div className="overflow-x-auto">
              {analytics.recentClicks.length > 0 ? (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-right py-3 px-4 font-medium text-gray-700 text-subheading">المنتج</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700 text-subheading">الفئة</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700 text-subheading">عنوان IP</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700 text-subheading">التاريخ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.recentClicks.map((click) => (
                      <tr key={click.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-body">{click.product.name}</td>
                        <td className="py-3 px-4 text-gray-500 text-caption">{click.product.category.name}</td>
                        <td className="py-3 px-4 text-gray-500 text-caption">{click.ipAddress}</td>
                        <td className="py-3 px-4 text-gray-500 text-caption">
                          {new Date(click.clickedAt).toLocaleDateString('ar-SA')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-8">
                  <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-body">لا توجد نشاطات حديثة</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 