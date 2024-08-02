import mongoose, { ConnectOptions } from "mongoose";

mongoose.set("strictQuery", false);

const ConnectDB = (): void => {
  mongoose
    .connect(  
      process.env.MongoDB_URL as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions
    )
    .then((data) => {
      console.log(`MongoDB connected with server ${data.connection.host}`);
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};

export default ConnectDB;
