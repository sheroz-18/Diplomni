import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleTranslate } from "./routes/translate";
import { handleDictionary } from "./routes/dictionary";
import {
  handleGetDictionaryByLanguage,
  handleGetDictionaryEntry,
  handleCreateDictionaryEntry,
  handleUpdateDictionaryEntry,
  handleDeleteDictionaryEntry,
  handleBatchCreateDictionaryEntries,
  handleSearchDictionary,
  handleGetSupportedLanguages,
} from "./routes/dictionary-admin";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Translator API routes
  app.post("/api/translate", handleTranslate);
  app.post("/api/dictionary", handleDictionary);

  // Dictionary Admin API routes (CRUD)
  app.get("/api/admin/languages", handleGetSupportedLanguages);
  app.get("/api/admin/dictionary/:language", handleGetDictionaryByLanguage);
  app.get("/api/admin/dictionary/:language/:word", handleGetDictionaryEntry);
  app.post("/api/admin/dictionary", handleCreateDictionaryEntry);
  app.put("/api/admin/dictionary/:language/:word", handleUpdateDictionaryEntry);
  app.delete(
    "/api/admin/dictionary/:language/:word",
    handleDeleteDictionaryEntry,
  );
  app.post("/api/admin/dictionary/batch", handleBatchCreateDictionaryEntries);
  app.get("/api/admin/dictionary-search", handleSearchDictionary);

  return app;
}
