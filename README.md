---
id: frontend-architecture
title: معماری Frontend پروژه Pol
sidebar_label: Frontend Architecture
slug: /architecture/frontend
---

# معماری Frontend پروژه **Pol** (POC)

> کدنام: **Pol** (پل)
> دامنه: سامانه سازمانی هلدینگ با چند کارخانه و چند شرکت بازرگانی / خدماتی
> این سند، معماری POC برای لایه‌ی Frontend را تعریف می‌کند؛ به‌گونه‌ای که بتوان بر اساس آن، ساختار repository و کد پروژه را به صورت خودکار تولید کرد.

***

## 1. اهداف و محدودیت‌ها

### 1.1. اهداف

* پشتیبانی از چند **دامنه‌ی تجاری** (domain) در سطح هلدینگ (مثلاً: Base, Sale، و دامنه‌های بعدی).
* امکان استفاده از **چند فریم‌ورک** در Frontend:
  * Angular برای برخی دامنه‌ها (مثلاً `base`)
  * React برای برخی دامنه‌ها (مثلاً `sale`)
  * Vue برای دامنه‌های احتمالی آینده
* یک **Portal / Shell** مشترک برای:
  * مدیریت احراز هویت
  * layout عمومی
  * multi-tenant (انتخاب شرکت / کارخانه)
* معماری قابل توسعه با **Micro Frontend**:
  * هر دامنه‌ی تجاری \= یک Micro Frontend مستقل
  * build و deploy مستقل
* استفاده از **Shared Frontend Libraries** مبتنی بر TypeScript خالص:
  * امکان استفاده در Angular / React / Vue
* طراحی یک **Design System** مشترک:
  * ظاهر یکسان در همه‌ی فریم‌ورک‌ها
* طراحی یک **Auth SDK** قابل استفاده در تمام MFEها.

### 1.2. محدوده‌ی POC

در این POC، فقط دو دامنه‌ی اصلی پیاده‌سازی می‌شوند:

* **`base` (Angular)**
  * مدیریت تعاریف اصلی / موجودیت‌های عمومی (مثلاً Customer, Product, Warehouse, …)
* **`sale` (React)**
  * مدیریت فاکتور فروش:
    * Header (مشتری، تاریخ، واحد پول، انبار، …)
    * Detail (اقلام فاکتور: کالا، تعداد، قیمت، مالیات، …)

همچنین:

* یک لایه‌ی عمومی بدون احراز هویت (`public`) در دسترس است.
* بخش `app` بعد از احراز هویت در دسترس است.

***

## 2. نمای کلی معماری Frontend

### 2.1. اجزای اصلی

معماری Frontend شامل این اجزا است:

* **Root Config (`root-config`)**
  * پیاده‌سازی شده با TypeScript خالص + [single-spa](https://single-spa.js.org/)
  * مسئول:
    * ثبت مایکروفرانت‌اندها (`registerApplication`)
    * مدیریت انجام `mount/unmount` بر اساس URL
* **Public Portal (`public-portal`)**
  * بخش عمومی بدون نیاز به احراز هویت
  * صفحات:
    * صفحه‌ی اصلی عمومی
    * صفحه‌ی ورود (login)
    * صفحات اطلاع‌رسانی عمومی
* **App Shell (`app-shell`)** *(در فاز بعد قابل اضافه شدن است؛ برای POC می‌تواند حذف یا ساده شود)*
  * layout داخلی (header, sidebar, footer)
  * نمایش مشترک context کاربر (نام، شرکت، کارخانه فعال، …)
* **Micro Frontends per Domain**
  * `mfe-base-angular` → دامنه‌ی Base (Angular)
  * `mfe-sale-react` → دامنه‌ی Sale (React)
* **Shared Frontend Libraries**
  * `@pol/contracts`
  * `@pol/api-client`
  * `@pol/auth-core`, `@pol/auth-angular`, `@pol/auth-react`
  * `@pol/design-tokens`, `@pol/ui-core`, `@pol/ui-angular`, `@pol/ui-react`

### 2.2. تفکیک public و app

* مسیرهای **عمومی (public)**:
  * مثال: `/`, `/about`, `/login`, `/help`
  * توسط مایکروفرانت‌اند `public-portal` مدیریت می‌شوند.
  * بدون نیاز به access token.
* مسیرهای **درون سیستم (app)**:
  * مثال: `/app/base/...`, `/app/sale/...`
  * فقط پس از احراز هویت در دسترس هستند.
  * توسط MFEهای `mfe-base-angular` و `mfe-sale-react` مدیریت می‌شوند.
  * هر MFE خودش مسئول بررسی احراز هویت (با استفاده از Auth SDK) است.

در سطح `root-config`، مسیریابی به این شکل انجام می‌شود:

* اگر `pathname` با `/app` شروع نشود ⇒ فعال شدن `public-portal`
* اگر `pathname` با `/app/base` شروع شود ⇒ فعال شدن `mfe-base-angular`
* اگر `pathname` با `/app/sale` شروع شود ⇒ فعال شدن `mfe-sale-react`

***

## 3. ساختار Monorepo

### 3.1. ساختار پوشه‌ها

ریپازیتوری GitHub: `Pol`
ساختار پیشنهادی:

```js
Pol/
  package.json
  pnpm-workspace.yaml           # یا yarn workspaces
  tsconfig.base.json
  .editorconfig
  .eslintrc.cjs
  .prettierrc

  apps/
    root-config/                # single-spa root config (TS + webpack)
    public-portal/              # MFE بدون احراز هویت (React)
    mfe-base-angular/           # MFE دامنه Base (Angular)
    mfe-sale-react/             # MFE دامنه Sale (React)
    # در فازهای بعد:
    # mfe-logistics-vue/
    # mfe-hr-angular/
    # app-shell/                # در صورت نیاز به shell مستقل

  packages/
    contracts/                  # @pol/contracts
    api-client/                 # @pol/api-client
    auth-core/                  # @pol/auth-core (TS خالص)
    auth-angular/               # @pol/auth-angular (wrapper)
    auth-react/                 # @pol/auth-react (wrapper)
    design-tokens/              # @pol/design-tokens (tokens + CSS vars)
    ui-core/                    # @pol/ui-core (Web Components)
    ui-angular/                 # @pol/ui-angular (wrapper برای Angular)
    ui-react/                   # @pol/ui-react (wrapper برای React)
    # config های مشترک:
    tsconfig/                   # پروفایل‌های tsconfig مشترک
    eslint-config/              # @pol/eslint-config
```