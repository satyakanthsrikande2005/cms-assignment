# Enterprise CMS - REST API Specification

All API responses follow the uniform standard:

### Success Response Envelope
```json
{
  "success": true,
  "message": "Operation description",
  "data": {}
}
```

### Error Response Envelope
```json
{
  "success": false,
  "message": "Error summary description",
  "errors": []
}
```

---

## Base URLs
- Local Backend: `http://localhost:5000/api`
- Health Endpoint: `GET /api/health`

---

## Endpoints Summary

### Authentication (`/api/auth`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/login` | Public | Authenticate user & return JWT token |
| `GET` | `/api/auth/me` | Authenticated | Fetch logged-in user profile |
| `PUT` | `/api/auth/change-password` | Authenticated | Change user password |

### User Management (`/api/users`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/users` | Admin | List all registered users (paginated, filtered) |
| `POST` | `/api/users` | Admin | Create a new user account |
| `GET` | `/api/users/:id` | Admin | Fetch user details by ID |
| `PUT` | `/api/users/:id` | Admin | Update user details & role |
| `DELETE` | `/api/users/:id` | Admin | Delete a user account |

### CMS Content Modules (Admin/Author/Editor)
| Resource | Methods | Access |
|---|---|---|
| `/api/pages` | `GET`, `POST`, `GET /:id`, `PUT /:id`, `DELETE /:id` | Author or above |
| `/api/posts` | `GET`, `POST`, `GET /:id`, `PUT /:id`, `DELETE /:id` | Author or above |
| `/api/categories` | `GET`, `POST`, `GET /:id`, `PUT /:id`, `DELETE /:id` | Editor or above |
| `/api/tags` | `GET`, `POST`, `GET /:id`, `PUT /:id`, `DELETE /:id` | Editor or above |
| `/api/media` | `GET`, `POST /upload`, `GET /:id`, `PUT /:id`, `DELETE /:id` | Author or above |
| `/api/settings` | `GET`, `PUT` | Admin |

### Public Endpoints (`/api/public`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/public/pages` | Public | List published CMS pages |
| `GET` | `/api/public/pages/:slug` | Public | Get single published page by slug |
| `GET` | `/api/public/posts` | Public | List published articles (category, tag, page filters) |
| `GET` | `/api/public/posts/:slug` | Public | Get single published article by slug |
| `GET` | `/api/public/categories` | Public | List active content categories |
| `GET` | `/api/public/tags` | Public | List active content tags |
| `GET` | `/api/public/search` | Public | Full-text search across published posts and pages |
| `GET` | `/api/public/settings` | Public | Retrieve public site branding & SEO metadata |
