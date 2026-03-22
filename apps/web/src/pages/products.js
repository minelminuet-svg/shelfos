"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Products;
const react_1 = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
function Products() {
    const [products, setProducts] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        const fetchData = async () => {
            try {
                const res = await axios_1.default.get(`${API_URL}/products`);
                setProducts(res.data);
            }
            catch (error) {
                console.error('Error fetching products:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return (<div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-blue-600">ShelfOS - Products</h1>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Product Catalog</h2>
          </div>

          {loading ? (<div className="p-6 text-center">Loading...</div>) : (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {products.map((product) => (<div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition">
                  <h3 className="font-semibold text-lg text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">SKU: {product.sku}</p>
                  {product.barcode && <p className="text-sm text-gray-600">Barcode: {product.barcode}</p>}
                  <p className="text-sm text-gray-600 mt-2">Category: {product.category || 'N/A'}</p>
                  <p className="text-lg font-bold text-green-600 mt-4">${parseFloat(product.price).toFixed(2)}</p>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      Reorder Point: <span className="font-semibold">{product.reorderPoint}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Reorder Qty: <span className="font-semibold">{product.reorderQty}</span>
                    </p>
                  </div>
                </div>))}
            </div>)}
        </div>
      </main>
    </div>);
}
