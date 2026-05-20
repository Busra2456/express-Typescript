import * as path from "path";
import dotenv from "dotenv";
dotenv.config({
    path: path.join(process.cwd(), '.env')
});
const config = {
    connection_string: process.env.CONNECTION,
    port: process.env.PORT
};
export default config;
//# sourceMappingURL=index.js.map