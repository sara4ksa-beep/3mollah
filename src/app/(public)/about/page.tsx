import { ArrowLeft, Users, Target, Award, Shield, Truck, Headphones } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center space-x-2 space-x-reverse text-blue-600 hover:text-blue-700 mb-4 text-body"
          >
            <ArrowLeft size={20} />
            <span>العودة للرئيسية</span>
          </Link>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4 text-heading">
            تعرف علينا
          </h1>
          <p className="text-gray-600 text-lg text-body max-w-3xl">
            نحن متجر العمولة، نقدم لك أفضل المنتجات المختارة بعناية من التجار الموثوقين 
            مع ضمان الجودة والخدمة المتميزة
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* About Section */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-heading">
              من نحن
            </h2>
            <div className="space-y-4 text-body">
              <p className="text-gray-700 leading-relaxed">
                متجر العمولة هو وجهتك الأولى لاكتشاف أفضل المنتجات من مختلف التجار الموثوقين. 
                نحن نعمل كوسيط بينك وبين التجار المميزين لنوفر لك تجربة تسوق فريدة ومميزة.
              </p>
              <p className="text-gray-700 leading-relaxed">
                تأسس متجرنا على مبدأ الثقة والجودة، حيث نقوم باختيار كل منتج بعناية فائقة 
                ونتأكد من جودته قبل عرضه عليك. هدفنا هو توفير الوقت والجهد في البحث عن المنتجات المناسبة.
              </p>
              <p className="text-gray-700 leading-relaxed">
                نؤمن بأن كل عميل يستحق أفضل الخدمات وأجود المنتجات، لذلك نحرص على تقديم 
                تجربة تسوق مريحة وآمنة مع ضمان رضاكم التام.
              </p>
            </div>
          </div>

          {/* Vision Section */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-heading">
              رؤيتنا
            </h2>
            <div className="space-y-4 text-body">
              <p className="text-gray-700 leading-relaxed">
                نسعى لأن نكون الخيار الأول للتسوق الإلكتروني في المنطقة، من خلال تقديم 
                منتجات عالية الجودة وخدمة عملاء متميزة.
              </p>
              <p className="text-gray-700 leading-relaxed">
                نطمح لتوسيع شبكة شراكاتنا مع التجار الموثوقين وتنويع منتجاتنا لتشمل 
                جميع احتياجات عملائنا الكرام.
              </p>
              <p className="text-gray-700 leading-relaxed">
                نهدف لبناء مجتمع من العملاء الراضين الذين يثقون بنا ويعتمدون علينا 
                في جميع احتياجاتهم التسوقية.
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center text-heading">
            مميزاتنا
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 text-subheading">
                منتجات موثوقة
              </h3>
              <p className="text-gray-600 text-body">
                نختار منتجاتنا بعناية من تجار موثوقين مع ضمان الجودة والأمان
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 text-subheading">
                توصيل سريع
              </h3>
              <p className="text-gray-600 text-body">
                خدمة توصيل سريعة وآمنة لجميع المناطق مع تتبع الشحنات
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 text-subheading">
                دعم العملاء
              </h3>
              <p className="text-gray-600 text-body">
                فريق دعم متخصص متاح على مدار الساعة لمساعدتك في أي استفسار
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 text-subheading">
                جودة عالية
              </h3>
              <p className="text-gray-600 text-body">
                نحرص على تقديم منتجات عالية الجودة مع ضمان الرضا التام
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 text-subheading">
                أسعار تنافسية
              </h3>
              <p className="text-gray-600 text-body">
                أسعار منافسة مع عروض وخصومات مستمرة لجميع العملاء
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 text-subheading">
                مجتمع متعاون
              </h3>
              <p className="text-gray-600 text-body">
                نعمل مع تجار موثوقين لبناء مجتمع تسوقي متعاون ومزدهر
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-heading">
            هل لديك استفسار؟
          </h2>
          <p className="text-lg mb-6 text-body">
            نحن هنا لمساعدتك في أي استفسار أو طلب خاص
          </p>
          <Link 
            href="/contact"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            اتصل بنا الآن
          </Link>
        </div>
      </div>
    </div>
  );
} 