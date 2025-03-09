# vite-pwa-react-template

## Development

```bash
# Install dependencies
pnpm i

# Run the development server
pnpm dev
```

## Deployment

1. Add the `VERCEL_TOKEN` and `VERCEL_ORG_ID` to the repository or organization secrets.
2. Create a new Vercel project using the repository and add the `VERCEL_PROJECT_ID` to the repository secrets.
3. Delete the commented out workflows in the `.github/workflows` directory:
   - `changesets.yaml`
   - `deploy-hotfix.yaml`
   - `deploy-preview.yaml`
   - `deploy-production.yaml`
4. Make a new commit to the `main` branch to trigger a new production deployment and a new version tag.
