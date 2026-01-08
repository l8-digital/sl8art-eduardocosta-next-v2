# Next.js v2

Aplicação web moderna e performática desenvolvida com Next.js 15, React 19 e TypeScript, focada em oferecer uma experiência de usuário excepcional com otimizações avançadas de SEO, performance e segurança.

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Arquitetura do Projeto](#-arquitetura-do-projeto)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Executando o Projeto](#-executando-o-projeto)
- [Build e Deploy](#-build-e-deploy)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Padrões de Desenvolvimento](#-padrões-de-desenvolvimento)
- [Performance e Otimizações](#-performance-e-otimizações)
- [Segurança](#-segurança)
- [Scripts Disponíveis](#-scripts-disponíveis)

---


## 🏗️ Arquitetura do Projeto

### Padrão Arquitetural

O projeto segue uma **arquitetura híbrida** moderna combinando:

1. **App Router (Next.js 15)**: Utiliza o novo sistema de roteamento baseado em pastas do Next.js.
2. **Server Components**: Componentes renderizados no servidor para melhor performance.
3. **Client Components**: Componentes interativos renderizados no cliente.
4. **API Routes**: Endpoints RESTful para comunicação com backend.
5. **Server Actions**: Funções server-side para manipulação de dados.

### Padrão Server vs Client nas Seções
Para garantir o máximo de performance e SEO, utilizamos um padrão de separação nas seções das páginas:
- **`server.tsx`**: É o componente principal da seção. Ele roda no servidor, faz as buscas de dados necessárias (fetching) e passa os dados para o componente visual.
- **`client.tsx`**: Contém apenas a parte interativa (como botões, formulários ou sliders) que precisa rodar no navegador do usuário.

---

## 📁 Estrutura de Pastas

```
app-next/
│
├── public/                          # Arquivos estáticos públicos (Imagens, Vídeos, Favicons)
│
├── src/                             # Código fonte da aplicação
│   │
│   ├── app/                         # App Router (Next.js 15)
│   │   ├── (pages)/                 # Páginas do site (Home, Agenda, Notícias)
│   │   ├── api/                     # Endpoints de API (Interface entre Frontend e Backend)
│   │   ├── providers/               # Contextos do React (ex: Autenticação, Tema)
│   │   ├── layout.tsx               # Layout base comum a todas as páginas
│   │   ├── robots.txt/              # Regras para buscadores (SEO)
│   │   └── sitemap.xml/             # Mapa do site para o Google (SEO)
│   │
│   ├── components/                  # Componentes reutilizáveis (Botões, Cards, Inputs)
│   │
│   ├── config/                      # Configurações globais e técnicas
│   │   ├── metadata.tsx             # Centraliza títulos e descrições para SEO
│   │   ├── theme.ts                 # Define cores, espaçamentos e tokens visuais
│   │   ├── fonts.ts                 # Carregamento e configuração de fontes do Google
│   │   ├── analitcs.tsx             # Integração com Google Analytics/Tag Manager
│   │   └── preload.tsx              # Arquivo arquivo para antecipar o carregamento de arquivos críticos
│   │
│   ├── fonts/                       # Arquivos de fontes locais
│   │
│   ├── lib/                         # Abstrações de bibliotecas (Axios, Auth, Env)
│   │
│   ├── server/                      # Lógica exclusiva de servidor (Server Actions)
│   │
│   ├── styles/                      # Estilos globais (CSS / Sass)
│   │
│   ├── types/                       # Definições de interfaces do TypeScript (Interfaces de dados)
│   │
│   └── utils/                       # Funções utilitárias e ajudantes
│       ├── format.ts                # Formatação de datas, moedas e strings
│       ├── cache.ts                 # Gerenciamento inteligente de memória/cache
│       ├── youtube.ts               # Auxilia na busca e tratamento de vídeos do YouTube
│       ├── flickr.ts                # Ajuda na integração e busca de fotos do Flickr
│       └── baseUrl.ts               # Define a URL base da API dependendo do ambiente
│
├── scripts/                         # Automações de desenvolvimento e build
│
├── .env.example                     # Modelo oficial das chaves de configuração
├── next.config.ts                   # Configurações fundamentais do Next.js
├── tailwind.config.ts               # Regras e customizações do design do Tailwind
└── tsconfig.json                    # Regras de comportamento do TypeScript
```

### Descrição das Principais Pastas

#### `src/app/`
Contém toda a estrutura de roteamento do Next.js 15 usando o App Router. Cada pasta representa uma rota da aplicação.

#### `src/components/`
Componentes React reutilizáveis organizados por funcionalidade. Cada componente possui sua própria pasta com arquivos de implementação e estilos.

#### `src/server/`
Lógica server-side, incluindo server actions, funções de busca de dados e integrações com APIs externas.

#### `src/types/`
Definições de tipos TypeScript compartilhadas em toda a aplicação, garantindo type-safety.

#### `src/config/`
Centraliza as configurações globais que ditam o comportamento e a identidade do site:
- **`metadata.tsx`**: Define os títulos, descrições e imagens (Open Graph) para o Google e redes sociais.
- **`theme.ts`**: Onde as cores padrão e tokens visuais são definidos para garantir consistência.
- **`fonts.ts`**: Configura o carregamento das fontes do Google via Next.js.
- **`analitcs.tsx`**: Gerencia a inserção dos scripts de rastreamento (GA4/GTM).
- **`preload.tsx`**: Otimiza o carregamento inicial de recursos críticos.

#### `src/utils/`
Pequenas ferramentas que facilitam tarefas repetitivas em todo o código:
- **`format.ts`**: Funções para formatar datas (ex: PT-BR), moedas e textos.
- **`cache.ts`**: Lógica para salvar dados temporariamente e evitar requisições duplicadas.
- **`youtube.ts`**: Trata URLs e dados vindos da API do YouTube.
- **`flickr.ts`**: Faz o meio de campo para buscar e formatar fotos do Flickr.
- **`baseUrl.ts`**: Garante que o site saiba se deve falar com o servidor de teste ou de produção.

---

## ✅ Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- **Node.js** versão 18.x ou superior ([Download](https://nodejs.org/))
- **npm** versão 9.x ou superior (incluído com Node.js)
- **Git** ([Download](https://git-scm.com/))
- **Editor de código** (recomendado: [VS Code](https://code.visualstudio.com/))

### Verificar Instalações

```bash
# Verificar versão do Node.js
node --version
# Saída esperada: v18.x.x ou superior

# Verificar versão do npm
npm --version
# Saída esperada: 9.x.x ou superior

# Verificar versão do Git
git --version
# Saída esperada: git version 2.x.x
```

---

## 📦 Instalar Dependências

```bash
# Instalar todas as dependências do projeto
npm install
```

Este comando irá:
- Baixar todas as dependências listadas em `package.json`
- Criar a pasta `node_modules/`
- Gerar o arquivo `package-lock.json` (se não existir)

**Tempo estimado**: 2-5 minutos (dependendo da velocidade da internet)

## ⚙️ Configuração

### Variáveis de Ambiente

O projeto utiliza variáveis de ambiente para configurações sensíveis e específicas do ambiente.

#### Passo 1: Criar arquivo `.env`

```bash
# Copiar o arquivo de exemplo
cp .env.example .env
```

#### Passo 2: Configurar Variáveis

Edite o arquivo `.env` e configure as seguintes variáveis:

```env
# ===================================
# API Configuration
# ===================================
NEXT_API_ENDPOINT_AUTH="https://api.exemplo.com/api/v1/auth"
NEXT_API_ENDPOINT="https://api.exemplo.com/api/v1/site/"

# ===================================
# Client ID
# ===================================
NEXT_API_CLIENT_ID="SEU_CLIENT_ID"
NEXT_API_SECRET="SEU_CLIENT_SECRET"

# ===================================
# Configuração do Bucket AWS 
# ===================================
NEXT_PUBLIC_ASSET_URL="https://assets.exemplo.com"
NEXT_AWS_ACCESS_KEY_ID="SUA_AWS_ACCESS_KEY_ID"
NEXT_AWS_SECRET_ACCESS_KEY="SUA_AWS_SECRET_ACCESS_KEY"
NEXT_AWS_DEFAULT_REGION="us-east-1"
NEXT_AWS_BUCKET_NAME="nome-do-bucket"
NEXT_AWS_USE_PATH_STYLE_ENDPOINT=false
NEXT_AWS_CLOUDFRONT_DISTRIBUTION_ID="ID_DISTRIBUTION"
UPLOAD_ENABLED=true

# ===================================
# Google reCAPTCHA
# ===================================
NEXT_PUBLIC_RECAPTCHA_KEY="SUA_RECAPTCHA_SITE_KEY"
NEXT_RECAPTCHA_SECRET="SUA_RECAPTCHA_SECRET_KEY"

# ===================================
# YouTube API
# ===================================
NEXT_YOUTUBE_INFO="ID_DO_CANAL"
NEXT_YOUTUBE_PLAYLIST="ID_DA_PLAYLIST"
NEXT_YOUTUBE_PLAYLIST_LIMIT=10

```

---

## 🚀 Executando o Projeto

### Modo Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento com Turbopack
npm run dev
```

O servidor estará disponível em: **http://localhost:3000**

## 🏭 Build e Deploy

### Build de Produção

```bash
# Criar build otimizado para produção
npm run build
```

Este comando irá:
1. Executar o script `prebuild` (upload de assets para CDN)
2. Compilar TypeScript
3. Otimizar código JavaScript
4. Gerar páginas estáticas (SSG)
5. Preparar Server Components
6. Otimizar imagens
7. Criar bundle final

**Tempo estimado**: 2-5 minutos

### Executar Build Localmente

```bash
# Iniciar servidor de produção
npm run start
```

O servidor de produção estará disponível em: **http://localhost:3000**

### Deploy

#### Opção 1: Docker

```bash
# Build da imagem Docker
docker build -t sl8art-app .

# Executar container
docker run -p 3000:3000 sl8art-app
```

#### Opção 3: Servidor Node.js

```bash
# No servidor, após clonar o repositório
npm install
npm run build
npm run start
```

### Padrões de Commit

```
feat: Adiciona nova funcionalidade
fix: Corrige um bug
docs: Atualiza documentação
style: Mudanças de formatação
refactor: Refatoração de código
test: Adiciona ou atualiza testes
chore: Tarefas de manutenção
```
