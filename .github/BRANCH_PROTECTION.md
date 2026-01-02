# Branch Protection Rules

Configure as regras de proteção de branch no GitHub para garantir a qualidade do código antes de fazer merge.

> **Nota**: Configuração para desenvolvedor solo - sem requisitos de code review, mas com validação obrigatória de CI/CD.

## Como Configurar

Vá em: **Settings** → **Branches** → **Add branch protection rule**

---

## Branch: `main` (Production)

### Configurações Obrigatórias:

- ✅ **Require a pull request before merging**
  - Require approvals: **0** (desenvolvedor solo)
  - ⚠️ Allow specified actors to bypass pull request requirements (para emergências)

- ✅ **Require status checks to pass before merging**
  - Require branches to be up to date before merging
  - Status checks required:
    - `Lint & Format Check`
    - `TypeScript Type Check`
    - `Build Application`
    - `Unit & Component Tests`
    - `E2E Tests with Playwright`
    - `Quality Gate`

- ✅ **Require linear history** (mantém histórico limpo)

- ⚠️ **Allow force pushes** (opcional, apenas você)
  - Specify who can force push: Apenas você

---

## Branch: `homolog` (Homologation/Staging)

### Configurações Obrigatórias:

- ✅ **Require a pull request before merging**
  - Require approvals: **0** (desenvolvedor solo)

- ✅ **Require status checks to pass before merging**
  - Require branches to be up to date before merging
  - Status checks required:
    - `Lint & Format Check`
    - `TypeScript Type Check`
    - `Build Application`
    - `Unit & Component Tests`
    - `E2E Tests with Playwright`

- ✅ **Require linear history**

---

## Branch: `develop` (Development)

### Configurações Obrigatórias:

- ✅ **Require a pull request before merging**
  - Require approvals: **0** (desenvolvedor solo)

- ✅ **Require status checks to pass before merging**
  - Status checks required:
    - `Lint & Format Check`
    - `TypeScript Type Check`
    - `Build Application`
    - `Unit & Component Tests`

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
- ✅ Merge após CI passar (sem aprovação necessária)

### 2. Develop → Homolog
- Criar PR de develop para homolog
- CI + CD rodará
- ✅ Merge após CI passar
- Deploy automático para ambiente de homologação

### 3. Homolog → Main
- Criar PR de homolog para main
- CI + CD rodará com todos os testes
- ✅ Merge após CI passar
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
- Required reviewers: **0** (desenvolvedor solo)

### 2. `homologation`
- URL: https://homolog.yourapp.com
- Required reviewers: **0** (desenvolvedor solo)
- Wait timer: 0 minutes (opcional: adicionar 2-5 min para revisar antes do deploy)

### 3. `production`
- URL: https://yourapp.com
- Required reviewers: **0** (desenvolvedor solo)
- ⚠️ Wait timer: **5 minutes** (recomendado para dar tempo de cancelar se necessário)
- Deployment branches: Only `main`

---

## CODEOWNERS (Opcional)

> Como você é o único desenvolvedor, não é necessário criar o arquivo CODEOWNERS agora.
> Quando o time crescer, crie o arquivo `.github/CODEOWNERS`:

```
# Default owner
* @seu-usuario-github

# Quando tiver time:
# /src/ @frontend-team
# /src/components/ @ui-team
# /.github/ @devops-team
```
