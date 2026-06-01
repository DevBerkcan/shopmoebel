# Terra & Holz — Premium E-Commerce Shop

Premium Next.js 14 (App Router) + TypeScript + Tailwind Shop für Garten & Möbel.

## Setup in VS Code

1. Ordner in VS Code öffnen.
2. Im integrierten Terminal Abhängigkeiten holen mit deinem bevorzugten Paketmanager
   (pnpm / yarn / der Node-Standard).
3. Dev-Server starten:  pnpm dev   (oder yarn dev)
4. Browser öffnen: http://localhost:3000

## Build (Produktion)

    pnpm build
    pnpm start

## Stack

- Next.js 14 (App Router, RSC)
- TypeScript
- Tailwind CSS
- Premium Naturpalette (Stone, Amber, Holzbraun)

## Empfohlener Production-Stack

- Backend: MedusaJS · DB: PostgreSQL + Prisma · Auth: NextAuth
- Payments: Stripe + Klarna · Search: Meilisearch · Storage: Cloudinary
- Emails: Resend · Hosting: Vercel + Hetzner/Railway

## Seiten

Alle Routen (Home, Shop, Produkt, Cart, Checkout, Account, Wishlist,
Blog, About, Contact) sind in `components/TerraHolzShop.tsx` als
Client-Side Routing implementiert. Für Produktion in echte
App-Router-Routes aufteilen.

## Datenmodell (Prisma-Vorschlag)

User, Product, ProductVariant, Category, Cart, CartItem, Order,
OrderItem, Address, Payment, Review, Coupon, WishlistItem, BlogPost
