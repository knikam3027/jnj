# ==============================================
# OLI Platform - Environment Configuration Guide
# ==============================================

## Quick Start

### For LOCAL Development:
1. Keep all uncommented lines active
2. Keep all PRODUCTION lines commented out
3. `useMockData: true` in Angular environment files

### For PRODUCTION Deployment:
1. Comment all LOCAL lines (add # at the beginning)
2. Uncomment all PRODUCTION lines (remove # at the beginning)
3. Update production values (database host, passwords, URLs)
4. `useMockData: false` in Angular environment files

## File Locations

### Backend: 
`oli-backend-api/.env`

### Frontend:
`oli-frontend-ui/.env`

## How to Switch Environments

### Going from LOCAL → PRODUCTION:

**Backend (.env):**
```bash
# Comment LOCAL lines
# NODE_ENV=development
# PORT=3000
# HOST=localhost

# Uncomment PRODUCTION lines
NODE_ENV=production
PORT=3000
HOST=0.0.0.0
```

**Frontend (.env):**
```bash
# Comment LOCAL lines
# VITE_API_URL=http://localhost:3000/api
# VITE_USE_MOCK_DATA=true

# Uncomment PRODUCTION lines
VITE_API_URL=https://api.oli.jnj.com/api
VITE_USE_MOCK_DATA=false
```

### Going from PRODUCTION → LOCAL:

Just reverse the process - comment PRODUCTION lines and uncomment LOCAL lines.

## Important Notes

1. **Never commit sensitive data** like production passwords to version control
2. **Use .env.example** files to share configuration templates
3. **Update production values** before deploying (DB passwords, JWT secrets, etc.)
4. **Test locally** before switching to production configuration
5. **.gitignore** should include `.env` files to prevent accidental commits

## Security Checklist for Production

- [ ] Change JWT_SECRET to a strong random value
- [ ] Change JWT_REFRESH_SECRET to a strong random value
- [ ] Update DB_PASSWORD with secure production password
- [ ] Update DB_HOST with production database URL
- [ ] Set SSO_ENABLED=true if using SSO
- [ ] Update FRONTEND_URL to production domain
- [ ] Set NODE_ENV=production
- [ ] Increase BCRYPT_ROUNDS to 12 for better security
