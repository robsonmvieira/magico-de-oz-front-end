# Branch Protection Rules

Configure as regras de proteção de branch no GitHub para garantir a qualidade do código antes de fazer merge.

## Como Configurar

Vá em: **Settings** → **Branches** → **Add branch protection rule**

---

## Branch: `main` (Production)

### Configurações Obrigatórias:

- ✅ **Require a pull request before merging**
  - Require approvals: **2**
  - Dismiss stale pull request approvals when new commits are pushed
  - Require review from Code Owners

- ✅ **Require status checks to pass before merging**
  - Require branches to be up to date before merging
  - Status checks required:
    - `Lint & Format Check`
    - `TypeScript Type Check`
    - `Build Application`
    - `Unit & Component Tests`
    - `E2E Tests with Playwright`
    - `Quality Gate`

- ✅ **Require conversation resolution before merging**

- ✅ **Require signed commits**

- ✅ **Require linear history**

- ✅ **Do not allow bypassing the above settings**
  - Include administrators

- ✅ **Restrict who can push to matching branches**
  - Only allow: Release Managers / DevOps Team

---

## Branch: `homolog` (Homologation/Staging)

### Configurações Obrigatórias:

- ✅ **Require a pull request before merging**
  - Require approvals: **1**
  - Dismiss stale pull request approvals when new commits are pushed

- ✅ **Require status checks to pass before merging**
  - Require branches to be up to date before merging
  - Status checks required:
    - `Lint & Format Check`
    - `TypeScript Type Check`
    - `Build Application`
    - `Unit & Component Tests`
    - `E2E Tests with Playwright`

- ✅ **Require conversation resolution before merging**

- ✅ **Require linear history**

---

## Branch: `develop` (Development)

### Configurações Obrigatórias:

- ✅ **Require a pull request before merging**
  - Require approvals: **1**

- ✅ **Require status checks to pass before merging**
  - Status checks required:
    - `Lint & Format Check`
    - `TypeScript Type Check`
    - `Build Application`
    - `Unit & Component Tests`

- ✅ **Require conversation resolution before merging**

---

## Fluxo de Trabalho Recomendado

```
feature/xxx → develop → homolog → main
     ↓           ↓         ↓        ↓
   (PR)       (PR+CI)  (PR+CI+CD) (PR+CI+CD+Release)
```

### 1. Feature → Develop
- Criar PR da feature para develop
- CI rodará automaticamente
- 1 aprovação necessária
- Merge após CI passar

### 2. Develop → Homolog
- Criar PR de develop para homolog
- CI + CD rodará
- 1 aprovação necessária
- Deploy automático para ambiente de homologação

### 3. Homolog → Main
- Criar PR de homolog para main
- CI + CD rodará
- 2 aprovações necessárias
- Deploy automático para produção
- Release criada automaticamente

---

## Secrets Necessários no GitHub

Configure em: **Settings** → **Secrets and variables** → **Actions**

### Development Environment
- `DEV_API_URL`

### Homologation Environment
- `HOMOLOG_API_URL`

### Production Environment
- `PROD_API_URL`

### Deployment Platforms (escolha um)

#### Para Vercel:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

#### Para Netlify:
- `NETLIFY_SITE_ID`
- `NETLIFY_AUTH_TOKEN`

#### Para AWS S3:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_S3_BUCKET_DEV`
- `AWS_S3_BUCKET_HOMOLOG`
- `AWS_S3_BUCKET_PROD`

---

## Environments no GitHub

Configure em: **Settings** → **Environments**

### 1. `development`
- URL: https://dev.yourapp.com
- No required reviewers

### 2. `homologation`
- URL: https://homolog.yourapp.com
- Required reviewers: 1

### 3. `production`
- URL: https://yourapp.com
- Required reviewers: 2
- Wait timer: 5 minutes
- Deployment branches: Only `main`

---

## CODEOWNERS

Crie o arquivo `.github/CODEOWNERS`:

```
# Default owners
* @team-leads

# Frontend
/src/ @frontend-team
/src/components/ @ui-team

# Infrastructure
/.github/ @devops-team
/vite.config.ts @devops-team
/package.json @tech-leads
```
