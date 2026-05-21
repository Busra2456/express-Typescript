// npm init --y
//npm i -D typescript
// npx tsc --init
// npm install -D @types/node
//  npm install express --save
// npm install --save-dev @types/express
//npm i -D tsx
//npx neonctl@latest init
//npm i pg
// npm install --save-dev @types/
// npm install dotenv
//npx tsc
//npm i bcryptjs
//npm i jsonwebtoken
//npm install --save @types/jsonwebtoken
//npm i cookie-parser
// npm install -D @types/cookie-parser
// npm i cors
// npm install --save-dev @types/cors
import express, {} from "express";
import { userRouter } from "./modules/user/user.route";
import { profileRouter } from "./modules/profile/profiles.route";
import { authRoute } from "./modules/auth/auth.route";
import logger from "./middleware/logger";
// import cookieParser from 'cookie-parser';
import cookieParser from "cookie-parser";
import cors from "cors";
import globalErrorHandler from "./middleware/globalErrorHandler";
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(cors({
    origin: 'http://localhost:8000',
}));
app.get('/', (req, res) => {
    //   res.send('Hello World!')
    res.status(200).json({
        message: "Express Server",
        "author": "Next Level",
    });
});
app.use("/api/users", userRouter);
app.use("/api/profile", profileRouter);
app.use("/api/auth", authRoute);
app.use(globalErrorHandler);
export default app;
//deploy korar niyom
//package.json ar modde"scripts": {"build":"tsc"}add korte hobe
//npm run build              
//npm i -g vercel
//vercel login
//vercel --prod
//# sourceMappingURL=app.js.map