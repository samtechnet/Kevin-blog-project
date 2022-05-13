import swaggerAutogen  from 'swagger-autogen';
//import swaggerJsdoc from "swagger-jsdoc";
//const swaggerAutogen = require("swagger-autogen")();



const doc = {
    info: {
        version: "1.0.0",
        title: "Everything youth (Video and blog App) API",
        description: "API for on everything youth blog web and mobile app by <b> Samuel Omolaja </b> using NodeJs."
    },
    host: "localhost: 5000",
    basePath: "/",
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
        {
            "name": "Auth",
            "description": "Auth endpoints"
        },
        {
            "name": "Admin",
            "description": "Admin endpoints"
        },
        {
            "name": "Post",
            "description": "Post endpoints"
        },
        {
            "name": "Profile",
            "description": "User profile endpoints"
        },
    ],
    securityDefinitions: {
        Authorization: {
            type: "apikey",
            name: "Authorization",
            description: "Value: Bearer",
            in: "header",
            scheme: "bearer"
        }
    },
    definitions: {
        LoginModel: {
            $email: "samlaja1292@gmail.com",
            $password: "Password123#",
        },
        RegistrationModel: {
            $name: "Samue Omolaja",
            $email: "samlaja1292@gmail.com",
            $password: "Password123#",
        },
        UpdateUserModel: {
            $name: "Samue Omolaja",
        },
        CategoryModel: {
            $title: "Comedy",
        },
        BlogPostModel: {
            $category: "6064",
            $title: "Elon Musk admits he wants to travel to Mars because no one hates him there yet",
            $body: "AUSTIN, Texas - Wiping tears from his eyes at a recent presss confrence, SpaceX CEO Elon Musk revealed thar the reason he's so keen on traveling to Mars is not for the potential benefits to science, but because it's the one placee he can think of where no one hates him yet."
        },
        VideoModel: {
            $videoId: "Qw",
            $title: "Welcome to America with God Elmalet and Ron Lovingston",
        },
        CommentModel: {
            $blogpost: "6065",
            $body: "That is very funny (:",
        },
        VerifyEmailModel: {
            $code: 333333,
        },
        ChangePasswordModel: {
            $oldPassword: "Password123#",
            $newPassword: "Password789#",
        },
        ForgotPasswordModel: {
            $email: "talktosamtechnet@gmail.com",
        },
        ResetPasswordModel: {
            $email: "talktosamtechnet@gmail.com",
            $code: 999999,
            $newPassword: "Password789#"
        },
    },
};

const outputFile = "./swagger_output.json";
const endpointFiles = ["./src/routes/index.ts"];

swaggerAutogen()(outputFile, endpointFiles, doc).then(async() => {
    await import("./src/server.ts")
})