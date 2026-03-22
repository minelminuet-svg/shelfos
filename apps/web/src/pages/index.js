"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
const react_1 = __importDefault(require("react"));
const link_1 = __importDefault(require("next/link"));
function Home() {
    return (<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-600">ShelfOS</div>
            </div>
            <div className="flex items-center space-x-4">
              <link_1.default href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
                Dashboard
              </link_1.default>
              <link_1.default href="/inventory" className="text-gray-700 hover:text-blue-600 font-medium">
                Inventory
              </link_1.default>
              <link_1.default href="/products" className="text-gray-700 hover:text-blue-600 font-medium">
                Products
              </link_1.default>
              <link_1.default href="/purchase-orders" className="text-gray-700 hover:text-blue-600 font-medium">
                POs
              </link_1.default>
              <link_1.default href="/alerts" className="text-gray-700 hover:text-blue-600 font-medium">
                Alerts
              </link_1.default>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to ShelfOS
          </h1>
          <p className="text-2xl text-gray-600 mb-8">
            Retail Operations Automation Platform
          </p>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            A clean inventory ledger, automation around low stock and replenishment,
            supplier workflows, and visibility into inventory risk.
          </p>
          <link_1.default href="/dashboard" className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
            Go to Dashboard
          </link_1.default>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          <Feature icon="📊" title="Dashboard" description="Real-time visibility into inventory status, low stock alerts, and open purchase orders" link="/dashboard"/>
          <Feature icon="📦" title="Inventory Management" description="Track stock across stores, backrooms, and warehouses with complete movement history" link="/inventory"/>
          <Feature icon="📝" title="Product Catalog" description="Manage your product database with SKUs, categories, pricing, and reorder points" link="/products"/>
          <Feature icon="🏪" title="Suppliers" description="Manage supplier relationships and track supplier-product connections" link="/purchase-orders"/>
          <Feature icon="📋" title="Purchase Orders" description="Create, send, and receive purchase orders with complete order tracking" link="/purchase-orders"/>
          <Feature icon="🔔" title="Alerts & Automation" description="Automatic low-stock alerts and event-driven automation rules" link="/alerts"/>
        </div>

        {/* Demo Info */}
        <div className="mt-20 bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Demo Data</h2>
          <p className="text-gray-700 mb-4">
            The database has been pre-seeded with demo data to show the complete retail automation workflow:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li><strong>✓ Demo Organization:</strong> Demo Retail Store</li>
            <li><strong>✓ Products:</strong> Blue Widget & Red Gadget (Red Gadget is low stock)</li>
            <li><strong>✓ Low-Stock Alert:</strong> Red Gadget alert showing in Alerts page</li>
            <li><strong>✓ Purchase Order:</strong> Auto-generated PO draft for the preferred supplier</li>
            <li><strong>✓ Inventory:</strong> Stock balances across backroom and sales floor</li>
          </ul>
        </div>
      </main>
    </div>);
}
function Feature({ icon, title, description, link, }) {
    return (<link_1.default href={link}>
      <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition cursor-pointer">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </link_1.default>);
}
