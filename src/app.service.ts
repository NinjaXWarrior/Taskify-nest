// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class AppService {
//   getHello() {
//     return {
//       status: 'success',
//       message: 'Taskify API is running',
//       version: '1.0.0',
//       docs: '/api',
//       endpoints: {
//         auth: '/auth/register and /auth/login',
//         tasks: '/task',
//       },
//     };
//   }
// }

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly startedAt = new Date();

  getHello(): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>🚀 Taskify API</title>

<style>
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family:Segoe UI,Tahoma,sans-serif;
}

body{
  display:flex;
  justify-content:center;
  align-items:center;
  height:100vh;
  background:linear-gradient(135deg,#0f172a,#1e293b,#334155);
  color:white;
}

.card{
  width:700px;
  max-width:90%;
  background:rgba(255,255,255,.08);
  backdrop-filter:blur(14px);
  border-radius:20px;
  padding:40px;
  box-shadow:0 20px 40px rgba(0,0,0,.4);
}

h1{
  font-size:40px;
  margin-bottom:10px;
}

.status{
  display:inline-block;
  background:#16a34a;
  padding:8px 18px;
  border-radius:20px;
  margin-bottom:25px;
}

.info{
  margin:12px 0;
  font-size:18px;
}

.routes{
  margin-top:25px;
}

.route{
  background:#0f172a;
  border-radius:10px;
  padding:12px;
  margin:10px 0;
}

a.button{
  display:inline-block;
  margin-top:25px;
  background:#2563eb;
  color:white;
  padding:12px 24px;
  border-radius:10px;
  text-decoration:none;
  transition:.3s;
}

a.button:hover{
  background:#1d4ed8;
}

footer{
  margin-top:30px;
  opacity:.7;
}
</style>

</head>

<body>

<div class="card">

<h1>🚀 Taskify API</h1>

<div class="status">
🟢 Online
</div>

<div class="info"><strong>Version:</strong> v1.0.0</div>

<div class="info"><strong>Uptime:</strong> ${this.getUptime()}</div>

<div class="info"><strong>Documentation:</strong> /api</div>

<div class="routes">

<h2>Available Routes</h2>

<div class="route">POST /auth/register</div>
<div class="route">POST /auth/login</div>
<div class="route">GET /task</div>
<div class="route">GET /health</div>

</div>

<a class="button" href="/api">
📚 Open Swagger Docs
</a>

<footer>
Made with ❤️ using NestJS
</footer>

</div>

</body>
</html>
`;
  }

  private getUptime(): string {
    const diff = Date.now() - this.startedAt.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }

    if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    }

    return `${seconds}s`;
  }
}
