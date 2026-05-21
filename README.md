# GP Servicios S.R.L. — Sitio web corporativo

Sitio institucional de **GP Servicios S.R.L.** (ingeniería, construcción y montaje en Petróleo y Gas). Stack: **Next.js 16**, **Tailwind CSS v4**, **GSAP**, **Framer Motion**, **Lenis**.

## Capacidades del sitio

### Páginas

| Ruta | Contenido |
|------|-----------|
| `/` | Presentación: hero, resumen ejecutivo y navegación a secciones |
| `/quienes-somos` | Historia (desde 2013), experiencia y objetivo institucional |
| `/politicas-gestion` | Política de gestión y 8 compromisos del SGI (HSEQ) |
| `/servicios` | Catálogo de 8 servicios operativos (PDF + sitio legacy) |
| `/clientes` | Carrusel de operadoras y empresas del sector |
| `/staff` | Organigrama interactivo con drawer por área |
| `/contacto` | Planta, domicilios fiscal/base, teléfonos y correos |

### Experiencia y diseño

- Navbar con ondas SVG (roja + pizarra) que se despliega al scrollear
- En páginas internas: links oscuros sobre fondo claro → blancos al activar la onda
- Animaciones de entrada (GSAP), scroll suave (Lenis) y transiciones (Framer Motion)
- Paleta corporativa GP, tipografía Barlow + Inter
- Footer con servicios, navegación y datos de contacto oficiales

### Contenido

- Textos alineados al PDF institucional y a [gpservicios.com.ar](https://gpservicios.com.ar/)
- Fuente centralizada en `lib/site-content.ts`

### Despliegue (Lyntrix)

```bash
docker compose build
docker compose up -d
```

- Imagen multi-stage `node:22-alpine`, usuario no-root
- Red externa `lyntrix_network` (Cloudflare Tunnel)
- Puerto configurable: `FRONT_PORT` (default `3000`)
- `HOSTNAME=0.0.0.0` para acceso desde el túnel

## Desarrollo local

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).
