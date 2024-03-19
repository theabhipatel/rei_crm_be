import fs from "fs";
import path from "path";

// Read package.json file
const packageJson = fs.readFileSync(path.join(__dirname, "../package.json"), "utf8");
const packageData = JSON.parse(packageJson);

const swaggerDocs = {
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
          200: {
            description: "Successful operation",
          },
          500: {
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
          201: {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/responses/registerResponse",
                },
              },
            },
          },
          403: {
            description: "Forbidden",
          },
          422: {
            description: "Unprocessable Entity",
          },
          500: {
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
          200: {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/responses/loginResponse",
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
          },
          403: {
            description: "Forbidden",
          },
          422: {
            description: "Unprocessable Entity",
          },
          500: {
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
          200: {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/responses/superAdminGetProfileResponse",
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
          },
          403: {
            description: "Forbidden",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/super-admin/dashboard/get-admins": {
      get: {
        tags: ["Super Admin"],
        summary: "Get all admins",
        description: "for get all admins are there on platform.",
        responses: {
          200: {
            description: "Successful operation",
          },
        },
      },
    },
    "/super-admin/dashboard/get-admins-with-agent": {
      get: {
        tags: ["Super Admin"],
        summary: "Get all admins",
        description: "for get all admins and their agents both are there on platform.",
        responses: {
          200: {
            description: "Successful operation",
          },
        },
      },
    },
    "/super-admin/dashboard/add-admin": {
      post: {
        tags: ["Super Admin"],
        summary: "Add admin directly",
        description: "for add admin directly from the super admin dashboard.",
        requestBody: {
          description: "add admin and these are field that are required.",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/addAdminSchema",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Successful operation",
          },
        },
      },
    },

    "/super-admin/dashboard/update-admin/{id}": {
      patch: {
        tags: ["Super Admin"],
        summary: "update admin",
        description: "for update admin directly from the super admin dashboard.",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "id of admin for update",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          description: "update admin and all the fields  are optional.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  isBlocked: {
                    type: "boolean",
                    example: true,
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Successful operation",
          },
        },
      },
    },

    /** ----> Super Admin Plan routes */

    "/super-admin/dashboard/create-plan": {
      post: {
        tags: ["Super Admin"],
        summary: "Create plan",
        description: "for create plan directly from the super admin dashboard.",
        requestBody: {
          description: "create plan and these are field that are required.",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/createPlanSchema",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Successful operation",
          },
        },
      },
    },
    "/super-admin/dashboard/get-plans": {
      get: {
        tags: ["Super Admin"],
        summary: "Get all plans",
        description: "for get all plans from the super admin dashboard.",
        responses: {
          200: {
            description: "Successful operation",
          },
        },
      },
    },
    "/super-admin/dashboard/update-plan/{id}": {
      patch: {
        tags: ["Super Admin"],
        summary: "Update plan",
        description: "for update plan directly from the super admin dashboard.",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Id for plan to update",
            required: true,
          },
        ],
        requestBody: {
          description: "update plan and all the fields are optional.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                    example: "Updated plan details",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Successful operation",
          },
        },
      },
    },
    "/super-admin/dashboard/delete-plan/{id}": {
      delete: {
        tags: ["Super Admin"],
        summary: "Delete plan",
        description: "for delete plan directly from the super admin dashboard.",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Id for plan to delete",
            required: true,
          },
        ],

        responses: {
          200: {
            description: "Successful operation",
          },
        },
      },
    },

    //#########################################
    /** ----> Routes for Admin */
    //#########################################

    "/dashboard/get-me": {
      get: {
        tags: ["Admin"],
        summary: "Get Dashboard profile",
        description: "User can get all its profile related details.",
        responses: {
          200: {
            description: "Successful operation",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "Not found.",
          },
          500: {
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
          201: {
            description: "Successful operation",
          },
          401: {
            description: "Unauthorized",
          },
          403: {
            description: "Forbidden",
          },
          422: {
            description: "Unprocessable Entity",
          },
          500: {
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
      addAdminSchema: {
        type: "object",
        properties: {
          fullname: {
            type: "string",
            example: "Admin 3",
          },
          email: {
            type: "string",
            example: "admin3@gmail.com",
          },
          password: {
            type: "string",
            example: "1234",
          },
        },
      },
      createPlanSchema: {
        type: "object",
        properties: {
          title: {
            type: "string",
            example: "Pro",
          },
          type: {
            type: "string",
            example: "Yearly",
          },
          users: {
            type: "integer",
            example: 12,
          },
          price_permonth: {
            type: "integer",
            example: 209,
          },
          description: {
            type: "string",
            example: "Pro plan for medium teams",
          },
          details: {
            type: "array",
            items: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  example: "Unlimited Lead Sources",
                },
                description: {
                  type: "string",
                  example: "Unlock full potential from Unlimited Lead Sources",
                },
              },
            },
          },
        },
      },
    },

    responses: {
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

module.exports = swaggerDocs;
