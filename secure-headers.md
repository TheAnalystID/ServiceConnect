# Secure Headers Configuration

This document outlines the secure headers that should be configured on your web server to enhance the security of the Service Connect website.

## Required Headers

### 1. X-Frame-Options
Prevents your site from being embedded in iframes (clickjacking protection).

```
X-Frame-Options: DENY
```

### 2. X-Content-Type-Options
Prevents browsers from MIME type sniffing.

```
X-Content-Type-Options: nosniff
```

### 3. X-XSS-Protection
Enables browser's built-in XSS protection.

```
X-XSS-Protection: 1; mode=block
```

### 4. Referrer-Policy
Controls how much referrer information is included with requests.

```
Referrer-Policy: strict-origin-when-cross-origin
```

### 5. Permissions-Policy
Restricts which features and APIs can be used.

```
Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=()
```

### 6. Content-Security-Policy
Controls which resources can be loaded (already implemented via meta tag).

```
Content-Security-Policy: default-src 'self' https:; script-src 'self' 'unsafe-inline' https://forms.zohopublic.com https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src 'self' data: https:; connect-src 'self' https://forms.zohopublic.com; frame-ancestors 'none'; form-action 'self' https://forms.zohopublic.com;
```

### 7. Strict-Transport-Security
Forces browsers to use HTTPS (already implemented via meta tag).

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

## Implementation Instructions

### For Apache (.htaccess)
Add the following to your .htaccess file:

```apache
# Security Headers
<IfModule mod_headers.c>
    Header set X-Frame-Options "DENY"
    Header set X-Content-Type-Options "nosniff"
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
    Header set Permissions-Policy "geolocation=(), microphone=(), camera=(), payment=()"
    Header set Content-Security-Policy "default-src 'self' https:; script-src 'self' 'unsafe-inline' https://forms.zohopublic.com https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src 'self' data: https:; connect-src 'self' https://forms.zohopublic.com; frame-ancestors 'none'; form-action 'self' https://forms.zohopublic.com;"
    Header set Strict-Transport-Security "max-age=31536000; includeSubDomains"
</IfModule>
```

### For Nginx
Add the following to your nginx configuration:

```nginx
# Security Headers
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=(), payment=()" always;
add_header Content-Security-Policy "default-src 'self' https:; script-src 'self' 'unsafe-inline' https://forms.zohopublic.com https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src 'self' data: https:; connect-src 'self' https://forms.zohopublic.com; frame-ancestors 'none'; form-action 'self' https://forms.zohopublic.com;" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

### For Cloudflare
If you're using Cloudflare, you can enable these headers through the Cloudflare dashboard:

1. Log in to your Cloudflare account
2. Select your domain
3. Go to "Security" > "Security Level"
4. Set the security level to "High"
5. Go to "Page Rules" and create a new rule for your domain
6. Add the following headers in the "Response Headers" section

## Testing

After implementing these headers, you can test them using:

1. [SecurityHeaders.com](https://securityheaders.com/)
2. [Mozilla Observatory](https://observatory.mozilla.org/)
3. Chrome DevTools > Network tab > Headers

## Notes

- These headers provide defense-in-depth security
- They complement the Content Security Policy already implemented
- Some headers may need adjustment based on your specific requirements
- Always test thoroughly after implementing security headers 