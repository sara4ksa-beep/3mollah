'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  BarChart3, 
  Users, 
  Settings, 
  LogOut,
  Filter,
  Menu,
  X
} from 'lucide-react';

interface AdminSidebarProps {
  userRole: string;
  userName: string;
  onLogout: () => void;
}

export default function AdminSidebar({ userRole, userName, onLogout }: AdminSidebarProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const menuItems = [
    {
      title: 'لوحة التحكم',
      href: '/admin',
      icon: LayoutDashboard,
      roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'VIEWER']
    },
    {
      title: 'المنتجات',
      href: '/admin/products',
      icon: Package,
      roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR']
    },
    {
      title: 'الفئات',
      href: '/admin/categories',
      icon: Filter,
      roles: ['SUPER_ADMIN', 'ADMIN']
    },
    {
      title: 'الإحصائيات',
      href: '/admin/analytics',
      icon: BarChart3,
      roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR']
    },
    {
      title: 'المستخدمين',
      href: '/admin/users',
      icon: Users,
      roles: ['SUPER_ADMIN', 'ADMIN']
    },
    {
      title: 'الإعدادات',
      href: '/admin/settings',
      icon: Settings,
      roles: ['SUPER_ADMIN', 'ADMIN']
    }
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(userRole)
  );

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

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <X size={24} className="text-gray-700" />
        ) : (
          <Menu size={24} className="text-gray-700" />
        )}
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 bg-white shadow-lg h-screen fixed right-0 top-0">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800 text-heading">لوحة التحكم</h1>
          <div className="mt-2">
            <p className="text-sm text-gray-600 text-body">{userName}</p>
            <p className="text-xs text-gray-500 text-caption">{getRoleName(userRole)}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {filteredMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">تسجيل الخروج</span>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed inset-0 z-40 ${isMenuOpen ? 'block' : 'hidden'}`}>
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={closeMenu}
        />
        
        {/* Sidebar */}
        <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-800 text-heading">لوحة التحكم</h1>
            <div className="mt-2">
              <p className="text-sm text-gray-600 text-body">{userName}</p>
              <p className="text-xs text-gray-500 text-caption">{getRoleName(userRole)}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 flex-1 overflow-y-auto">
            <ul className="space-y-2">
              {filteredMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => {
                closeMenu();
                onLogout();
              }}
              className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">تسجيل الخروج</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
} 