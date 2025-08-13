'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Package,
  X,
  Save,
  Loader2
} from 'lucide-react';
import { formatPriceWithCurrency } from '@/utils/numbers';
import AdminSidebar from '@/components/AdminSidebar';
import ImageUpload from '@/components/ImageUpload';
import { ThumbnailImage } from '@/components/CloudinaryImage';

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  originalPrice: number | null;
  image: string | null;
  isActive: boolean;
  clicks: number;
  category: {
    id: string;
    name: string;
  } | null;
  createdAt: string;
}

interface Category {
  id: string;
  name: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    image: '',
    categoryId: '',
    isActive: true
  });

  useEffect(() => {
    checkAuth();
    fetchProducts();
    fetchCategories();
  }, []);

  // Debug: Monitor formData changes
  useEffect(() => {
    console.log('formData changed:', formData);
    console.log('formData.name:', formData.name);
    console.log('formData.price:', formData.price);
    console.log('formData.originalPrice:', formData.originalPrice);
    console.log('formData.categoryId:', formData.categoryId);
    console.log('formData.image:', formData.image);
  }, [formData]);

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

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        console.error('No token found');
        return;
      }
      
      const response = await fetch('/api/products', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Fetched products data:', data);
        setProducts(data.products || data);
      } else if (response.status === 401) {
        console.error('Unauthorized - token may be invalid');
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        window.location.href = '/admin/login';
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/categories', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Submitting form data:', formData);
    
    try {
      const token = localStorage.getItem('adminToken');
      console.log('Token:', token ? 'Found' : 'Not found');
      
      if (!token) {
        alert('جلسة منتهية. يرجى تسجيل الدخول مرة أخرى.');
        window.location.href = '/admin/login';
        return;
      }
      
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      console.log('Response status:', response.status);
      
      if (response.ok) {
        console.log('Product created successfully');
        setShowAddForm(false);
        setFormData({
          name: '',
          description: '',
          price: '',
          originalPrice: '',
          image: '',
          categoryId: '',
          isActive: true
        });
        fetchProducts();
        alert('تم إضافة المنتج بنجاح');
      } else {
        const error = await response.json();
        console.error('API Error:', error);
        if (response.status === 401) {
          alert('جلسة منتهية. يرجى تسجيل الدخول مرة أخرى.');
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          window.location.href = '/admin/login';
        } else {
          alert(error.error || 'حدث خطأ في إضافة المنتج');
        }
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('حدث خطأ في إنشاء المنتج');
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        alert('جلسة منتهية. يرجى تسجيل الدخول مرة أخرى.');
        window.location.href = '/admin/login';
        return;
      }

      const response = await fetch(`/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setEditingProduct(null);
        setFormData({
          name: '',
          description: '',
          price: '',
          originalPrice: '',
          image: '',
          categoryId: '',
          isActive: true
        });
        fetchProducts();
        alert('تم تحديث المنتج بنجاح');
      } else {
        const error = await response.json();
        if (response.status === 401) {
          alert('جلسة منتهية. يرجى تسجيل الدخول مرة أخرى.');
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          window.location.href = '/admin/login';
        } else {
          alert(error.error || 'حدث خطأ في تحديث المنتج');
        }
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('حدث خطأ في تحديث المنتج');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المنتج؟')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        alert('جلسة منتهية. يرجى تسجيل الدخول مرة أخرى.');
        window.location.href = '/admin/login';
        return;
      }

      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchProducts();
        alert('تم حذف المنتج بنجاح');
      } else {
        const error = await response.json();
        if (response.status === 401) {
          alert('جلسة منتهية. يرجى تسجيل الدخول مرة أخرى.');
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          window.location.href = '/admin/login';
        } else {
          alert(error.error || 'حدث خطأ في حذف المنتج');
        }
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('حدث خطأ في حذف المنتج');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    window.location.href = '/admin/login';
  };

  const handleDeleteAll = async () => {
    if (!confirm('هل أنت متأكد من حذف جميع المنتجات؟ هذا الإجراء لا يمكن التراجع عنه!')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        console.error('No token found');
        return;
      }

      // Delete all products
      const response = await fetch('/api/products/delete-all', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert('تم حذف جميع المنتجات بنجاح');
        setProducts([]);
        setShowAddForm(false);
        setEditingProduct(null);
      } else {
        const error = await response.json();
        alert(`فشل في حذف المنتجات: ${error.error}`);
      }
    } catch (error) {
      console.error('Error deleting all products:', error);
      alert('حدث خطأ أثناء حذف المنتجات');
    }
  };

  const filteredProducts = Array.isArray(products) ? products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || product.category?.id === categoryFilter;
    return matchesSearch && matchesCategory;
  }) : [];

  if (loading || !user) {
    return (
      <div className="flex h-screen">
        <div className="flex-1 bg-gray-100">
          <div className="p-6">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
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
              <Package className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-800 text-heading">إدارة المنتجات</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                إضافة منتج
              </button>
              <button
                onClick={handleDeleteAll}
                className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700"
              >
                <Trash2 className="h-4 w-4" />
                حذف جميع المنتجات
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="البحث في المنتجات..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="w-48">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">جميع الفئات</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Add/Edit Product Form */}
          {(showAddForm || editingProduct) && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {editingProduct ? 'تعديل المنتج' : 'إضافة منتج جديد'}
              </h2>
              <form onSubmit={editingProduct ? handleEdit : handleSubmit} className="space-y-6">
                {/* المعلومات الأساسية */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">اسم المنتج *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        console.log('Name changed to:', e.target.value);
                        setFormData({ ...formData, name: e.target.value });
                      }}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="أدخل اسم المنتج"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الفئة *</label>
                    <select
                      value={formData.categoryId}
                      onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">اختر الفئة</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* الأسعار */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">السعر الحالي *</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">السعر الأصلي (اختياري)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* صورة المنتج */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">صورة المنتج</label>
                  <ImageUpload
                    onUpload={(publicId) => {
                      console.log('Image uploaded, setting publicId:', publicId);
                      console.log('Current formData before update:', formData);
                      const newFormData = { ...formData, image: publicId };
                      console.log('New formData after update:', newFormData);
                      setFormData(newFormData);
                    }}
                    onRemove={() => {
                      console.log('Image removed');
                      console.log('Current formData before remove:', formData);
                      const newFormData = { ...formData, image: '' };
                      console.log('New formData after remove:', newFormData);
                      setFormData(newFormData);
                    }}
                    currentImage={formData.image}
                    className="w-full"
                  />
                  {formData.image && (
                    <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
                      <p className="text-xs text-green-700">
                        ✅ تم رفع الصورة بنجاح
                      </p>
                      <p className="text-xs text-green-600">
                        ID: {formData.image}
                      </p>
                    </div>
                  )}
                </div>

                {/* الوصف */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">وصف المنتج</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="أدخل وصف المنتج..."
                  />
                </div>

                {/* حالة المنتج */}
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="ml-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">منتج نشط (سيظهر في الموقع)</span>
                  </label>
                </div>
                
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    {editingProduct ? 'تحديث المنتج' : 'إضافة المنتج'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingProduct(null);
                      setFormData({
                        name: '',
                        description: '',
                        price: '',
                        originalPrice: '',
                        image: '',
                        categoryId: '',
                        isActive: true
                      });
                    }}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                  >
                    إلغاء
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      // Test with sample data
                      const testData = {
                        name: 'منتج تجريبي',
                        description: 'وصف تجريبي للمنتج',
                        price: '99.99',
                        originalPrice: '149.99',
                        image: '',
                        categoryId: categories.length > 0 ? categories[0].id : '',
                        isActive: true
                      };
                      setFormData(testData);
                      console.log('Test data set:', testData);
                      console.log('Available categories:', categories);
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    بيانات تجريبية
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Products Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-right py-3 px-4 font-medium text-gray-700">المنتج</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-700">الفئة</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-700">السعر</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-700">النقرات</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-700">الحالة</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-700">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="mr-3">
                            <ThumbnailImage
                              src={product.image || ''}
                              alt={product.name}
                              className="w-12 h-12"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{product.name}</p>
                            <p className="text-sm text-gray-500 max-w-xs truncate">
                              {product.description || 'لا يوجد وصف'}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {product.category?.name || 'بدون فئة'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-gray-800">{formatPriceWithCurrency(product.price)}</p>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <p className="text-sm text-gray-500 line-through">{formatPriceWithCurrency(product.originalPrice)}</p>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center">
                          <Eye className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-sm text-gray-600">{product.clicks}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          product.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.isActive ? 'نشط' : 'غير نشط'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingProduct(product);
                              setFormData({
                                name: product.name,
                                description: product.description || '',
                                price: product.price.toString(),
                                originalPrice: product.originalPrice ? product.originalPrice.toString() : '',
                                image: product.image || '',
                                categoryId: product.category?.id || '',
                                isActive: product.isActive
                              });
                            }}
                            className="text-blue-600 hover:text-blue-800"
                            title="تعديل"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600 hover:text-red-800"
                            title="حذف"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">لا توجد منتجات</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 