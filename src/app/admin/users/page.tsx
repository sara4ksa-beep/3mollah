'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Shield, 
  User, 
  UserCheck, 
  UserX, 
  Search, 
  Filter,
  MoreVertical,
  Eye,
  EyeOff,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  X
} from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  _count: {
    products: number;
    analytics: number;
  };
}

interface FormData {
  name: string;
  email: string;
  password: string;
  role: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [showFilters, setShowFilters] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    role: 'EDITOR'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [creatingDemoUser, setCreatingDemoUser] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Check if no users exist and create a demo user
  useEffect(() => {
    const checkAndCreateDemoUser = async () => {
      if (users.length === 0 && !loading) {
        try {
          const token = localStorage.getItem('adminToken');
          if (!token) {
            window.location.href = '/admin/login';
            return;
          }

          const response = await fetch('/api/users/demo', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.ok) {
            const result = await response.json();
            setUsers([result.user]);
            showNotification('success', `تم إنشاء مستخدم تجريبي تلقائياً. يمكنك استخدام بيانات الدخول: ${result.credentials.email} / ${result.credentials.password}`);
          }
        } catch (error) {
          console.error('Error creating demo user:', error);
        }
      }
    };

    checkAndCreateDemoUser();
  }, [users.length, loading]);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, roleFilter, statusFilter]);

  const filterUsers = () => {
    let filtered = users;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Role filter
    if (roleFilter !== 'ALL') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    // Status filter
    if (statusFilter !== 'ALL') {
      const isActive = statusFilter === 'ACTIVE';
      filtered = filtered.filter(user => user.isActive === isActive);
    }

    setFilteredUsers(filtered);
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      if (!token) {
        window.location.href = '/admin/login';
        return;
      }

      const response = await fetch('/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        showNotification('error', 'فشل في جلب المستخدمين');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      showNotification('error', 'حدث خطأ في جلب المستخدمين');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setShowAddForm(false);
        setFormData({ name: '', email: '', password: '', role: 'EDITOR' });
        fetchUsers();
        showNotification('success', 'تم إنشاء المستخدم بنجاح');
      } else {
        const error = await response.json();
        showNotification('error', error.error || 'حدث خطأ في إنشاء المستخدم');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      showNotification('error', 'حدث خطأ في إنشاء المستخدم');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditUser = async (userId: string, updates: Partial<User>) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      });

      if (response.ok) {
        fetchUsers();
        setEditingUser(null);
        showNotification('success', 'تم تحديث المستخدم بنجاح');
      } else {
        const error = await response.json();
        showNotification('error', error.error || 'حدث خطأ في تحديث المستخدم');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      showNotification('error', 'حدث خطأ في تحديث المستخدم');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المستخدم؟')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchUsers();
        showNotification('success', 'تم حذف المستخدم بنجاح');
      } else {
        const error = await response.json();
        showNotification('error', error.error || 'حدث خطأ في حذف المستخدم');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      showNotification('error', 'حدث خطأ في حذف المستخدم');
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const createDemoUser = async () => {
    setCreatingDemoUser(true);
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        window.location.href = '/admin/login';
        return;
      }

      const response = await fetch('/api/users/demo', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        setUsers([result.user]);
        showNotification('success', `تم إنشاء مستخدم تجريبي بنجاح. يمكنك استخدام بيانات الدخول: ${result.credentials.email} / ${result.credentials.password}`);
      } else {
        const error = await response.json();
        showNotification('error', error.error || 'حدث خطأ في إنشاء المستخدم التجريبي');
      }
    } catch (error) {
      console.error('Error creating demo user:', error);
      showNotification('error', 'حدث خطأ في إنشاء المستخدم التجريبي');
    } finally {
      setCreatingDemoUser(false);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return <Shield className="h-4 w-4 text-red-600" />;
      case 'ADMIN':
        return <UserCheck className="h-4 w-4 text-blue-600" />;
      case 'EDITOR':
        return <Edit className="h-4 w-4 text-green-600" />;
      case 'VIEWER':
        return <User className="h-4 w-4 text-gray-600" />;
      default:
        return <User className="h-4 w-4 text-gray-600" />;
    }
  };

  const getRoleName = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return 'مدير عام';
      case 'ADMIN':
        return 'مدير';
      case 'EDITOR':
        return 'محرر';
      case 'VIEWER':
        return 'مشاهد';
      default:
        return role;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'ADMIN':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'EDITOR':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'VIEWER':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center gap-2 max-w-md ${
          notification.type === 'success' 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          {notification.type === 'success' ? (
            <CheckCircle className="h-5 w-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
          )}
          <span className="text-sm">{notification.message}</span>
          <button
            onClick={() => setNotification(null)}
            className="mr-2 hover:opacity-70 flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">إدارة المستخدمين</h1>
              <p className="text-gray-600 text-sm">إدارة حسابات المستخدمين والصلاحيات</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={fetchUsers}
              className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 flex items-center gap-2"
              title="تحديث"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              إضافة مستخدم
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="البحث في المستخدمين..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              فلاتر
            </button>
          </div>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الصلاحية</label>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ALL">جميع الصلاحيات</option>
                <option value="SUPER_ADMIN">مدير عام</option>
                <option value="ADMIN">مدير</option>
                <option value="EDITOR">محرر</option>
                <option value="VIEWER">مشاهد</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ALL">جميع الحالات</option>
                <option value="ACTIVE">نشط</option>
                <option value="INACTIVE">غير نشط</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Add User Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">إضافة مستخدم جديد</h2>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الاسم</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الصلاحية</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="VIEWER">مشاهد</option>
                  <option value="EDITOR">محرر</option>
                  <option value="ADMIN">مدير</option>
                  <option value="SUPER_ADMIN">مدير عام</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    جاري الإضافة...
                  </>
                ) : (
                  'إضافة المستخدم'
                )}
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">إجمالي المستخدمين</p>
              <p className="text-2xl font-bold text-gray-800">{users.length}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">المستخدمين النشطين</p>
              <p className="text-2xl font-bold text-green-600">
                {users.filter(u => u.isActive).length}
              </p>
            </div>
            <UserCheck className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">المديرين</p>
              <p className="text-2xl font-bold text-blue-600">
                {users.filter(u => u.role === 'ADMIN' || u.role === 'SUPER_ADMIN').length}
              </p>
            </div>
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">المحررين</p>
              <p className="text-2xl font-bold text-green-600">
                {users.filter(u => u.role === 'EDITOR').length}
              </p>
            </div>
            <Edit className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-right py-3 px-4 font-medium text-gray-700">المستخدم</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">الصلاحية</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">الحالة</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">المنتجات</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">تاريخ الإنشاء</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-500">
                    <div className="flex flex-col items-center">
                      <Users className="h-12 w-12 text-gray-300 mb-4" />
                      {users.length === 0 ? (
                        <>
                          <p className="text-lg font-medium">لا توجد مستخدمين في النظام</p>
                          <p className="text-sm text-gray-400 mb-4">سيتم إنشاء مستخدم تجريبي تلقائياً أو يمكنك إنشاؤه يدوياً</p>
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md">
                            <p className="text-sm text-blue-800 font-medium mb-2">بيانات المستخدم التجريبي:</p>
                            <p className="text-xs text-blue-600">البريد الإلكتروني: demo@example.com</p>
                            <p className="text-xs text-blue-600">كلمة المرور: demo123456</p>
                            <button
                              onClick={createDemoUser}
                              disabled={creatingDemoUser}
                              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
                            >
                              {creatingDemoUser ? (
                                <>
                                  <RefreshCw className="h-4 w-4 animate-spin" />
                                  جاري الإنشاء...
                                </>
                              ) : (
                                <>
                                  <Plus className="h-4 w-4" />
                                  إنشاء المستخدم التجريبي
                                </>
                              )}
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <p className="text-lg font-medium">لا توجد مستخدمين</p>
                          <p className="text-sm text-gray-400">جرب تغيير الفلاتر أو إضافة مستخدم جديد</p>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-800">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                        {getRoleIcon(user.role)}
                        {getRoleName(user.role)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        user.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.isActive ? (
                          <>
                            <UserCheck className="h-3 w-3 mr-1" />
                            نشط
                          </>
                        ) : (
                          <>
                            <UserX className="h-3 w-3 mr-1" />
                            غير نشط
                          </>
                        )}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-sm text-gray-600">{user._count.products}</span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString('ar-SA')}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingUser(user)}
                          className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                          title="تعديل"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                          title="حذف"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">تعديل المستخدم</h2>
              <button
                onClick={() => setEditingUser(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الاسم</label>
                <input
                  type="text"
                  defaultValue={editingUser.name}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الصلاحية</label>
                <select
                  defaultValue={editingUser.role}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="VIEWER">مشاهد</option>
                  <option value="EDITOR">محرر</option>
                  <option value="ADMIN">مدير</option>
                  <option value="SUPER_ADMIN">مدير عام</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
                <select
                  defaultValue={editingUser.isActive ? 'true' : 'false'}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="true">نشط</option>
                  <option value="false">غير نشط</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setEditingUser(null)}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                حفظ التغييرات
              </button>
              <button
                onClick={() => setEditingUser(null)}
                className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 