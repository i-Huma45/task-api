# Running the Task API Locally

## Prerequisites

- **Node.js** v16 or later
- **npm** (bundled with Node.js)
- **PostgreSQL** (running locally or remotely)

## Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/task-api.git
   cd task-api
   ```

2. **Install dependencies**

   ```bash
   npm install

   ```

3. **Set up your database**

   In a psql shell (or via pgAdmin), run:

   ```bash
    CREATE USER taskuser WITH PASSWORD 'taskpass';
    CREATE DATABASE taskdb OWNER taskuser;
   ```

4. **Create your environment file**

   In the project root, create a file named .env with these line

   ```bash
   PORT=4000
   DATABASE_URL=postgres://taskuser:taskpass@localhost:5432/taskdb
   JWT_SECRET=<a-random-32-byte-hex-string>
   ```

   **Generate a random secret with:**

   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

5. **Start the server**

   ```bash
   npm start
   ```

   You should see:

   ```bash
   🚀 Server is up on http://localhost:4000
   ```

6. **Verify it’s running**

   Open your browser to:

   ```bash
   http://localhost:4000
   ```

   You’ll get a default response or 404. To test an endpoint, e.g. registration:

   ```bash
   curl -X POST http://localhost:4000/auth/register \
   -H "Content-Type: application/json" \
   -d '{"email":"test@example.com","password":"pass1234"}'
   ```

   > You can try out other API endpoints in the same way—simply adjust the URL, HTTP method, headers, and JSON body as needed.
