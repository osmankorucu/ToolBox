# 🧰 ToolBox - Multi-Tool Web Uygulaması

<p align="center">
  <img src="https://img.shields.io/badge/Java-21-orange?style=for-the-badge&logo=java" alt="Java">
  <img src="https://img.shields.io/badge/Spring_Boot-3.2+-green?style=for-the-badge&logo=spring" alt="Spring Boot">
  <img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-5.1-purple?style=for-the-badge&logo=vite" alt="Vite">
</p>

Modern ve kullanımı kolay çoklu araçlar (multi-tool) web uygulaması. Geliştiriciler, tasarımcılar ve genel kullanım için faydalı araçlar tek bir yerde.

## ✨ Özellikler

- **JSON Formatter** - JSON verilerini formatlama ve minify etme
- **Base64 Encoder/Decoder** - Metinleri Base64 formatına dönüştürme
- **UUID Generator** - Rastgele UUID oluşturma
- **Color Picker** - Renk seçme ve farklı formatlarda görüntüleme (HEX, RGB, HSL)
- **Unit Converter** - Birim dönüşümü (Uzunluk, Ağırlık)
- **Password Generator** - Güvenli parola oluşturma

## 🛠️ Teknolojiler

### Backend
- Java 21
- Spring Boot 3.2
- Maven
- H2 Database (In-memory)

### Frontend
- React 18
- TypeScript
- Vite
- React Router v6
- Axios
- Lucide React (Icons)
- CSS Variables (Custom theming)

## 🚀 Kurulum

### Gereksinimler
- Java 21+
- Node.js 18+
- Maven 3.8+

### Backend Kurulumu

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend `http://localhost:8080` adresinde çalışır.

### Frontend Kurulumu

```bash
cd frontend
npm install
npm run dev
```

Frontend `http://localhost:5173` adresinde çalışır.

## 📁 Proje Yapısı

```
multi-tool-app/
├── backend/                 # Spring Boot API
│   ├── src/main/java/com/toolbox/
│   │   ├── config/          # Konfigürasyon sınıfları
│   │   ├── controller/     # REST API controller'lar
│   │   ├── service/        # Business logic
│   │   └── model/          # Entity'ler ve DTO'lar
│   └── pom.xml
│
├── frontend/                # React + Vite
│   ├── src/
│   │   ├── components/     # Reusable UI bileşenleri
│   │   ├── pages/         # Tool sayfaları
│   │   ├── layouts/       # Layout bileşenleri
│   │   └── styles/        # CSS dosyaları
│   └── package.json
│
└── README.md
```

## 🎨 Tema

Modern karanlık tema (Dark theme) ile:
- Primary: Indigo (#6366F1)
- Secondary: Pink (#EC4899)
- Accent: Teal (#14B8A6)
- Responsive tasarım

## 🔌 API Endpoints

| Method | Endpoint | Açıklama |
|--------|----------|-----------|
| GET | `/api/tools` | Tüm tool'ları listele |
| POST | `/api/tool/json/format` | JSON formatla |
| POST | `/api/tool/json/minify` | JSON minify et |
| POST | `/api/tool/base64/encode` | Base64 encode |
| POST | `/api/tool/base64/decode` | Base64 decode |
| GET | `/api/tool/uuid/generate` | UUID oluştur |
| GET | `/api/tool/password/generate` | Parola oluştur |

## 🧩 Yeni Tool Ekleme

1. Backend'de yeni endpoint ekle: `backend/src/main/java/com/toolbox/controller/`
2. Frontend'de yeni sayfa oluştur: `frontend/src/pages/tools/`
3. Route ekle: `frontend/src/App.tsx`
4. Sidebar'a ekle: `frontend/src/components/Sidebar.tsx`

## 📝 Lisans

MIT License

---

Made with ❤️
