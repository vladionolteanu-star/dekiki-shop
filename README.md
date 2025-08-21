# Dekiki Shop

Acest proiect este o aplicație e-commerce construită cu Next.js și integrată cu Shopify pentru gestionarea produselor.

## Configurarea Mediului de Dezvoltare

### Fișierul .env.local (LIPSĂ - TREBUIE CREAT)

Pentru ca aplicația să funcționeze corect cu Shopify, este necesar să creați un fișier `.env.local` în directorul root al proiectului. Acest fișier nu există momentan în repository și trebuie să îl adăugați manual.

#### Pasii pentru configurare:

1. **Creați fișierul `.env.local`** în directorul root al proiectului (același nivel cu `package.json`)

2. **Adăugați următoarele variabile de mediu** în fișierul `.env.local`:

```env
NEXT_PUBLIC_SHOPIFY_DOMAIN=your-shop-name.myshopify.com
NEXT_PUBLIC_SHOPIFY_TOKEN=your-storefront-access-token
```

#### Cum să obțineți valorile necesare:

##### NEXT_PUBLIC_SHOPIFY_DOMAIN
- Aceasta este domeniul magazinului dumneavoastră Shopify
- Format: `your-shop-name.myshopify.com`
- Exemplu: `dekiki-shop.myshopify.com`

##### NEXT_PUBLIC_SHOPIFY_TOKEN
- Aceasta este cheia de acces Shopify Storefront API
- Pentru a o obține:
  1. Accesați Admin Panel-ul Shopify
  2. Navigați la `Apps` → `Manage private apps`
  3. Creați o aplicație privată sau folosiți una existentă
  4. În secțiunea `Storefront API`, activați accesul și copiați tokenul generat

### Exemplu complet .env.local:

```env
# Shopify Configuration
NEXT_PUBLIC_SHOPIFY_DOMAIN=dekiki-shop.myshopify.com
NEXT_PUBLIC_SHOPIFY_TOKEN=abcd1234567890abcd1234567890abcd
```

### Notă Importantă despre Securitate

- Fișierul `.env.local` este deja inclus în `.gitignore` pentru a preveni expunerea accidentală a credențialelor
- NU commitați niciodată acest fișier în repository
- Păstrați tokenurile în siguranță și nu le distribuiți public

## Funcționalități

- Integrare Shopify prin GraphQL API
- Afișarea produselor din magazinul Shopify
- Interfață responsive construită cu Next.js

## Instalare și Rulare

```bash
# Instalați dependențele
npm install

# Creați fișierul .env.local cu configurațiile de mai sus

# Rulați aplicația în modul de dezvoltare
npm run dev
```

## Structura Proiectului

- `/lib/shopify.js` - Funcții pentru integrarea cu Shopify API
- `/app/` - Componente și pagini Next.js
- `.env.local` - Variabile de mediu (TREBUIE CREAT de utilizator)

Pentru mai multe întrebări despre integrarea Shopify, consultați [documentația oficială Shopify Storefront API](https://shopify.dev/docs/storefront-api).
