import Header from "@/components/layout/Header";
import DictionaryManager from "@/components/admin/DictionaryManager";
import { useState } from "react";
import { BookOpen, Settings } from "lucide-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"dictionary" | "settings">(
    "dictionary",
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Admin Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-600">
            Manage dictionary entries and system settings
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("dictionary")}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition ${
              activeTab === "dictionary"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <BookOpen size={20} />
            Dictionary Manager
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition ${
              activeTab === "settings"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Settings size={20} />
            Settings
          </button>
        </div>

        {/* Content */}
        {activeTab === "dictionary" && <DictionaryManager />}

        {activeTab === "settings" && (
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800">
                  Settings management will be available soon.
                </p>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  System Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">API Base URL</p>
                    <p className="font-medium text-gray-900">/api/admin</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Version</p>
                    <p className="font-medium text-gray-900">1.0.0</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Database Type</p>
                    <p className="font-medium text-gray-900">In-Memory</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Last Updated</p>
                    <p className="font-medium text-gray-900">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
