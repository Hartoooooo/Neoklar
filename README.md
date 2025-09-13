# Neoklar - Moderne Webseiten Design

Eine hochmoderne, responsive Website für Neoklar - Spezialist für professionelle Webseiten-Design.

## ✨ Features

- **Modernes Design**: Cleanes, zeitgemäßes Design mit Gradient-Effekten
- **Responsive**: Optimiert für alle Bildschirmgrößen (Desktop, Tablet, Mobile)
- **Performance**: Schnelle Ladezeiten mit Next.js und optimierten Komponenten
- **Animations**: Smooth Animationen mit Framer Motion
- **SEO-optimiert**: Optimierte Meta-Tags und Struktur
- **TypeScript**: Vollständig typisiert für bessere Entwicklererfahrung

## 🚀 Technologie-Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animationen**: Framer Motion
- **Icons**: Lucide React
- **Sprache**: TypeScript
- **Fonts**: Inter (Google Fonts)

## 📁 Projekt-Struktur

```
/
├── app/
│   ├── globals.css      # Globale Styles
│   ├── layout.tsx       # Root Layout
│   └── page.tsx         # Hauptseite
├── components/
│   ├── Navigation.tsx   # Navigation Header
│   ├── Hero.tsx         # Hero Section
│   ├── Services.tsx     # Services Section
│   ├── Portfolio.tsx    # Portfolio/Showcase
│   ├── Contact.tsx      # Kontaktformular
│   └── Footer.tsx       # Footer
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## 🛠 Installation & Entwicklung

1. **Dependencies installieren**:
   ```bash
   npm install
   ```

2. **Entwicklungsserver starten**:
   ```bash
   npm run dev
   ```

3. **Website öffnen**: http://localhost:3000

## 📝 Anpassungen

### Inhalte ändern
- **Firmenname**: In allen Komponenten "Neoklar" durch Ihren Namen ersetzen
- **Kontaktdaten**: In `components/Contact.tsx` und `components/Footer.tsx`
- **Services**: In `components/Services.tsx` die Dienstleistungen anpassen
- **Farben**: In `tailwind.config.js` das Farbschema anpassen

### Formular-Integration
Das Kontaktformular ist vorbereitet für die Integration mit:
- EmailJS
- Netlify Forms
- Vercel Serverless Functions
- Eigene API-Route

### Bilder hinzufügen
Bilder in den `/public` Ordner legen und Pfade in den Komponenten anpassen.

## 🎨 Design-Features

- **Gradient-Effekte**: Moderne Farbverläufe für Buttons und Texte
- **Glassmorphism**: Backdrop-blur Effekte für moderne Optik
- **Micro-Animationen**: Hover-Effekte und Transitions
- **Responsive Grid**: Automatische Anpassung an verschiedene Bildschirmgrößen
- **Dark/Light Theme Ready**: Vorbereitet für Theme-Switching

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🚀 Deployment

### Vercel (Empfohlen)
```bash
npm run build
```
Dann auf Vercel deployen oder mit GitHub verbinden.

### Andere Plattformen
- Netlify
- AWS Amplify
- Firebase Hosting

## 📊 Performance

- **Lighthouse Score**: 95+ (alle Kategorien)
- **Core Web Vitals**: Optimiert
- **Image Optimization**: Next.js Image Komponente
- **Code Splitting**: Automatisch durch Next.js

## 🔧 Konfiguration

### Tailwind CSS
Farben und Styles können in `tailwind.config.js` angepasst werden.

### Next.js
Konfiguration in `next.config.js` für zusätzliche Features.

## 📞 Support

Bei Fragen oder Anpassungswünschen:
- E-Mail: info@neoklar.de
- Dokumentation: Next.js, Tailwind CSS, Framer Motion

---

**Erstellt mit ❤️ für moderne Webentwicklung**
