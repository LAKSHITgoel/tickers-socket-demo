## OptionX

-install redis on local machine

set redis-ser port in backend application _index.ts_
default port in most cases is 6379

```sh
    backend/index.ts
16    const client = new Redis(6379, 'localhost');

```

Running the backend application

```sh
cd backend
npm run start
```

Running client application

```sh
cd frontend
npm run preview
```
