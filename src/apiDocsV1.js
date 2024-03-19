import fs from 'fs';
import path from 'path';

// Read package.json file
const packageJson = fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8');
const packageData = JSON.parse(packageJson);

 const  swaggerDocs = {
  openapi: "3.0.3",
  info: {
    title: "Real Estate Investing(REI) CRM api's docs",
    description: "These are the sample api's for Real Estate Investing CRM web application.",
    version: packageData.version,
  },
  servers: [
    {
      url: "http://127.0.0.1:3331/api/v1",
    },
  ],
  tags: [
    {
      name: "HealthCheck",
      description: "For testing purposes only, to ascertain whether the server is up and running or not.",
    },
    {
      name: "Auth",
      description: "Auth api's for users, agents, admins and super admin.",
    },
    {
      name: "Super Admin",
      description: "Dashboard api's for super admin",
    },
    {
      name: "Admin",
      description: "Dashboard api's for admins and their agents.",
    },
  ],
  paths: {
    "/": {
      get: {
        tags: ["HealthCheck"],
        summary: "Test server",
        description: "For testing purposes only, to ascertain whether the server is up and running or not.",
        responses: {
          "200": {
            description: "Successful operation",
          },
          "500": {
            description: "Something went wrong",
          },
        },
      },
    },
    "/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register for normal user.",
        description: "User can register through this endpoint, which will be assigned the role of a normal user.",
        requestBody: {
          description: "Create a new user in the db",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/register",
              },
            },
          },
          required: true,
        },
        responses: {
          "201": {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/registerResponse",
                },
              },
            },
          },
          "403": {
            description: "Forbidden",
          },
          "422": {
            description: "Unprocessable Entity",
          },
          "500": {
            description: "Something went wrong",
          },
        },
      },
    },
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login for all user.",
        description: "Users can log in through this endpoint, regardless of their role.",
        requestBody: {
          description: "Required fields for login a user.",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/login",
              },
            },
          },
          required: true,
        },
        responses: {
          "200": {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/loginResponse",
                },
              },
            },
          },
          "401": {
            description: "Unauthorized",
          },
          "403": {
            description: "Forbidden",
          },
          "422": {
            description: "Unprocessable Entity",
          },
          "500": {
            description: "Something went wrong",
          },
        },
      },
    },
    "/super-admin/dashboard/": {
      get: {
        tags: ["Super Admin"],
        summary: "Get Dashboard profile",
        description: "Get the Dashboard profile for super admin.",
        responses: {
          "200": {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/responses/superAdminGetProfileResponse",
                },
              },
            },
          },
          "401": {
            description: "Unauthorized",
          },
          "403": {
            description: "Forbidden",
          },
          "500": {
            description: "Something went wrong",
          },
        },
      },
    },
    "/super-admin/dashboard/get-admins": {
      get: {
        tags: ["Super Admin"],
      },
    },
    "/dashboard/get-me": {
      get: {
        tags: ["Admin"],
        summary: "Get Dashboard profile",
        description: "User can get all its profile related details.",
        responses: {
          "200": {
            description: "Successful operation",
          },
          "401": {
            description: "Unauthorized",
          },
          "404": {
            description: "Not found.",
          },
          "500": {
            description: "Something went wrong",
          },
        },
      },
    },
    "/dashboard/add-agent": {
      post: {
        tags: ["Admin"],
        summary: "Create an agents",
        description: "Admin can create an agent.",
        requestBody: {
          description: "Required fields for login a user.",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/register",
              },
            },
          },
          required: true,
        },
        responses: {
          "201": {
            description: "Successful operation",
          },
          "401": {
            description: "Unauthorized",
          },
          "403": {
            description: "Forbidden",
          },
          "422": {
            description: "Unprocessable Entity",
          },
          "500": {
            description: "Something went wrong",
          },
        },
      },
    },
  },

  components: {
    schemas: {
      register: {
        type: "object",
        properties: {
          fullname: {
            type: "string",
            example: "John doe",
          },
          email: {
            type: "string",
            example: "john@gmail.com",
          },
          password: {
            type: "string",
            example: "john1234",
          },
        },
      },
      registerResponse: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: true,
          },
          message: {
            type: "string",
            example: "User registered successfully.",
          },
        },
      },
      login: {
        type: "object",
        properties: {
          email: {
            type: "string",
            example: "john@gmail.com",
          },
          password: {
            type: "string",
            example: "john1234",
          },
        },
      },
      loginResponse: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: true,
          },
          message: {
            type: "string",
            example: "User logged in successfully.",
          },
        },
      },
    },
    responses: {
      superAdminGetProfileResponse: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: true,
          },
          message: {
            type: "string",
            example: "Profile fetched successfully.",
          },
          user: {
            type: "object",
            properties: {
              _id: {
                type: "string",
                example: "65e6e479c4c6d5d28b1f1cb9",
              },
              fullname: {
                type: "string",
                example: "Super Admin",
              },
              email: {
                type: "string",
                example: "super@gmail.com",
              },
              role: {
                type: "string",
                example: "SUPER_ADMIN",
              },
            },
          },
        },
      },
    },
  },
};

module.exports = swaggerDocs