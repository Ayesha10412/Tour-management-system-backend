import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";
let server: Server;
const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);
    console.log("Connected to DB!!");
    server = app.listen(envVars.PORT, () => {
      console.log(`Server is running on port ${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
(async () => {
  startServer();
  seedSuperAdmin();
})();
process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection detected... Server shutting down...", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
    process.exit(1);
  }
});
process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception detected... Server shutting down...", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
    process.exit(1);
  }
});
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received... Server shutting down");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
    process.exit(1);
  }
});
process.on("SIGINT", () => {
  console.log("SIGINT signal received... Server shutting down");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
    process.exit(1);
  }
});
//unhandled rejection error
//Promise.reject(new Error("I forgot to catch this promise"));

//uncaught rejection error
//throw new Error("I forgot to handle this local error");
//signal termination sigterm
