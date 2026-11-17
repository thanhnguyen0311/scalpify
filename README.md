# Spring Boot + ReactJS sample

A small monorepo starter:
- `backend/`: Java 21, Spring Boot, Maven, REST API
- `frontend/`: React + Vite
- MySQL configuration through environment variables
- No Dockerfile included

## Requirements
- Java 21
- Node.js 20+
- Maven (or use the included Maven Wrapper after generating it)
- MySQL 8+

## Run locally

### 1. Backend
Create a MySQL database named `sample_app`, then set environment variables:

```bash
export DB_URL='jdbc:mysql://localhost:3306/sample_app'
export DB_USERNAME='root'
export DB_PASSWORD='your-password'
cd backend
mvn spring-boot:run
```

Backend: http://localhost:8080  
Health: http://localhost:8080/actuator/health  
API: http://localhost:8080/api/products

### 2. Frontend
In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:5173

Vite proxies `/api` requests to `http://localhost:8080` in development.

## DigitalOcean App Platform deployment (one App)

Create one App Platform app with two components from this repository:

### Component A — React
- Source directory: `/frontend`
- Type: Static Site
- Build command: `npm ci && npm run build`
- Output directory: `dist`
- Environment variable: `VITE_API_BASE_URL=/api`

### Component B — Spring Boot
App Platform's Java source-build support can vary by buildpack/runtime availability. This starter intentionally contains no Dockerfile. Before choosing a source-based Java component, verify that the current App Platform build environment supports your Java/Maven project. If it does not, use a supported container-image deployment (for example, build the image in CI with Jib) or choose a Java-friendly hosting service. Do not assume that `pom.xml` alone guarantees automatic Java detection.

- Source directory: `/backend`
- Build command (if supported): `mvn -B clean package -DskipTests`
- Run command: `java -jar target/spring-react-backend-0.0.1-SNAPSHOT.jar`
- HTTP port: `8080` (the app reads `PORT` if provided)

### Routing
Configure the App Platform route `/api` to send requests to the backend component. Serve all other paths from the React Static Site. If your App Platform setup does not support the desired path routing for these component types, use a separate API subdomain or configure a reverse proxy.

### MySQL
Use a DigitalOcean Managed MySQL database. Set:
- `DB_URL`: JDBC URL for the database, including database name and SSL parameters required by your cluster
- `DB_USERNAME`
- `DB_PASSWORD`

Keep credentials in App Platform environment variables/secrets, never in Git.

## Notes
- The demo uses an in-memory product list so the UI works without MySQL. MySQL connection settings are included as a starting point; add Spring Data JPA entities/repositories when you are ready to persist data.
- CORS is open for local development in this sample. Restrict allowed origins before production.
