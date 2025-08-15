# إعداد البريد الإلكتروني - Email Setup Guide

## المتطلبات - Requirements

لإرسال الرسائل عبر نموذج الاتصال، تحتاج إلى إعداد متغيرات البيئة التالية:

To send emails through the contact form, you need to set up the following environment variables:

## 1. إنشاء ملف .env.local - Create .env.local file

قم بإنشاء ملف `.env.local` في المجلد الرئيسي للمشروع:

Create a `.env.local` file in the project root directory:

```bash
# Email Configuration for Nodemailer
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## 2. إعداد كلمة مرور التطبيق - Setup App Password

**مهم:** لا تستخدم كلمة المرور العادية لحساب Gmail!

**Important:** Don't use your regular Gmail password!

### خطوات إنشاء كلمة مرور التطبيق:

1. اذهب إلى [إعدادات حساب Google](https://myaccount.google.com/)
2. تأكد من تفعيل المصادقة الثنائية (2-Step Verification)
3. اذهب إلى **الأمان** > **كلمات مرور التطبيقات**
4. اختر "البريد" من القائمة
5. انسخ كلمة المرور المُنشأة

### Steps to create App Password:

1. Go to [Google Account settings](https://myaccount.google.com/)
2. Make sure 2-Step Verification is enabled
3. Go to **Security** > **App passwords**
4. Select "Mail" from the list
5. Copy the generated password

## 3. تحديث المتغيرات - Update Variables

استبدل القيم في ملف `.env.local`:

Replace the values in `.env.local` file:

```bash
EMAIL_USER=abrajsa@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
```

## 4. إعادة تشغيل الخادم - Restart Server

بعد إضافة المتغيرات، أعد تشغيل خادم التطوير:

After adding the variables, restart the development server:

```bash
npm run dev
```

## ملاحظات مهمة - Important Notes

- ✅ استخدم كلمة مرور التطبيق وليس كلمة المرور العادية
- ✅ تأكد من تفعيل المصادقة الثنائية
- ✅ لا تشارك ملف .env.local أو تضعه في Git
- ✅ الرسائل ستُرسل إلى: abrajsa@gmail.com

- ✅ Use App Password, not regular password
- ✅ Make sure 2-Step Verification is enabled
- ✅ Don't share .env.local file or commit it to Git
- ✅ Emails will be sent to: abrajsa@gmail.com

## اختبار النظام - Testing

بعد الإعداد، يمكنك اختبار نموذج الاتصال:

After setup, you can test the contact form:

1. اذهب إلى صفحة "اتصل بنا"
2. املأ النموذج
3. أرسل الرسالة
4. تحقق من وصول الرسالة إلى abrajsa@gmail.com

1. Go to "Contact Us" page
2. Fill out the form
3. Send the message
4. Check if the email arrives at abrajsa@gmail.com
