# 🧪 Backend API Testing Guide

## ⚠️ Prerequisites

### 1. Install MySQL
- Download MySQL: https://dev.mysql.com/downloads/mysql/
- Or use XAMPP: https://www.apachefriends.org/

### 2. Setup Database

**Option A: Using MySQL Command Line**
```bash
# Login to MySQL
mysql -u root -p

# Run schema
source C:\Users\ADMIN\OneDrive\Desktop\project\backend\database\schema.sql
```

**Option B: Using MySQL Workbench**
1. Open MySQL Workbench
2. Connect to localhost
3. File → Run SQL Script
4. Select: `backend/database/schema.sql`
5. Execute

**Option C: Using XAMPP phpMyAdmin**
1. Start XAMPP (Apache + MySQL)
2. Open: http://localhost/phpmyadmin
3. Click "Import"
4. Choose file: `backend/database/schema.sql`
5. Click "Go"

### 3. Configure Database Connection

Edit `backend/.env.development`:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password_here  # ← Update this!
DB_NAME=oli_db
```

If MySQL root has no password, leave it empty:
```env
DB_PASSWORD=
```

## 🚀 Start Backend Server

```powershell
cd backend
node src/server.js
```

You should see:
```
🚀 OLI Backend Server running on port 3000
📍 Environment: development
🌐 Frontend URL: http://localhost:4200
💾 Database: oli_db@localhost
✅ Database connected successfully
```

## ✅ Test All APIs

Once server is running, test endpoints using PowerShell:

### 1. Health Check
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/health" -Method GET
```

Expected:
```json
{
  "status": "OK",
  "environment": "development",
  "timestamp": "2025-12-25T..."
}
```

### 2. Register New User
```powershell
$body = @{
    email = "newuser@jnj.com"
    password = "password123"
    firstName = "New"
    lastName = "User"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/auth/register" `
  -Method POST `
  -Body $body `
  -ContentType "application/json"
```

### 3. Login with Admin
```powershell
$loginBody = @{
    email = "admin@jnj.com"
    password = "admin"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" `
  -Method POST `
  -Body $loginBody `
  -ContentType "application/json"

# Save tokens
$token = $response.accessToken
$refreshToken = $response.refreshToken

Write-Host "Access Token: $token"
```

### 4. Get User Profile
```powershell
$headers = @{
    "Authorization" = "Bearer $token"
}

Invoke-RestMethod -Uri "http://localhost:3000/api/users/me" `
  -Method GET `
  -Headers $headers
```

### 5. Update Profile
```powershell
$updateBody = @{
    firstName = "Admin"
    lastName = "SuperUser"
} | ConvertTo-Json

$headers = @{
    "Authorization" = "Bearer $token"
}

Invoke-RestMethod -Uri "http://localhost:3000/api/users/me" `
  -Method PATCH `
  -Body $updateBody `
  -ContentType "application/json" `
  -Headers $headers
```

### 6. Refresh Token
```powershell
$refreshBody = @{
    refreshToken = $refreshToken
} | ConvertTo-Json

$newTokens = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/refresh" `
  -Method POST `
  -Body $refreshBody `
  -ContentType "application/json"

$token = $newTokens.accessToken
```

### 7. Get Chat History
```powershell
$headers = @{
    "Authorization" = "Bearer $token"
}

Invoke-RestMethod -Uri "http://localhost:3000/api/chat/history" `
  -Method GET `
  -Headers $headers
```

### 8. Send Chat Message
```powershell
$messageBody = @{
    message = "What is the revenue forecast?"
} | ConvertTo-Json

$headers = @{
    "Authorization" = "Bearer $token"
}

Invoke-RestMethod -Uri "http://localhost:3000/api/chat/message" `
  -Method POST `
  -Body $messageBody `
  -ContentType "application/json" `
  -Headers $headers
```

### 9. Logout
```powershell
$logoutBody = @{
    refreshToken = $refreshToken
} | ConvertTo-Json

$headers = @{
    "Authorization" = "Bearer $token"
}

Invoke-RestMethod -Uri "http://localhost:3000/api/auth/logout" `
  -Method POST `
  -Body $logoutBody `
  -ContentType "application/json" `
  -Headers $headers
```

## 📋 All Endpoints Summary

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | /health | No | Server health check |
| POST | /api/auth/register | No | Create new user |
| POST | /api/auth/login | No | Login with email/password |
| POST | /api/auth/refresh | No | Refresh access token |
| POST | /api/auth/logout | Yes | Logout (invalidate token) |
| GET | /api/users/me | Yes | Get current user profile |
| PATCH | /api/users/me | Yes | Update user profile |
| GET | /api/chat/history | Yes | Get all chat sessions |
| POST | /api/chat/message | Yes | Send chat message |
| GET | /api/chat/session/:id | Yes | Get specific chat |
| DELETE | /api/chat/session/:id | Yes | Delete chat session |

## 🔑 Test Credentials

Pre-configured users in database:

**Admin User:**
- Email: `admin@jnj.com`
- Password: `admin`
- Role: admin

**Regular User:**
- Email: `johnsmith@jis.jnj.com`
- Password: `admin`
- Role: user

## 🐛 Troubleshooting

### Database Connection Failed
- Check MySQL is running
- Verify .env.development credentials
- Test MySQL connection: `mysql -u root -p`

### Port 3000 Already in Use
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID)
taskkill /PID <PID> /F
```

### CORS Errors
- Ensure FRONTEND_URL in .env.development matches your frontend URL
- Default: http://localhost:4200

## ✅ Expected Results

All APIs should return appropriate responses:
- ✅ 200/201 for success
- ✅ 400 for bad requests
- ✅ 401 for unauthorized
- ✅ 404 for not found
- ✅ 500 for server errors

## 📊 Testing Flow

1. Start MySQL
2. Run schema.sql
3. Configure .env.development
4. Start backend server
5. Test health endpoint
6. Register new user OR login with admin
7. Get profile
8. Update profile
9. Test chat endpoints
10. Refresh token
11. Logout

Done! ✅
