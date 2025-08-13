# 🚀 دليل إعداد التقنيات المتقدمة

## 📋 التقنيات المضافة

### 1. **Redis** - التخزين المؤقت
### 2. **Elasticsearch** - البحث المتقدم
### 3. **SWR** - إدارة حالة البيانات

---

## 🔧 إعداد Redis

### تثبيت Redis محلياً:

#### على macOS:
```bash
brew install redis
brew services start redis
```

#### على Ubuntu/Debian:
```bash
sudo apt update
sudo apt install redis-server
sudo systemctl start redis-server
```

#### على Windows:
```bash
# استخدم WSL أو Docker
docker run -d -p 6379:6379 redis:alpine
```

### متغيرات البيئة:
```env
REDIS_URL="redis://localhost:6379"
REDIS_PASSWORD="your-redis-password"
REDIS_DB="0"
```

### اختبار الاتصال:
```bash
redis-cli ping
# يجب أن يعيد: PONG
```

---

## 🔍 إعداد Elasticsearch

### تثبيت Elasticsearch محلياً:

#### على macOS:
```bash
brew install elasticsearch
brew services start elasticsearch
```

#### على Ubuntu/Debian:
```bash
# إضافة GPG key
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo gpg --dearmor -o /usr/share/keyrings/elasticsearch-keyring.gpg

# إضافة repository
echo "deb [signed-by=/usr/share/keyrings/elasticsearch-keyring.gpg] https://artifacts.elastic.co/packages/8.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-8.x.list

# تثبيت Elasticsearch
sudo apt update
sudo apt install elasticsearch
sudo systemctl start elasticsearch
```

#### على Windows:
```bash
# استخدم Docker
docker run -d \
  --name elasticsearch \
  -p 9200:9200 \
  -p 9300:9300 \
  -e "discovery.type=single-node" \
  -e "xpack.security.enabled=false" \
  docker.elastic.co/elasticsearch/elasticsearch:8.11.0
```

### متغيرات البيئة:
```env
ELASTICSEARCH_URL="http://localhost:9200"
ELASTICSEARCH_USERNAME="elastic"
ELASTICSEARCH_PASSWORD="changeme"
ELASTICSEARCH_INDEX_PREFIX="3mollah"
```

### اختبار الاتصال:
```bash
curl http://localhost:9200
# يجب أن يعيد معلومات Elasticsearch
```

---

## ⚡ إعداد SWR

### تم تثبيت SWR تلقائياً مع:
```bash
npm install swr
```

### التكوين الأساسي:
```typescript
import { SWRConfig } from 'swr';

export function Providers({ children }) {
  return (
    <SWRConfig value={{
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 2000,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
    }}>
      {children}
    </SWRConfig>
  );
}
```

---

## 📚 كيفية الاستخدام

### 1. **استخدام Redis للتخزين المؤقت:**

```typescript
import { redis } from '@/lib/redis';

// حفظ بيانات مع انتهاء صلاحية
await redis.set('user:123', JSON.stringify(userData), 3600); // ساعة واحدة

// استرجاع بيانات
const userData = await redis.get('user:123');

// حذف بيانات
await redis.del('user:123');

// فحص وجود مفتاح
const exists = await redis.exists('user:123');
```

### 2. **استخدام Elasticsearch للبحث:**

```typescript
import { elasticsearch, productSearch } from '@/lib/elasticsearch';

// إنشاء فهرس
await elasticsearch.createIndex('products', {
  properties: {
    name: { type: 'text', analyzer: 'arabic_analyzer' },
    description: { type: 'text', analyzer: 'arabic_analyzer' },
    price: { type: 'float' },
    categoryId: { type: 'keyword' },
  }
});

// البحث في المنتجات
const results = await productSearch.searchProducts('لابتوب', {
  category: 'electronics',
  minPrice: 1000,
  maxPrice: 5000
});

// الحصول على اقتراحات
const suggestions = await productSearch.getSuggestions('لابت');
```

### 3. **استخدام SWR لإدارة البيانات:**

```typescript
import { useProducts, useProduct, useProductSearch } from '@/lib/swr';

// استخدام المنتجات
function ProductsList() {
  const { data, error, isLoading } = useProducts(1, 12);
  
  if (isLoading) return <div>جاري التحميل...</div>;
  if (error) return <div>حدث خطأ</div>;
  
  return (
    <div>
      {data?.products?.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// البحث في المنتجات
function SearchProducts() {
  const [query, setQuery] = useState('');
  const { data, error } = useProductSearch(query, {});
  
  return (
    <div>
      <input 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="ابحث عن منتج..."
      />
      {data?.hits?.map(hit => (
        <ProductCard key={hit.id} product={hit} />
      ))}
    </div>
  );
}
```

---

## 🚀 أمثلة متقدمة

### 1. **نظام التخزين المؤقت المتقدم:**

```typescript
// إنشاء hook للتخزين المؤقت
export function useCachedData(key: string, fetcher: () => Promise<any>) {
  const { data, error, mutate } = useSWR(key, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 300000, // 5 دقائق
  });

  const refresh = () => mutate();
  const clearCache = () => {
    redis.del(`cache:${key}`);
    mutate();
  };

  return { data, error, refresh, clearCache };
}
```

### 2. **البحث المتقدم مع التخزين المؤقت:**

```typescript
// hook للبحث مع اقتراحات
export function useAdvancedSearch() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({});
  
  const { data: searchResults } = useProductSearch(query, filters);
  const { data: suggestions } = useSWR(
    query.length > 2 ? `/api/suggestions?q=${query}` : null,
    fetcher
  );

  return {
    query,
    setQuery,
    filters,
    setFilters,
    searchResults,
    suggestions,
  };
}
```

### 3. **مراقبة الأداء:**

```typescript
// hook لمراقبة الأداء
export function usePerformanceMonitoring() {
  const { data: metrics } = useSWR('/api/performance', fetcher, {
    refreshInterval: 30000, // كل 30 ثانية
  });

  useEffect(() => {
    if (metrics?.responseTime > 1000) {
      console.warn('استجابة بطيئة:', metrics.responseTime);
    }
  }, [metrics]);

  return metrics;
}
```

---

## 🔒 الأمان

### 1. **Redis:**
- استخدم كلمات مرور قوية
- قم بتقييد الوصول بالشبكة
- استخدم SSL/TLS في الإنتاج

### 2. **Elasticsearch:**
- قم بتفعيل X-Pack Security
- استخدم HTTPS
- قم بتقييد الوصول بالشبكة

### 3. **SWR:**
- لا تخزن بيانات حساسة في التخزين المؤقت
- استخدم HTTPS لجميع الطلبات
- قم بتقييد حجم البيانات المخزنة مؤقتاً

---

## 📊 مراقبة الأداء

### 1. **Redis:**
```bash
# مراقبة الذاكرة
redis-cli info memory

# مراقبة الإحصائيات
redis-cli info stats
```

### 2. **Elasticsearch:**
```bash
# حالة الكتلة
curl -X GET "localhost:9200/_cluster/health?pretty"

# إحصائيات الفهارس
curl -X GET "localhost:9200/_stats?pretty"
```

### 3. **SWR:**
```typescript
// مراقبة الأداء
const { data: performance } = useSWR('/api/performance', fetcher, {
  refreshInterval: 60000, // كل دقيقة
});

console.log('Cache hit rate:', performance?.cacheHitRate);
console.log('Average response time:', performance?.avgResponseTime);
```

---

## 🚨 استكشاف الأخطاء

### 1. **Redis لا يتصل:**
```bash
# تحقق من الخدمة
sudo systemctl status redis

# تحقق من المنفذ
netstat -tlnp | grep 6379
```

### 2. **Elasticsearch لا يعمل:**
```bash
# تحقق من السجلات
sudo journalctl -u elasticsearch

# تحقق من المنفذ
netstat -tlnp | grep 9200
```

### 3. **SWR لا يعمل:**
```typescript
// تحقق من التكوين
console.log('SWR Config:', swrConfig);

// تحقق من الأخطاء
const { data, error } = useSWR('/api/test', fetcher);
if (error) console.error('SWR Error:', error);
```

---

## 📈 أفضل الممارسات

### 1. **Redis:**
- استخدم TTL مناسب للبيانات
- قم بتقسيم البيانات إلى مفاتيح منطقية
- استخدم pipeline للعمليات المتعددة

### 2. **Elasticsearch:**
- قم بتصميم الفهارس بعناية
- استخدم التحليل المناسب للغة العربية
- قم بضبط حجم الشاردات

### 3. **SWR:**
- استخدم مفاتيح منطقية للبيانات
- قم بتكوين revalidation مناسب
- استخدم mutate للتحديثات الفورية

---

## 🎯 الخطوات التالية

1. **إعداد الخوادم المحلية**
2. **تكوين المتغيرات البيئية**
3. **اختبار الاتصالات**
4. **تطبيق الأمثلة**
5. **مراقبة الأداء**
6. **تحسين التكوين**

---

## 📞 الدعم

إذا واجهت أي مشاكل:
1. تحقق من السجلات
2. تأكد من إعدادات الشبكة
3. تحقق من المتغيرات البيئية
4. راجع التوثيق الرسمي

**Redis:** https://redis.io/documentation
**Elasticsearch:** https://www.elastic.co/guide
**SWR:** https://swr.vercel.app
