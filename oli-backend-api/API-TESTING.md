# Test All Backend APIs

## Using PowerShell (Windows)

### 1. Health Check
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/health" -Method GET
```

### 2. Register (Create Profile)
```powershell
$registerBody = @{
    email = "admin@jnj.com"
    password = "admin"
    firstName = "Admin"
    lastName = "User"
    role = "admin"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/auth/register" -Method POST -Body $registerBody -ContentType "application/json"
```

### 3. Login (Sign-In)
```powershell
$loginBody = @{
    email = "admin@jnj.com"
    password = "admin"
} | ConvertTo-Json

$loginResponse = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
$accessToken = $loginResponse.accessToken
$refreshToken = $loginResponse.refreshToken
```

### 4. Get Profile
```powershell
$headers = @{
    "Authorization" = "Bearer $accessToken"
}

Invoke-RestMethod -Uri "http://localhost:3000/api/users/me" -Method GET -Headers $headers
```

### 5. Update Profile
```powershell
$updateBody = @{
    firstName = "Admin"
    lastName = "Updated"
} | ConvertTo-Json

$headers = @{
    "Authorization" = "Bearer $accessToken"
}

Invoke-RestMethod -Uri "http://localhost:3000/api/users/me" -Method PATCH -Body $updateBody -ContentType "application/json" -Headers $headers
```

### 6. Token Refresh
```powershell
$refreshBody = @{
    refreshToken = $refreshToken
} | ConvertTo-Json

$refreshResponse = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/refresh" -Method POST -Body $refreshBody -ContentType "application/json"
$accessToken = $refreshResponse.accessToken
```

### 7. Get Chat History
```powershell
$headers = @{
    "Authorization" = "Bearer $accessToken"
}

Invoke-RestMethod -Uri "http://localhost:3000/api/chat/history" -Method GET -Headers $headers
```

### 8. Send Chat Message
```powershell
$messageBody = @{
    message = "What is the current revenue forecast?"
} | ConvertTo-Json

$headers = @{
    "Authorization" = "Bearer $accessToken"
}

Invoke-RestMethod -Uri "http://localhost:3000/api/chat/message" -Method POST -Body $messageBody -ContentType "application/json" -Headers $headers
```

### 9. Logout (Sign-Out)
```powershell
$logoutBody = @{
    refreshToken = $refreshToken
} | ConvertTo-Json

$headers = @{
    "Authorization" = "Bearer $accessToken"
}

Invoke-RestMethod -Uri "http://localhost:3000/api/auth/logout" -Method POST -Body $logoutBody -ContentType "application/json" -Headers $headers
```

## Using curl (if available)

### 1. Register
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@jnj.com\",\"password\":\"admin\",\"firstName\":\"Admin\",\"lastName\":\"User\",\"role\":\"admin\"}"
```

### 2. Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@jnj.com\",\"password\":\"admin\"}"
```

### 3. Get Profile (replace TOKEN with actual token)
```bash
curl -X GET http://localhost:3000/api/users/me \
  -H "Authorization: Bearer TOKEN"
```

## Test Credentials

**Admin User:**
- Email: `admin@jnj.com`
- Password: `admin`

**Regular User:**
- Email: `johnsmith@jis.jnj.com`
- Password: `admin`
