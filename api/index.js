// backend/src/serverless.ts
import mongoose12 from "mongoose";

// backend/src/app.ts
import cors from "cors";
import express16 from "express";
import httpStatus23 from "http-status";

// backend/src/app/middlewares/globalErrorHandler.ts
import { ZodError } from "zod";
import mongoose from "mongoose";

// backend/src/config/index.ts
import dotenv from "dotenv";
import path from "path";
dotenv.config();
dotenv.config({ path: path.join(process.cwd(), ".env") });
var DEFAULT_MONGO_URI = "mongodb://sifatict26_db_user:39q1GUM5YYbmvyN3@ac-kzkc9nu-shard-00-00.fu7k8im.mongodb.net:27017,ac-kzkc9nu-shard-00-01.fu7k8im.mongodb.net:27017,ac-kzkc9nu-shard-00-02.fu7k8im.mongodb.net:27017/portfolio?ssl=true&replicaSet=atlas-ahcigm-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";
var config_default = {
  node_env: process.env.NODE_ENV || "development",
  port: process.env.PORT || "5000",
  mongodb_uri: process.env.MONGODB_URI || DEFAULT_MONGO_URI,
  bcrypt_salt_rounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 12,
  jwt: {
    secret: process.env.JWT_SECRET || "super_secret_jwt_key_change_me_in_production_tanvir_sifat_2026",
    expires_in: process.env.JWT_EXPIRES_IN || "90d"
  },
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dklcgg4jx",
    api_key: process.env.CLOUDINARY_API_KEY || "349633643938146",
    api_secret: process.env.CLOUDINARY_API_SECRET || "ljSon8bsgXXDXFvNw3RW9pPEGxE"
  },
  smtp: {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    user: process.env.SMTP_USER || "sifatict26@gmail.com",
    pass: process.env.SMTP_PASS || "gigd ldwa pffn ngob",
    adminEmail: process.env.ADMIN_EMAIL || "sifatict26@gmail.com"
  },
  frontendUrl: process.env.FRONTEND_URL || "https://tanvir-sifat.vercel.app",
  backendUrl: process.env.BACKEND_URL || "https://tanvir-sifat.vercel.app"
};

// backend/src/errors/ApiError.ts
var ApiError = class extends Error {
  constructor(statusCode, message, stack = "") {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
};
var ApiError_default = ApiError;

// backend/src/errors/handleCastError.ts
var handleCastError = (error) => ({
  statusCode: 400,
  message: "Cast Error",
  errorMessages: [{ path: error.path, message: "Invalid ID" }]
});
var handleCastError_default = handleCastError;

// backend/src/errors/handleDuplicateError.ts
var handleDuplicateError = (error) => {
  const match = error.message.match(/"(.*?)"/);
  const value = match ? match[1] : "";
  return { statusCode: 409, message: "Duplicate Entry", errorMessages: [{ path: "", message: `${value} already exists` }] };
};
var handleDuplicateError_default = handleDuplicateError;

// backend/src/errors/handleValidationError.ts
var handleValidationError = (error) => {
  const errors = Object.values(error.errors).map((el) => ({
    path: el?.path,
    message: el?.message
  }));
  return { statusCode: 400, message: "Validation error", errorMessages: errors };
};
var handleValidationError_default = handleValidationError;

// backend/src/errors/handleZodError.ts
var handleZodError = (error) => {
  const errors = error.issues.map((issue) => ({
    path: issue.path[issue.path.length - 1] || "",
    message: issue.message
  }));
  return { statusCode: 400, message: "Validation error", errorMessages: errors };
};
var handleZodError_default = handleZodError;

// backend/src/app/middlewares/globalErrorHandler.ts
var globalErrorHandler = (err, req, res, _next) => {
  console.error("Error:", err);
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorMessages = [];
  if (err instanceof mongoose.Error.ValidationError) {
    const s = handleValidationError_default(err);
    statusCode = s.statusCode;
    message = s.message;
    errorMessages = s.errorMessages;
  } else if (err instanceof ZodError) {
    const s = handleZodError_default(err);
    statusCode = s.statusCode;
    message = s.message;
    errorMessages = s.errorMessages;
  } else if (err instanceof mongoose.Error.CastError) {
    const s = handleCastError_default(err);
    statusCode = s.statusCode;
    message = s.message;
    errorMessages = s.errorMessages;
  } else if (err?.code === 11e3) {
    const s = handleDuplicateError_default(err);
    statusCode = s.statusCode;
    message = s.message;
    errorMessages = s.errorMessages;
  } else if (err instanceof ApiError_default) {
    statusCode = err.statusCode;
    message = err.message;
    errorMessages = [{ path: "", message: err.message }];
  } else if (err instanceof Error) {
    message = err.message;
    errorMessages = [{ path: "", message: err.message }];
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config_default.node_env !== "production" ? err?.stack : void 0
  });
};
var globalErrorHandler_default = globalErrorHandler;

// backend/src/app/routes/index.ts
import express15 from "express";

// backend/src/app/modules/About/about.route.ts
import express from "express";

// backend/src/app/middlewares/auth.ts
import httpStatus from "http-status";

// backend/src/helpers/jwtHelpers.ts
import jwt from "jsonwebtoken";
var createToken = (payload, secret, expiresIn) => jwt.sign(payload, secret, { expiresIn });
var verifyToken = (token, secret) => jwt.verify(token, secret);
var jwtHelpers = { createToken, verifyToken };

// backend/src/app/middlewares/auth.ts
var auth = (...requiredRoles) => async (req, _res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new ApiError_default(httpStatus.UNAUTHORIZED, "You are not authorized");
    let verifiedUser = null;
    try {
      verifiedUser = jwtHelpers.verifyToken(token, config_default.jwt.secret);
    } catch {
      throw new ApiError_default(httpStatus.FORBIDDEN, "Invalid or expired token");
    }
    req.user = verifiedUser ?? void 0;
    if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
      throw new ApiError_default(httpStatus.FORBIDDEN, "Forbidden");
    }
    next();
  } catch (error) {
    next(error);
  }
};
var auth_default = auth;

// backend/src/app/modules/About/about.controller.ts
import httpStatus2 from "http-status";

// backend/src/shared/catchAsync.ts
var catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
var catchAsync_default = catchAsync;

// backend/src/shared/sendResponse.ts
var sendResponse = (res, data) => {
  res.status(data.statusCode).json({
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || "Success",
    meta: data.meta,
    data: data.data
  });
};
var sendResponse_default = sendResponse;

// backend/src/app/modules/About/about.model.ts
import mongoose2, { Schema } from "mongoose";
var aboutSchema = new Schema({ headline: String, short: [String], paragraphs: [String] }, { timestamps: true });
var About = mongoose2.model("About", aboutSchema);
var about_model_default = About;

// backend/src/app/modules/About/about.service.ts
var getAbout = async () => await about_model_default.findOne();
var upsertAbout = async (payload) => await about_model_default.findOneAndUpdate({}, payload, { upsert: true, new: true });
var AboutService = { getAbout, upsertAbout };

// backend/src/app/modules/About/about.controller.ts
var getAbout2 = catchAsync_default(async (_req, res) => {
  const result = await AboutService.getAbout();
  sendResponse_default(res, { statusCode: httpStatus2.OK, success: true, message: "About retrieved", data: result });
});
var upsertAbout2 = catchAsync_default(async (req, res) => {
  const result = await AboutService.upsertAbout(req.body);
  sendResponse_default(res, { statusCode: httpStatus2.OK, success: true, message: "About updated", data: result });
});
var AboutController = { getAbout: getAbout2, upsertAbout: upsertAbout2 };

// backend/src/app/modules/About/about.route.ts
var router = express.Router();
router.get("/", AboutController.getAbout);
router.put("/", auth_default(), AboutController.upsertAbout);
var AboutRoutes = router;

// backend/src/app/modules/Admin/admin.route.ts
import express2 from "express";

// backend/src/app/middlewares/validateRequest.ts
var validateRequest = (schema) => async (req, _res, next) => {
  try {
    await schema.parseAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
var validateRequest_default = validateRequest;

// backend/src/app/modules/Admin/admin.controller.ts
import httpStatus4 from "http-status";

// backend/src/app/modules/Admin/admin.service.ts
import bcrypt from "bcrypt";
import httpStatus3 from "http-status";

// backend/src/app/modules/Admin/admin.model.ts
import mongoose3, { Schema as Schema2 } from "mongoose";
var adminSchema = new Schema2(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
    mustChangePassword: { type: Boolean, default: true }
  },
  { timestamps: true }
);
var Admin = mongoose3.model("Admin", adminSchema);
var admin_model_default = Admin;

// backend/src/app/modules/Admin/admin.service.ts
var loginAdmin = async (payload) => {
  const admin = await admin_model_default.findOne({ email: payload.email });
  if (!admin) throw new ApiError_default(httpStatus3.NOT_FOUND, "Admin account not found.");
  if (admin.isBlocked) throw new ApiError_default(httpStatus3.FORBIDDEN, "Account is blocked.");
  const isMatch = await bcrypt.compare(payload.password, admin.password);
  if (!isMatch) throw new ApiError_default(httpStatus3.UNAUTHORIZED, "Incorrect email or password.");
  const jwtPayload = {
    userId: admin._id.toString(),
    role: "ADMIN",
    mustChangePassword: admin.mustChangePassword
  };
  const accessToken = jwtHelpers.createToken(jwtPayload, config_default.jwt.secret, config_default.jwt.expires_in);
  return {
    accessToken,
    mustChangePassword: admin.mustChangePassword,
    adminData: {
      _id: admin._id.toString(),
      name: admin.name,
      email: admin.email,
      isBlocked: admin.isBlocked,
      mustChangePassword: admin.mustChangePassword
    }
  };
};
var getMe = async (adminId) => {
  const admin = await admin_model_default.findById(adminId).select("-password");
  if (!admin) throw new ApiError_default(httpStatus3.NOT_FOUND, "Admin not found.");
  return admin;
};
var changePassword = async (adminId, payload) => {
  const admin = await admin_model_default.findById(adminId);
  if (!admin) throw new ApiError_default(httpStatus3.NOT_FOUND, "Admin not found.");
  const matched = await bcrypt.compare(payload.currentPassword, admin.password);
  if (!matched) throw new ApiError_default(httpStatus3.UNAUTHORIZED, "Current password is incorrect.");
  admin.password = await bcrypt.hash(payload.newPassword, config_default.bcrypt_salt_rounds);
  admin.mustChangePassword = false;
  await admin.save();
  const jwtPayload = { userId: admin._id.toString(), role: "ADMIN", mustChangePassword: false };
  const accessToken = jwtHelpers.createToken(jwtPayload, config_default.jwt.secret, config_default.jwt.expires_in);
  return { accessToken };
};
var updateProfile = async (adminId, payload) => {
  const admin = await admin_model_default.findByIdAndUpdate(adminId, { name: payload.name.trim() }, { new: true }).select(
    "-password"
  );
  if (!admin) throw new ApiError_default(httpStatus3.NOT_FOUND, "Admin not found.");
  return admin;
};
var AdminService = { loginAdmin, getMe, changePassword, updateProfile };

// backend/src/app/modules/Admin/admin.controller.ts
var loginAdmin2 = catchAsync_default(async (req, res) => {
  const result = await AdminService.loginAdmin(req.body);
  sendResponse_default(res, { statusCode: httpStatus4.OK, success: true, message: "Login successful", data: result });
});
var getMe2 = catchAsync_default(async (req, res) => {
  const result = await AdminService.getMe(req.user.userId);
  sendResponse_default(res, { statusCode: httpStatus4.OK, success: true, message: "Profile retrieved", data: result });
});
var changePassword2 = catchAsync_default(async (req, res) => {
  const result = await AdminService.changePassword(req.user.userId, req.body);
  sendResponse_default(res, { statusCode: httpStatus4.OK, success: true, message: "Password changed", data: result });
});
var updateProfile2 = catchAsync_default(async (req, res) => {
  const result = await AdminService.updateProfile(req.user.userId, req.body);
  sendResponse_default(res, { statusCode: httpStatus4.OK, success: true, message: "Profile updated", data: result });
});
var AdminController = { loginAdmin: loginAdmin2, getMe: getMe2, changePassword: changePassword2, updateProfile: updateProfile2 };

// backend/src/app/modules/Admin/admin.validation.ts
import { z } from "zod";
var loginAdminZodSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email("Invalid email"),
  password: z.string({ required_error: "Password is required" }).min(1)
});
var changePasswordZodSchema = z.object({
  currentPassword: z.string().min(1, "Current password required"),
  newPassword: z.string().min(6, "Min 6 characters")
});
var AdminValidation = { loginAdminZodSchema, changePasswordZodSchema };

// backend/src/app/modules/Admin/admin.route.ts
var router2 = express2.Router();
router2.post("/login", validateRequest_default(AdminValidation.loginAdminZodSchema), AdminController.loginAdmin);
router2.get("/me", auth_default(), AdminController.getMe);
router2.patch("/change-password", auth_default(), validateRequest_default(AdminValidation.changePasswordZodSchema), AdminController.changePassword);
router2.patch("/profile", auth_default(), AdminController.updateProfile);
var AdminRoutes = router2;

// backend/src/app/modules/Analytics/analytics.route.ts
import express3 from "express";

// backend/src/app/modules/Analytics/analytics.controller.ts
import httpStatus5 from "http-status";

// backend/src/app/modules/Analytics/analytics.model.ts
import { Schema as Schema3, model } from "mongoose";
var analyticsSchema = new Schema3(
  {
    visits: { type: Number, default: 0 },
    resumeDownloads: { type: Number, default: 0 }
    // We can just keep a single document for overall stats
  },
  { timestamps: true }
);
var Analytics = model("Analytics", analyticsSchema);
var analytics_model_default = Analytics;

// backend/src/app/modules/Analytics/analytics.controller.ts
var trackVisit = catchAsync_default(async (req, res) => {
  const stats = await analytics_model_default.findOneAndUpdate({}, { $inc: { visits: 1 } }, { new: true, upsert: true });
  sendResponse_default(res, { statusCode: httpStatus5.OK, success: true, message: "Visit tracked", data: stats });
});
var trackResumeDownload = catchAsync_default(async (req, res) => {
  const stats = await analytics_model_default.findOneAndUpdate({}, { $inc: { resumeDownloads: 1 } }, { new: true, upsert: true });
  sendResponse_default(res, { statusCode: httpStatus5.OK, success: true, message: "Resume download tracked", data: stats });
});
var getStats = catchAsync_default(async (req, res) => {
  let stats = await analytics_model_default.findOne();
  if (!stats) {
    stats = await analytics_model_default.create({ visits: 0, resumeDownloads: 0 });
  }
  sendResponse_default(res, { statusCode: httpStatus5.OK, success: true, message: "Analytics retrieved", data: stats });
});
var AnalyticsController = { trackVisit, trackResumeDownload, getStats };

// backend/src/app/modules/Analytics/analytics.route.ts
var router3 = express3.Router();
router3.post("/visit", AnalyticsController.trackVisit);
router3.post("/resume", AnalyticsController.trackResumeDownload);
router3.get("/", auth_default(), AnalyticsController.getStats);
var AnalyticsRoutes = router3;

// backend/src/app/modules/Blog/blog.route.ts
import express4 from "express";

// backend/src/app/middlewares/extractUser.ts
import jwt2 from "jsonwebtoken";
var extractUser = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const verifiedUser = jwt2.verify(token, config_default.jwt.secret);
      req.user = verifiedUser;
    }
    next();
  } catch (error) {
    next();
  }
};

// backend/src/app/modules/Blog/blog.controller.ts
import httpStatus6 from "http-status";

// backend/src/app/modules/Blog/blog.model.ts
import { Schema as Schema4, model as model2 } from "mongoose";
var blogSchema = new Schema4(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    // Markdown content
    summary: { type: String, required: true },
    coverImage: { type: String },
    tags: [{ type: String }],
    published: { type: Boolean, default: false },
    publishedAt: { type: Date }
  },
  { timestamps: true }
);
var Blog = model2("Blog", blogSchema);

// backend/src/app/modules/Blog/blog.controller.ts
var create = catchAsync_default(async (req, res) => {
  const result = await Blog.create(req.body);
  sendResponse_default(res, { statusCode: httpStatus6.CREATED, success: true, message: "Blog created", data: result });
});
var getAll = catchAsync_default(async (req, res) => {
  const query = req.user ? {} : { published: true };
  const result = await Blog.find(query).sort({ createdAt: -1 });
  sendResponse_default(res, { statusCode: httpStatus6.OK, success: true, message: "Blogs retrieved", data: result });
});
var getSingle = catchAsync_default(async (req, res) => {
  const result = await Blog.findOne({ slug: req.params.slug });
  if (!result) {
    return sendResponse_default(res, { statusCode: httpStatus6.NOT_FOUND, success: false, message: "Blog not found" });
  }
  sendResponse_default(res, { statusCode: httpStatus6.OK, success: true, message: "Blog retrieved", data: result });
});
var update = catchAsync_default(async (req, res) => {
  const result = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  sendResponse_default(res, { statusCode: httpStatus6.OK, success: true, message: "Blog updated", data: result });
});
var remove = catchAsync_default(async (req, res) => {
  const result = await Blog.findByIdAndDelete(req.params.id);
  sendResponse_default(res, { statusCode: httpStatus6.OK, success: true, message: "Blog deleted", data: result });
});
var BlogController = { create, getAll, getSingle, update, remove };

// backend/src/app/modules/Blog/blog.route.ts
var router4 = express4.Router();
router4.get("/", extractUser, BlogController.getAll);
router4.get("/:slug", BlogController.getSingle);
router4.post("/", auth_default(), BlogController.create);
router4.patch("/:id", auth_default(), BlogController.update);
router4.delete("/:id", auth_default(), BlogController.remove);
var BlogRoutes = router4;

// backend/src/app/modules/ChatLogs/chatlogs.route.ts
import express5 from "express";

// backend/src/app/modules/ChatLogs/chatlogs.controller.ts
import httpStatus7 from "http-status";

// backend/src/app/modules/ChatLogs/chatlogs.model.ts
import { Schema as Schema5, model as model3 } from "mongoose";
var messageSchema = new Schema5(
  {
    role: { type: String, enum: ["user", "assistant", "system"], required: true },
    content: { type: String, required: true }
  },
  { _id: false }
);
var chatLogSchema = new Schema5(
  {
    sessionId: { type: String, required: true },
    messages: [messageSchema],
    model: { type: String, required: true }
  },
  { timestamps: true }
);
var ChatLog = model3("ChatLog", chatLogSchema);

// backend/src/app/modules/ChatLogs/chatlogs.controller.ts
var chat = catchAsync_default(async (req, res) => {
  const { messages, sessionId, model: model4 } = req.body;
  const apiKey = process.env.OPENROUTER_API_KEY || req.headers["x-openrouter-key"];
  if (!apiKey) {
    return sendResponse_default(res, {
      statusCode: 400,
      success: false,
      message: "OpenRouter API Key not configured in backend"
    });
  }
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": req.headers.referer || "http://localhost:5173",
        "X-Title": "Sifat Portfolio Chatbot"
      },
      body: JSON.stringify({
        model: model4 || "meta-llama/llama-3.1-8b-instruct:free",
        temperature: 0.3,
        max_tokens: 350,
        messages
      })
    });
    if (!response.ok) {
      const errorText = await response.text();
      return sendResponse_default(res, { statusCode: response.status, success: false, message: errorText });
    }
    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content || "Sorry, I could not generate a response right now.";
    await ChatLog.findOneAndUpdate(
      { sessionId },
      {
        $set: { model: model4 },
        $push: {
          messages: {
            $each: [
              messages[messages.length - 1],
              // user message
              { role: "assistant", content: reply }
              // assistant reply
            ]
          }
        }
      },
      { upsert: true }
    );
    sendResponse_default(res, { statusCode: httpStatus7.OK, success: true, message: "Chat success", data: { reply } });
  } catch (error) {
    sendResponse_default(res, { statusCode: 500, success: false, message: error.message });
  }
});
var getLogs = catchAsync_default(async (req, res) => {
  const logs = await ChatLog.find().sort({ updatedAt: -1 }).limit(50);
  sendResponse_default(res, { statusCode: httpStatus7.OK, success: true, message: "Logs retrieved", data: logs });
});
var ChatLogsController = { chat, getLogs };

// backend/src/app/modules/ChatLogs/chatlogs.route.ts
var router5 = express5.Router();
router5.post("/chat", ChatLogsController.chat);
router5.get("/", auth_default(), ChatLogsController.getLogs);
var ChatLogsRoutes = router5;

// backend/src/app/modules/Contact/contact.route.ts
import express6 from "express";

// backend/src/app/modules/Contact/contact.controller.ts
import httpStatus9 from "http-status";

// backend/src/app/modules/Contact/contact.service.ts
import httpStatus8 from "http-status";

// backend/src/helpers/email.helper.ts
import nodemailer from "nodemailer";
var transporter = nodemailer.createTransport({
  host: config_default.smtp.host,
  port: config_default.smtp.port,
  secure: config_default.smtp.port === 465,
  auth: { user: config_default.smtp.user, pass: config_default.smtp.pass }
});
var sendContactNotification = async (data) => {
  const phoneRow = data.phone ? `<tr><td style="padding:8px;font-weight:bold;">Phone:</td><td style="padding:8px;">${data.phone}</td></tr>` : "";
  const msgHtml = data.message.replace(/\n/g, "<br>");
  await transporter.sendMail({
    from: `"Portfolio Contact" <${config_default.smtp.user}>`,
    to: config_default.smtp.adminEmail,
    subject: `New Contact: ${data.subject}`,
    html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
      <h2>New message from your portfolio</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px;font-weight:bold;">Name:</td><td>${data.name}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Email:</td><td>${data.email}</td></tr>
        ${phoneRow}
        <tr><td style="padding:8px;font-weight:bold;">Subject:</td><td>${data.subject}</td></tr>
      </table>
      <div style="margin-top:16px;padding:16px;background:#f5f5f5;border-radius:8px;">
        <strong>Message:</strong><p style="margin-top:8px;">${msgHtml}</p>
      </div></div>`
  });
  await transporter.sendMail({
    from: `"Tanvir Ahmmed Sifat" <${config_default.smtp.user}>`,
    to: data.email,
    subject: `Thanks for reaching out - I got your message`,
    html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
      <h2>Hi ${data.name},</h2>
      <p>Thanks for reaching out. I received your message and will get back to you shortly.</p>
      <p style="color:#666;">- Tanvir Ahmmed Sifat</p></div>`
  });
};

// backend/src/app/modules/Contact/contact.model.ts
import mongoose4, { Schema as Schema6 } from "mongoose";
var contactSchema = new Schema6({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  subject: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  isStarred: { type: Boolean, default: false },
  readAt: Date
}, { timestamps: true });
var Contact = mongoose4.model("Contact", contactSchema);
var contact_model_default = Contact;

// backend/src/app/modules/Contact/contact.service.ts
var submit = async (payload) => {
  const doc = await contact_model_default.create(payload);
  try {
    await sendContactNotification(payload);
  } catch (err) {
    console.error("Email send failed (message saved):", err);
  }
  return doc;
};
var getAll2 = async (filter = {}) => await contact_model_default.find(filter).sort({ createdAt: -1 });
var markRead = async (id) => {
  const doc = await contact_model_default.findByIdAndUpdate(id, { isRead: true, readAt: /* @__PURE__ */ new Date() }, { new: true });
  if (!doc) throw new ApiError_default(httpStatus8.NOT_FOUND, "Message not found");
  return doc;
};
var toggleStar = async (id) => {
  const doc = await contact_model_default.findById(id);
  if (!doc) throw new ApiError_default(httpStatus8.NOT_FOUND, "Message not found");
  doc.isStarred = !doc.isStarred;
  await doc.save();
  return doc;
};
var remove2 = async (id) => {
  const doc = await contact_model_default.findByIdAndDelete(id);
  if (!doc) throw new ApiError_default(httpStatus8.NOT_FOUND, "Message not found");
};
var ContactService = { submit, getAll: getAll2, markRead, toggleStar, remove: remove2 };

// backend/src/app/modules/Contact/contact.controller.ts
var submit2 = catchAsync_default(async (req, res) => {
  const result = await ContactService.submit(req.body);
  sendResponse_default(res, { statusCode: httpStatus9.CREATED, success: true, message: "Message sent successfully!", data: result });
});
var getAll3 = catchAsync_default(async (req, res) => {
  const filter = {};
  if (req.query.isRead !== void 0) filter.isRead = req.query.isRead === "true";
  if (req.query.isStarred !== void 0) filter.isStarred = req.query.isStarred === "true";
  const result = await ContactService.getAll(filter);
  sendResponse_default(res, { statusCode: httpStatus9.OK, success: true, message: "Messages retrieved", data: result });
});
var markRead2 = catchAsync_default(async (req, res) => {
  const result = await ContactService.markRead(req.params.id);
  sendResponse_default(res, { statusCode: httpStatus9.OK, success: true, message: "Marked as read", data: result });
});
var toggleStar2 = catchAsync_default(async (req, res) => {
  const result = await ContactService.toggleStar(req.params.id);
  sendResponse_default(res, { statusCode: httpStatus9.OK, success: true, message: "Star toggled", data: result });
});
var remove3 = catchAsync_default(async (req, res) => {
  await ContactService.remove(req.params.id);
  sendResponse_default(res, { statusCode: httpStatus9.OK, success: true, message: "Message deleted", data: null });
});
var ContactController = { submit: submit2, getAll: getAll3, markRead: markRead2, toggleStar: toggleStar2, remove: remove3 };

// backend/src/app/modules/Contact/contact.route.ts
var router6 = express6.Router();
router6.post("/", ContactController.submit);
router6.get("/", auth_default(), ContactController.getAll);
router6.patch("/:id/read", auth_default(), ContactController.markRead);
router6.patch("/:id/star", auth_default(), ContactController.toggleStar);
router6.delete("/:id", auth_default(), ContactController.remove);
var ContactRoutes = router6;

// backend/src/app/modules/Education/education.route.ts
import express7 from "express";

// backend/src/app/modules/Education/education.controller.ts
import httpStatus11 from "http-status";

// backend/src/app/modules/Education/education.service.ts
import httpStatus10 from "http-status";

// backend/src/app/modules/Education/education.model.ts
import mongoose5, { Schema as Schema7 } from "mongoose";
var educationSchema = new Schema7({
  degree: { type: String, required: true },
  institute: { type: String, required: true },
  period: String,
  status: { type: String, enum: ["Completed", "In progress", "Dropped"], default: "Completed" },
  notes: [String],
  order: { type: Number, default: 0 }
}, { timestamps: true });
var Education = mongoose5.model("Education", educationSchema);
var education_model_default = Education;

// backend/src/app/modules/Education/education.service.ts
var getAll4 = async () => await education_model_default.find().sort({ order: 1, createdAt: -1 });
var create2 = async (payload) => await education_model_default.create(payload);
var update2 = async (id, payload) => {
  const result = await education_model_default.findByIdAndUpdate(id, payload, { new: true });
  if (!result) throw new ApiError_default(httpStatus10.NOT_FOUND, "Education not found");
  return result;
};
var remove4 = async (id) => {
  const result = await education_model_default.findByIdAndDelete(id);
  if (!result) throw new ApiError_default(httpStatus10.NOT_FOUND, "Education not found");
  return result;
};
var EducationService = { getAll: getAll4, create: create2, update: update2, remove: remove4 };

// backend/src/app/modules/Education/education.controller.ts
var getAll5 = catchAsync_default(async (_req, res) => {
  const result = await EducationService.getAll();
  sendResponse_default(res, { statusCode: httpStatus11.OK, success: true, message: "Education retrieved", data: result });
});
var create3 = catchAsync_default(async (req, res) => {
  const result = await EducationService.create(req.body);
  sendResponse_default(res, { statusCode: httpStatus11.CREATED, success: true, message: "Education created", data: result });
});
var update3 = catchAsync_default(async (req, res) => {
  const result = await EducationService.update(req.params.id, req.body);
  sendResponse_default(res, { statusCode: httpStatus11.OK, success: true, message: "Education updated", data: result });
});
var remove5 = catchAsync_default(async (req, res) => {
  await EducationService.remove(req.params.id);
  sendResponse_default(res, { statusCode: httpStatus11.OK, success: true, message: "Education deleted", data: null });
});
var EducationController = { getAll: getAll5, create: create3, update: update3, remove: remove5 };

// backend/src/app/modules/Education/education.route.ts
var router7 = express7.Router();
router7.get("/", EducationController.getAll);
router7.post("/", auth_default(), EducationController.create);
router7.patch("/:id", auth_default(), EducationController.update);
router7.delete("/:id", auth_default(), EducationController.remove);
var EducationRoutes = router7;

// backend/src/app/modules/Experience/experience.route.ts
import express8 from "express";

// backend/src/app/modules/Experience/experience.controller.ts
import httpStatus13 from "http-status";

// backend/src/app/modules/Experience/experience.service.ts
import httpStatus12 from "http-status";

// backend/src/app/modules/Experience/experience.model.ts
import mongoose6, { Schema as Schema8 } from "mongoose";
var experienceSchema = new Schema8({
  role: { type: String, required: true },
  company: { type: String, required: true },
  shortName: String,
  location: String,
  period: { type: String, required: true },
  type: { type: String, enum: ["Full-time", "Part-time", "Contract", "Internship", "Freelance"], default: "Full-time" },
  summary: String,
  highlights: [String],
  tech: [String],
  order: { type: Number, default: 0 }
}, { timestamps: true });
var Experience = mongoose6.model("Experience", experienceSchema);
var experience_model_default = Experience;

// backend/src/app/modules/Experience/experience.service.ts
var getAll6 = async () => await experience_model_default.find().sort({ order: 1, createdAt: -1 });
var create4 = async (payload) => await experience_model_default.create(payload);
var update4 = async (id, payload) => {
  const result = await experience_model_default.findByIdAndUpdate(id, payload, { new: true });
  if (!result) throw new ApiError_default(httpStatus12.NOT_FOUND, "Experience not found");
  return result;
};
var remove6 = async (id) => {
  const result = await experience_model_default.findByIdAndDelete(id);
  if (!result) throw new ApiError_default(httpStatus12.NOT_FOUND, "Experience not found");
  return result;
};
var ExperienceService = { getAll: getAll6, create: create4, update: update4, remove: remove6 };

// backend/src/app/modules/Experience/experience.controller.ts
var getAll7 = catchAsync_default(async (_req, res) => {
  const result = await ExperienceService.getAll();
  sendResponse_default(res, { statusCode: httpStatus13.OK, success: true, message: "Experiences retrieved", data: result });
});
var create5 = catchAsync_default(async (req, res) => {
  const result = await ExperienceService.create(req.body);
  sendResponse_default(res, { statusCode: httpStatus13.CREATED, success: true, message: "Experience created", data: result });
});
var update5 = catchAsync_default(async (req, res) => {
  const result = await ExperienceService.update(req.params.id, req.body);
  sendResponse_default(res, { statusCode: httpStatus13.OK, success: true, message: "Experience updated", data: result });
});
var remove7 = catchAsync_default(async (req, res) => {
  await ExperienceService.remove(req.params.id);
  sendResponse_default(res, { statusCode: httpStatus13.OK, success: true, message: "Experience deleted", data: null });
});
var ExperienceController = { getAll: getAll7, create: create5, update: update5, remove: remove7 };

// backend/src/app/modules/Experience/experience.route.ts
var router8 = express8.Router();
router8.get("/", ExperienceController.getAll);
router8.post("/", auth_default(), ExperienceController.create);
router8.patch("/:id", auth_default(), ExperienceController.update);
router8.delete("/:id", auth_default(), ExperienceController.remove);
var ExperienceRoutes = router8;

// backend/src/app/modules/Personal/personal.route.ts
import express9 from "express";

// backend/src/app/modules/Personal/personal.controller.ts
import httpStatus14 from "http-status";

// backend/src/app/modules/Personal/personal.model.ts
import mongoose7, { Schema as Schema9 } from "mongoose";
var personalSchema = new Schema9({
  name: String,
  shortName: String,
  role: String,
  headline: String,
  intro: String,
  location: String,
  email: String,
  phone: String,
  whatsapp: String,
  resumeUrl: String,
  resumeDocx: String,
  resumeUpdated: String,
  portrait: String,
  portraitWebp: String,
  portraitSquare: String,
  portraitSquareWebp: String,
  availability: String
}, { timestamps: true });
var Personal = mongoose7.model("Personal", personalSchema);
var personal_model_default = Personal;

// backend/src/app/modules/Personal/personal.service.ts
var getPersonal = async () => await personal_model_default.findOne();
var upsertPersonal = async (payload) => await personal_model_default.findOneAndUpdate({}, payload, { upsert: true, new: true, runValidators: true });
var PersonalService = { getPersonal, upsertPersonal };

// backend/src/app/modules/Personal/personal.controller.ts
var getPersonal2 = catchAsync_default(async (_req, res) => {
  const result = await PersonalService.getPersonal();
  sendResponse_default(res, { statusCode: httpStatus14.OK, success: true, message: "Personal data retrieved", data: result });
});
var upsertPersonal2 = catchAsync_default(async (req, res) => {
  const result = await PersonalService.upsertPersonal(req.body);
  sendResponse_default(res, { statusCode: httpStatus14.OK, success: true, message: "Personal data updated", data: result });
});
var PersonalController = { getPersonal: getPersonal2, upsertPersonal: upsertPersonal2 };

// backend/src/app/modules/Personal/personal.route.ts
var router9 = express9.Router();
router9.get("/", PersonalController.getPersonal);
router9.put("/", auth_default(), PersonalController.upsertPersonal);
var PersonalRoutes = router9;

// backend/src/app/modules/Projects/projects.route.ts
import express10 from "express";

// backend/src/app/modules/Projects/projects.controller.ts
import httpStatus16 from "http-status";

// backend/src/app/modules/Projects/projects.service.ts
import httpStatus15 from "http-status";

// backend/src/app/modules/Projects/projects.model.ts
import mongoose8, { Schema as Schema10 } from "mongoose";
var linksSchema = new Schema10({ live: String, github: String, githubServer: String }, { _id: false });
var projectSchema = new Schema10({
  type: { type: String, enum: ["personal", "client"], required: true },
  title: { type: String, required: true },
  category: String,
  role: String,
  team: String,
  year: String,
  featured: { type: Boolean, default: false },
  tagline: String,
  overview: String,
  contributions: [String],
  problem: String,
  solution: String,
  features: [String],
  challenges: String,
  tech: [String],
  image: String,
  links: linksSchema,
  order: { type: Number, default: 0 }
}, { timestamps: true });
var Project = mongoose8.model("Project", projectSchema);
var projects_model_default = Project;

// backend/src/app/modules/Projects/projects.service.ts
var getAll8 = async (type) => {
  const filter = type ? { type } : {};
  return await projects_model_default.find(filter).sort({ order: 1, createdAt: -1 });
};
var create6 = async (payload) => await projects_model_default.create(payload);
var update6 = async (id, payload) => {
  const result = await projects_model_default.findByIdAndUpdate(id, payload, { new: true });
  if (!result) throw new ApiError_default(httpStatus15.NOT_FOUND, "Project not found");
  return result;
};
var remove8 = async (id) => {
  const result = await projects_model_default.findByIdAndDelete(id);
  if (!result) throw new ApiError_default(httpStatus15.NOT_FOUND, "Project not found");
};
var ProjectsService = { getAll: getAll8, create: create6, update: update6, remove: remove8 };

// backend/src/app/modules/Projects/projects.controller.ts
var getAll9 = catchAsync_default(async (req, res) => {
  const result = await ProjectsService.getAll(req.query.type);
  sendResponse_default(res, { statusCode: httpStatus16.OK, success: true, message: "Projects retrieved", data: result });
});
var create7 = catchAsync_default(async (req, res) => {
  const result = await ProjectsService.create(req.body);
  sendResponse_default(res, { statusCode: httpStatus16.CREATED, success: true, message: "Project created", data: result });
});
var update7 = catchAsync_default(async (req, res) => {
  const result = await ProjectsService.update(req.params.id, req.body);
  sendResponse_default(res, { statusCode: httpStatus16.OK, success: true, message: "Project updated", data: result });
});
var remove9 = catchAsync_default(async (req, res) => {
  await ProjectsService.remove(req.params.id);
  sendResponse_default(res, { statusCode: httpStatus16.OK, success: true, message: "Project deleted", data: null });
});
var ProjectsController = { getAll: getAll9, create: create7, update: update7, remove: remove9 };

// backend/src/app/modules/Projects/projects.route.ts
var router10 = express10.Router();
router10.get("/", ProjectsController.getAll);
router10.post("/", auth_default(), ProjectsController.create);
router10.patch("/:id", auth_default(), ProjectsController.update);
router10.delete("/:id", auth_default(), ProjectsController.remove);
var ProjectsRoutes = router10;

// backend/src/app/modules/Research/research.route.ts
import express11 from "express";

// backend/src/app/modules/Research/research.controller.ts
import httpStatus18 from "http-status";

// backend/src/app/modules/Research/research.model.ts
import mongoose9, { Schema as Schema11 } from "mongoose";
var publicationSchema = new Schema11({
  title: { type: String, required: true },
  role: String,
  conference: String,
  venue: String,
  year: String,
  summary: String,
  context: String,
  abstract: String,
  tags: [String],
  order: { type: Number, default: 0 }
}, { _id: true, timestamps: true });
var timelineSchema = new Schema11({
  year: String,
  title: String,
  description: String,
  order: { type: Number, default: 0 }
}, { _id: true });
var researchSchema = new Schema11({
  interests: [String],
  thesis: { title: String, description: String },
  futureDirection: String,
  publications: [publicationSchema],
  timeline: [timelineSchema]
}, { timestamps: true });
var Research = mongoose9.model("Research", researchSchema);
var research_model_default = Research;

// backend/src/app/modules/Research/research.service.ts
import httpStatus17 from "http-status";
var getResearch = async () => {
  let doc = await research_model_default.findOne();
  if (!doc) doc = await research_model_default.create({ interests: [], publications: [], timeline: [] });
  return doc;
};
var updateMain = async (payload) => await research_model_default.findOneAndUpdate({}, { $set: payload }, { upsert: true, new: true });
var addPublication = async (payload) => await research_model_default.findOneAndUpdate({}, { $push: { publications: payload } }, { upsert: true, new: true });
var updatePublication = async (pubId, payload) => {
  const doc = await research_model_default.findOneAndUpdate(
    { "publications._id": pubId },
    { $set: Object.fromEntries(Object.entries(payload).map(([k, v]) => [`publications.$.${k}`, v])) },
    { new: true }
  );
  if (!doc) throw new ApiError_default(httpStatus17.NOT_FOUND, "Publication not found");
  return doc;
};
var removePublication = async (pubId) => await research_model_default.findOneAndUpdate({}, { $pull: { publications: { _id: pubId } } }, { new: true });
var addTimeline = async (payload) => await research_model_default.findOneAndUpdate({}, { $push: { timeline: payload } }, { upsert: true, new: true });
var updateTimeline = async (itemId, payload) => {
  const doc = await research_model_default.findOneAndUpdate(
    { "timeline._id": itemId },
    { $set: Object.fromEntries(Object.entries(payload).map(([k, v]) => [`timeline.$.${k}`, v])) },
    { new: true }
  );
  if (!doc) throw new ApiError_default(httpStatus17.NOT_FOUND, "Timeline item not found");
  return doc;
};
var removeTimeline = async (itemId) => await research_model_default.findOneAndUpdate({}, { $pull: { timeline: { _id: itemId } } }, { new: true });
var ResearchService = {
  getResearch,
  updateMain,
  addPublication,
  updatePublication,
  removePublication,
  addTimeline,
  updateTimeline,
  removeTimeline
};

// backend/src/app/modules/Research/research.controller.ts
var getResearch2 = catchAsync_default(async (_req, res) => {
  const result = await ResearchService.getResearch();
  sendResponse_default(res, { statusCode: httpStatus18.OK, success: true, message: "Research retrieved", data: result });
});
var updateMain2 = catchAsync_default(async (req, res) => {
  const result = await ResearchService.updateMain(req.body);
  sendResponse_default(res, { statusCode: httpStatus18.OK, success: true, message: "Research updated", data: result });
});
var addPublication2 = catchAsync_default(async (req, res) => {
  const result = await ResearchService.addPublication(req.body);
  sendResponse_default(res, { statusCode: httpStatus18.OK, success: true, message: "Publication added", data: result });
});
var updatePublication2 = catchAsync_default(async (req, res) => {
  const result = await ResearchService.updatePublication(req.params.id, req.body);
  sendResponse_default(res, { statusCode: httpStatus18.OK, success: true, message: "Publication updated", data: result });
});
var removePublication2 = catchAsync_default(async (req, res) => {
  const result = await ResearchService.removePublication(req.params.id);
  sendResponse_default(res, { statusCode: httpStatus18.OK, success: true, message: "Publication deleted", data: result });
});
var addTimeline2 = catchAsync_default(async (req, res) => {
  const result = await ResearchService.addTimeline(req.body);
  sendResponse_default(res, { statusCode: httpStatus18.OK, success: true, message: "Timeline item added", data: result });
});
var updateTimeline2 = catchAsync_default(async (req, res) => {
  const result = await ResearchService.updateTimeline(req.params.id, req.body);
  sendResponse_default(res, { statusCode: httpStatus18.OK, success: true, message: "Timeline updated", data: result });
});
var removeTimeline2 = catchAsync_default(async (req, res) => {
  const result = await ResearchService.removeTimeline(req.params.id);
  sendResponse_default(res, { statusCode: httpStatus18.OK, success: true, message: "Timeline item deleted", data: result });
});
var ResearchController = {
  getResearch: getResearch2,
  updateMain: updateMain2,
  addPublication: addPublication2,
  updatePublication: updatePublication2,
  removePublication: removePublication2,
  addTimeline: addTimeline2,
  updateTimeline: updateTimeline2,
  removeTimeline: removeTimeline2
};

// backend/src/app/modules/Research/research.route.ts
var router11 = express11.Router();
router11.get("/", ResearchController.getResearch);
router11.put("/", auth_default(), ResearchController.updateMain);
router11.post("/publications", auth_default(), ResearchController.addPublication);
router11.patch("/publications/:id", auth_default(), ResearchController.updatePublication);
router11.delete("/publications/:id", auth_default(), ResearchController.removePublication);
router11.post("/timeline", auth_default(), ResearchController.addTimeline);
router11.patch("/timeline/:id", auth_default(), ResearchController.updateTimeline);
router11.delete("/timeline/:id", auth_default(), ResearchController.removeTimeline);
var ResearchRoutes = router11;

// backend/src/app/modules/Skills/skills.route.ts
import express12 from "express";

// backend/src/app/modules/Skills/skills.controller.ts
import httpStatus20 from "http-status";

// backend/src/app/modules/Skills/skills.service.ts
import httpStatus19 from "http-status";

// backend/src/app/modules/Skills/skills.model.ts
import mongoose10, { Schema as Schema12 } from "mongoose";
var skillsSchema = new Schema12({
  group: { type: String, required: true },
  items: [String],
  order: { type: Number, default: 0 }
}, { timestamps: true });
var Skills = mongoose10.model("Skills", skillsSchema);
var skills_model_default = Skills;

// backend/src/app/modules/Skills/skills.service.ts
var getAll10 = async () => await skills_model_default.find().sort({ order: 1, createdAt: 1 });
var create8 = async (payload) => await skills_model_default.create(payload);
var update8 = async (id, payload) => {
  const result = await skills_model_default.findByIdAndUpdate(id, payload, { new: true });
  if (!result) throw new ApiError_default(httpStatus19.NOT_FOUND, "Skill group not found");
  return result;
};
var remove10 = async (id) => {
  const result = await skills_model_default.findByIdAndDelete(id);
  if (!result) throw new ApiError_default(httpStatus19.NOT_FOUND, "Skill group not found");
};
var SkillsService = { getAll: getAll10, create: create8, update: update8, remove: remove10 };

// backend/src/app/modules/Skills/skills.controller.ts
var getAll11 = catchAsync_default(async (_req, res) => {
  const result = await SkillsService.getAll();
  sendResponse_default(res, { statusCode: httpStatus20.OK, success: true, message: "Skills retrieved", data: result });
});
var create9 = catchAsync_default(async (req, res) => {
  const result = await SkillsService.create(req.body);
  sendResponse_default(res, { statusCode: httpStatus20.CREATED, success: true, message: "Skill group created", data: result });
});
var update9 = catchAsync_default(async (req, res) => {
  const result = await SkillsService.update(req.params.id, req.body);
  sendResponse_default(res, { statusCode: httpStatus20.OK, success: true, message: "Skill group updated", data: result });
});
var remove11 = catchAsync_default(async (req, res) => {
  await SkillsService.remove(req.params.id);
  sendResponse_default(res, { statusCode: httpStatus20.OK, success: true, message: "Skill group deleted", data: null });
});
var SkillsController = { getAll: getAll11, create: create9, update: update9, remove: remove11 };

// backend/src/app/modules/Skills/skills.route.ts
var router12 = express12.Router();
router12.get("/", SkillsController.getAll);
router12.post("/", auth_default(), SkillsController.create);
router12.patch("/:id", auth_default(), SkillsController.update);
router12.delete("/:id", auth_default(), SkillsController.remove);
var SkillsRoutes = router12;

// backend/src/app/modules/Socials/socials.route.ts
import express13 from "express";

// backend/src/app/modules/Socials/socials.controller.ts
import httpStatus21 from "http-status";

// backend/src/app/modules/Socials/socials.model.ts
import mongoose11, { Schema as Schema13 } from "mongoose";
var socialsSchema = new Schema13({
  github: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  twitter: { type: String, default: "" },
  facebook: { type: String, default: "" },
  instagram: { type: String, default: "" }
}, { timestamps: true });
var Socials = mongoose11.model("Socials", socialsSchema);
var socials_model_default = Socials;

// backend/src/app/modules/Socials/socials.service.ts
var getSocials = async () => await socials_model_default.findOne();
var upsertSocials = async (payload) => await socials_model_default.findOneAndUpdate({}, payload, { upsert: true, new: true });
var SocialsService = { getSocials, upsertSocials };

// backend/src/app/modules/Socials/socials.controller.ts
var getSocials2 = catchAsync_default(async (_req, res) => {
  const result = await SocialsService.getSocials();
  sendResponse_default(res, { statusCode: httpStatus21.OK, success: true, message: "Socials retrieved", data: result });
});
var upsertSocials2 = catchAsync_default(async (req, res) => {
  const result = await SocialsService.upsertSocials(req.body);
  sendResponse_default(res, { statusCode: httpStatus21.OK, success: true, message: "Socials updated", data: result });
});
var SocialsController = { getSocials: getSocials2, upsertSocials: upsertSocials2 };

// backend/src/app/modules/Socials/socials.route.ts
var router13 = express13.Router();
router13.get("/", SocialsController.getSocials);
router13.put("/", auth_default(), SocialsController.upsertSocials);
var SocialsRoutes = router13;

// backend/src/app/modules/Upload/upload.route.ts
import express14 from "express";
import multer from "multer";

// backend/src/app/modules/Upload/upload.controller.ts
import httpStatus22 from "http-status";

// backend/src/helpers/cloudinary.helper.ts
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: config_default.cloudinary.cloud_name,
  api_key: config_default.cloudinary.api_key,
  api_secret: config_default.cloudinary.api_secret
});
var uploadToCloudinary = (buffer, folder) => new Promise((resolve, reject) => {
  const stream = cloudinary.uploader.upload_stream(
    { folder: `portfolio/${folder}`, resource_type: "image" },
    (error, result) => {
      if (error) reject(error);
      else resolve(result.secure_url);
    }
  );
  stream.end(buffer);
});

// backend/src/app/modules/Upload/upload.controller.ts
var uploadImage = catchAsync_default(async (req, res) => {
  if (!req.file) throw new ApiError_default(httpStatus22.BAD_REQUEST, "No file uploaded");
  const folder = req.query.folder || "general";
  const url = await uploadToCloudinary(req.file.buffer, folder);
  sendResponse_default(res, { statusCode: httpStatus22.OK, success: true, message: "Image uploaded", data: { url } });
});
var UploadController = { uploadImage };

// backend/src/app/modules/Upload/upload.route.ts
var storage = multer.memoryStorage();
var upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  // 5MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files allowed"));
  }
});
var router14 = express14.Router();
router14.post("/", auth_default(), upload.single("image"), UploadController.uploadImage);
var UploadRoutes = router14;

// backend/src/app/routes/index.ts
var router15 = express15.Router();
var moduleRoutes = [
  { path: "/admin", route: AdminRoutes },
  { path: "/personal", route: PersonalRoutes },
  { path: "/socials", route: SocialsRoutes },
  { path: "/about", route: AboutRoutes },
  { path: "/experiences", route: ExperienceRoutes },
  { path: "/education", route: EducationRoutes },
  { path: "/skills", route: SkillsRoutes },
  { path: "/projects", route: ProjectsRoutes },
  { path: "/research", route: ResearchRoutes },
  { path: "/contact", route: ContactRoutes },
  { path: "/upload", route: UploadRoutes },
  { path: "/analytics", route: AnalyticsRoutes },
  { path: "/chatlogs", route: ChatLogsRoutes },
  { path: "/blog", route: BlogRoutes }
];
moduleRoutes.forEach((route) => router15.use(route.path, route.route));
var routes_default = router15;

// backend/src/app.ts
var app = express16();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000", config_default.frontendUrl].filter(Boolean),
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
  })
);
app.use(express16.json({ limit: "10mb" }));
app.use(express16.urlencoded({ extended: true }));
app.get("/health", (_req, res) => {
  res.status(httpStatus23.OK).json({ success: true, message: "Server is healthy" });
});
app.get("/", (_req, res) => {
  res.status(httpStatus23.OK).json({ success: true, message: "Portfolio API" });
});
app.use("/api/v1", routes_default);
app.use(globalErrorHandler_default);
app.use((req, res) => {
  res.status(httpStatus23.NOT_FOUND).json({
    success: false,
    message: "Route not found",
    errorMessages: [{ path: req.originalUrl, message: "The requested route does not exist." }]
  });
});
var app_default = app;

// backend/src/serverless.ts
var isConnected = false;
async function connectToDatabase() {
  if (isConnected && mongoose12.connection.readyState === 1) {
    return;
  }
  const uri = process.env.MONGODB_URI || config_default.mongodb_uri;
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is missing.");
  }
  await mongoose12.connect(uri, {
    bufferCommands: false
  });
  isConnected = true;
}
async function handler(req, res) {
  try {
    await connectToDatabase();
    return app_default(req, res);
  } catch (error) {
    console.error("Serverless API Error:", error);
    return res.status(500).json({
      success: false,
      message: "Database Connection Error on Serverless API",
      error: error?.message || String(error)
    });
  }
}
export {
  handler as default
};
