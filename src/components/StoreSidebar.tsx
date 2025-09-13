'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { 
  Home, 
  Search, 
  Package, 
  Filter, 
  Star, 
  Heart, 
  ShoppingCart, 
  User, 
  Phone, 
  Info,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  Award,
  Clock,
  Tag
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  _count: {
    products: number;
  };
}

interface StoreSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StoreSidebar({ isOpen, onClose }: StoreSidebarProps) {
  const pathname = usePathname();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['categories']));

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        const categoriesWithProducts = data.filter((cat: Category) => cat._count.products > 0);
        setCategories(categoriesWithProducts);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const menuSections = [
    {
      id: 'main',
      title: 'الرئيسية',
      icon: Home,
      items: [
        { title: 'الرئيسية', href: '/', icon: Home },
        { title: 'جميع المنتجات', href: '/products', icon: Package },
        { title: 'البحث المتقدم', href: '/products?search=true', icon: Search },
      ]
    },
    {
      id: 'categories',
      title: 'الفئات',
      icon: Filter,
      items: categories.map(cat => ({
        title: cat.name,
        href: `/products?category=${cat.id}`,
        icon: Tag,
        count: cat._count.products
      }))
    },
    {
      id: 'features',
      title: 'المميزات',
      icon: Star,
      items: [
        { title: 'الأكثر مبيعاً', href: '/products?sort=bestselling', icon: TrendingUp },
        { title: 'الأعلى تقييماً', href: '/products?sort=rating', icon: Star },
        { title: 'الأحدث', href: '/products?sort=newest', icon: Clock },
        { title: 'العروض الخاصة', href: '/products?sort=offers', icon: Award },
      ]
    },
    {
      id: 'account',
      title: 'حسابي',
      icon: User,
      items: [
        { title: 'المفضلة', href: '/favorites', icon: Heart },
        { title: 'سلة التسوق', href: '/cart', icon: ShoppingCart },
        { title: 'طلباتي', href: '/orders', icon: Package },
      ]
    },
    {
      id: 'support',
      title: 'الدعم',
      icon: Phone,
      items: [
        { title: 'اتصل بنا', href: '/contact', icon: Phone },
        { title: 'من نحن', href: '/about', icon: Info },
        { title: 'الأسئلة الشائعة', href: '/faq', icon: Info },
      ]
    }
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Overlay - Only on mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        lg:relative lg:translate-x-0 lg:shadow-lg lg:w-72 lg:h-screen lg:z-auto
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white text-heading">متجر العمولة</h1>
              <p className="text-blue-100 text-sm">تسوق بذكاء</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
            aria-label="إغلاق القائمة"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-4 space-y-2">
            {menuSections.map((section) => {
              const SectionIcon = section.icon;
              const isExpanded = expandedSections.has(section.id);
              
              return (
                <div key={section.id} className="mb-4">
                  {/* Section Header */}
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="flex items-center justify-between w-full px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <SectionIcon className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                      <span className="font-semibold text-subheading">{section.title}</span>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    )}
                  </button>

                  {/* Section Items */}
                  {isExpanded && (
                    <div className="mr-6 space-y-1">
                      {section.items.map((item) => {
                        const ItemIcon = item.icon;
                        const active = isActive(item.href);
                        
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                              active
                                ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <ItemIcon className={`w-4 h-4 ${
                                active ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'
                              }`} />
                              <span className="text-sm font-medium">{item.title}</span>
                            </div>
                            {item.count !== undefined && (
                              <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                                {item.count}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2">متجر العمولة</p>
            <p className="text-xs text-gray-400">جميع الحقوق محفوظة © {new Date().getFullYear()}</p>
          </div>
        </div>
      </div>
    </>
  );
}
