'use client';

import { useState, useEffect } from 'react';
import { 
  Settings, 
  Save, 
  Globe, 
  Bell, 
  Shield, 
  Palette, 
  Database, 
  Mail,
  CreditCard,
  Users,
  FileText,
  AlertCircle,
  CheckCircle,
  X,
  RefreshCw,
  Eye,
  EyeOff,
  Trash2,
  Plus,
  Edit
} from 'lucide-react';

interface SiteSettings {
  // General Settings
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  contactEmail: string;
  supportPhone: string;
  
  // Localization
  defaultLanguage: string;
  timezone: string;
  currency: string;
  dateFormat: string;
  
  // System Settings
  analyticsEnabled: boolean;
  maintenanceMode: boolean;
  allowRegistration: boolean;
  emailNotifications: boolean;
  autoBackup: boolean;
  
  // SEO Settings
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  googleAnalytics: string;
  
  // Social Media
  facebookUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  
  // Commission Settings
  defaultCommission: number;
  minCommission: number;
  maxCommission: number;
  
  // Security Settings
  sessionTimeout: number;
  maxLoginAttempts: number;
  requireTwoFactor: boolean;
}

interface BackupFile {
  id: string;
  name: string;
  size: string;
  createdAt: string;
  type: 'manual' | 'auto';
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({
    // General Settings
    siteName: 'موقع البيع بالعمولة',
    siteDescription: 'موقع متخصص في البيع بالعمولة للمنتجات الإلكترونية',
    siteUrl: 'https://example.com',
    contactEmail: 'admin@example.com',
    supportPhone: '+966501234567',
    
    // Localization
    defaultLanguage: 'ar',
    timezone: 'Asia/Riyadh',
    currency: 'SAR',
    dateFormat: 'DD/MM/YYYY',
    
    // System Settings
    analyticsEnabled: true,
    maintenanceMode: false,
    allowRegistration: true,
    emailNotifications: true,
    autoBackup: true,
    
    // SEO Settings
    metaTitle: 'موقع البيع بالعمولة - تسوق بذكاء',
    metaDescription: 'موقع البيع بالعمولة - نروج منتجات التجار مقابل عمولة من كل عملية بيع',
    metaKeywords: 'بيع بالعمولة, تسويق, منتجات, عمولة',
    googleAnalytics: '',
    
    // Social Media
    facebookUrl: '',
    twitterUrl: '',
    instagramUrl: '',
    linkedinUrl: '',
    
    // Commission Settings
    defaultCommission: 10,
    minCommission: 5,
    maxCommission: 50,
    
    // Security Settings
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    requireTwoFactor: false,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [backups, setBackups] = useState<BackupFile[]>([]);
  const [showBackupModal, setShowBackupModal] = useState(false);

  useEffect(() => {
    fetchSettings();
    fetchBackups();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      // In a real app, you would fetch settings from API
      // For now, we'll use default values
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    } catch (error) {
      console.error('Error fetching settings:', error);
      showNotification('error', 'حدث خطأ في جلب الإعدادات');
    } finally {
      setLoading(false);
    }
  };

  const fetchBackups = async () => {
    // Simulate fetching backup files
    setBackups([
      {
        id: '1',
        name: 'backup-2024-01-15.sql',
        size: '2.5 MB',
        createdAt: '2024-01-15T10:30:00Z',
        type: 'auto'
      },
      {
        id: '2',
        name: 'backup-2024-01-10.sql',
        size: '2.3 MB',
        createdAt: '2024-01-10T10:30:00Z',
        type: 'manual'
      }
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });

      if (response.ok) {
        showNotification('success', 'تم حفظ الإعدادات بنجاح');
      } else {
        const error = await response.json();
        showNotification('error', error.error || 'حدث خطأ في حفظ الإعدادات');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      showNotification('error', 'حدث خطأ في حفظ الإعدادات');
    } finally {
      setSaving(false);
    }
  };

  const createBackup = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/settings/backup', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        showNotification('success', 'تم إنشاء النسخة الاحتياطية بنجاح');
        fetchBackups();
        setShowBackupModal(false);
      } else {
        const error = await response.json();
        showNotification('error', error.error || 'حدث خطأ في إنشاء النسخة الاحتياطية');
      }
    } catch (error) {
      console.error('Error creating backup:', error);
      showNotification('error', 'حدث خطأ في إنشاء النسخة الاحتياطية');
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const tabs = [
    { id: 'general', name: 'الإعدادات العامة', icon: Globe },
    { id: 'localization', name: 'اللغة والعملة', icon: Palette },
    { id: 'system', name: 'إعدادات النظام', icon: Database },
    { id: 'seo', name: 'تحسين محركات البحث', icon: FileText },
    { id: 'social', name: 'وسائل التواصل', icon: Users },
    { id: 'commission', name: 'إعدادات العمولة', icon: CreditCard },
    { id: 'security', name: 'الأمان', icon: Shield },
    { id: 'backup', name: 'النسخ الاحتياطي', icon: Database },
  ];

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
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
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center gap-2 ${
          notification.type === 'success' 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          {notification.type === 'success' ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <AlertCircle className="h-5 w-5" />
          )}
          <span>{notification.message}</span>
          <button
            onClick={() => setNotification(null)}
            className="ml-2 hover:opacity-70"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <div className="flex items-center justify-between">
          <button
            onClick={fetchSettings}
            className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 flex items-center gap-2"
            title="تحديث"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          
          <div className="flex items-center">
            <Settings className="h-8 w-8 text-blue-600 ml-3" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">إعدادات الموقع</h1>
              <p className="text-gray-600 text-sm">إدارة إعدادات الموقع والمنظومة</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-reverse space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                  <Icon className="h-4 w-4" />
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Settings */}
        {activeTab === 'general' && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">الإعدادات العامة</h2>
              <Globe className="h-6 w-6 text-blue-600 ml-3" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اسم الموقع</label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">رابط الموقع</label>
                <input
                  type="url"
                  value={settings.siteUrl}
                  onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">وصف الموقع</label>
                <textarea
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني للتواصل</label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف للدعم</label>
                <input
                  type="tel"
                  value={settings.supportPhone}
                  onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Localization Settings */}
        {activeTab === 'localization' && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">إعدادات اللغة والعملة</h2>
              <Palette className="h-6 w-6 text-green-600 ml-3" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اللغة الافتراضية</label>
                <select
                  value={settings.defaultLanguage}
                  onChange={(e) => setSettings({ ...settings, defaultLanguage: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ar">العربية</option>
                  <option value="en">English</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المنطقة الزمنية</label>
                <select
                  value={settings.timezone}
                  onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Asia/Riyadh">الرياض (GMT+3)</option>
                  <option value="Asia/Dubai">دبي (GMT+4)</option>
                  <option value="Asia/Kuwait">الكويت (GMT+3)</option>
                  <option value="Asia/Qatar">قطر (GMT+3)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">العملة</label>
                <select
                  value={settings.currency}
                  onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="SAR">ريال سعودي (SAR)</option>
                  <option value="AED">درهم إماراتي (AED)</option>
                  <option value="KWD">دينار كويتي (KWD)</option>
                  <option value="QAR">ريال قطري (QAR)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">تنسيق التاريخ</label>
                <select
                  value={settings.dateFormat}
                  onChange={(e) => setSettings({ ...settings, dateFormat: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* System Settings */}
        {activeTab === 'system' && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">إعدادات النظام</h2>
              <Database className="h-6 w-6 text-purple-600 ml-3" />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div>
                    <p className="font-medium text-gray-800">تفعيل الإحصائيات</p>
                    <p className="text-sm text-gray-500">تتبع النقرات والإحصائيات</p>
                  </div>
                  <Bell className="h-5 w-5 text-blue-600 ml-3" />
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.analyticsEnabled}
                    onChange={(e) => setSettings({ ...settings, analyticsEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div>
                    <p className="font-medium text-gray-800">وضع الصيانة</p>
                    <p className="text-sm text-gray-500">إيقاف الموقع مؤقتاً للصيانة</p>
                  </div>
                  <Shield className="h-5 w-5 text-orange-600 ml-3" />
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.maintenanceMode}
                    onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div>
                    <p className="font-medium text-gray-800">السماح بالتسجيل</p>
                    <p className="text-sm text-gray-500">السماح للمستخدمين الجدد بالتسجيل</p>
                  </div>
                  <Users className="h-5 w-5 text-green-600 ml-3" />
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.allowRegistration}
                    onChange={(e) => setSettings({ ...settings, allowRegistration: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div>
                    <p className="font-medium text-gray-800">إشعارات البريد الإلكتروني</p>
                    <p className="text-sm text-gray-500">إرسال إشعارات عبر البريد الإلكتروني</p>
                  </div>
                  <Mail className="h-5 w-5 text-blue-600 ml-3" />
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div>
                    <p className="font-medium text-gray-800">النسخ الاحتياطي التلقائي</p>
                    <p className="text-sm text-gray-500">إنشاء نسخ احتياطية يومية</p>
                  </div>
                  <Database className="h-5 w-5 text-purple-600 ml-3" />
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.autoBackup}
                    onChange={(e) => setSettings({ ...settings, autoBackup: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* SEO Settings */}
        {activeTab === 'seo' && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">تحسين محركات البحث</h2>
              <FileText className="h-6 w-6 text-blue-600 ml-3" />
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">عنوان الصفحة الرئيسية</label>
                <input
                  type="text"
                  value={settings.metaTitle}
                  onChange={(e) => setSettings({ ...settings, metaTitle: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">وصف الصفحة الرئيسية</label>
                <textarea
                  value={settings.metaDescription}
                  onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الكلمات المفتاحية</label>
                <input
                  type="text"
                  value={settings.metaKeywords}
                  onChange={(e) => setSettings({ ...settings, metaKeywords: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="كلمة1, كلمة2, كلمة3"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">رمز Google Analytics</label>
                <input
                  type="text"
                  value={settings.googleAnalytics}
                  onChange={(e) => setSettings({ ...settings, googleAnalytics: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="G-XXXXXXXXXX"
                />
              </div>
            </div>
          </div>
        )}

        {/* Social Media Settings */}
        {activeTab === 'social' && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">وسائل التواصل الاجتماعي</h2>
              <Users className="h-6 w-6 text-blue-600 ml-3" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">رابط Facebook</label>
                <input
                  type="url"
                  value={settings.facebookUrl}
                  onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://facebook.com/username"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">رابط Twitter</label>
                <input
                  type="url"
                  value={settings.twitterUrl}
                  onChange={(e) => setSettings({ ...settings, twitterUrl: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://twitter.com/username"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">رابط Instagram</label>
                <input
                  type="url"
                  value={settings.instagramUrl}
                  onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://instagram.com/username"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">رابط LinkedIn</label>
                <input
                  type="url"
                  value={settings.linkedinUrl}
                  onChange={(e) => setSettings({ ...settings, linkedinUrl: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://linkedin.com/company/name"
                />
              </div>
            </div>
          </div>
        )}

        {/* Commission Settings */}
        {activeTab === 'commission' && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">إعدادات العمولة</h2>
              <CreditCard className="h-6 w-6 text-green-600 ml-3" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">العمولة الافتراضية (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.defaultCommission}
                  onChange={(e) => setSettings({ ...settings, defaultCommission: Number(e.target.value) || 10 })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">العمولة الدنيا (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.minCommission}
                  onChange={(e) => setSettings({ ...settings, minCommission: Number(e.target.value) || 5 })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">العمولة القصوى (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.maxCommission}
                  onChange={(e) => setSettings({ ...settings, maxCommission: Number(e.target.value) || 50 })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Security Settings */}
        {activeTab === 'security' && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">إعدادات الأمان</h2>
              <Shield className="h-6 w-6 text-red-600 ml-3" />
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">مهلة الجلسة (دقائق)</label>
                <input
                  type="number"
                  min="5"
                  max="1440"
                  value={settings.sessionTimeout}
                  onChange={(e) => setSettings({ ...settings, sessionTimeout: Number(e.target.value) || 30 })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الحد الأقصى لمحاولات تسجيل الدخول</label>
                <input
                  type="number"
                  min="3"
                  max="10"
                  value={settings.maxLoginAttempts}
                  onChange={(e) => setSettings({ ...settings, maxLoginAttempts: Number(e.target.value) || 5 })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div>
                    <p className="font-medium text-gray-800">المصادقة الثنائية</p>
                    <p className="text-sm text-gray-500">تطلب رمز إضافي لتسجيل الدخول</p>
                  </div>
                  <Shield className="h-5 w-5 text-red-600 ml-3" />
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.requireTwoFactor}
                    onChange={(e) => setSettings({ ...settings, requireTwoFactor: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Backup Settings */}
        {activeTab === 'backup' && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <button
                type="button"
                onClick={() => setShowBackupModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                إنشاء نسخة احتياطية
              </button>
              <div className="flex items-center">
                <h2 className="text-xl font-semibold text-gray-800">النسخ الاحتياطي</h2>
                <Database className="h-6 w-6 text-purple-600 ml-3" />
              </div>
            </div>
            
            <div className="space-y-4">
              {backups.map((backup) => (
                <div key={backup.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div>
                      <p className="font-medium text-gray-800">{backup.name}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(backup.createdAt).toLocaleDateString('ar-SA')} - {backup.size}
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                          backup.type === 'auto' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {backup.type === 'auto' ? 'تلقائي' : 'يدوي'}
                        </span>
                      </p>
                    </div>
                    <Database className="h-5 w-5 text-blue-600 ml-3" />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                      title="تحميل"
                    >
                      <Database className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                      title="حذف"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="h-4 w-4" />
            {saving ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
          </button>
        </div>
      </form>

      {/* Backup Modal */}
      {showBackupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">إنشاء نسخة احتياطية</h2>
              <button
                onClick={() => setShowBackupModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <p className="text-gray-600 mb-6">
              سيتم إنشاء نسخة احتياطية من قاعدة البيانات والإعدادات. قد يستغرق هذا بضع دقائق.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={createBackup}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                إنشاء النسخة
              </button>
              <button
                onClick={() => setShowBackupModal(false)}
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