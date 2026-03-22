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
exports.default = Alerts;
const react_1 = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
function Alerts() {
    const [alerts, setAlerts] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        const fetchData = async () => {
            try {
                const res = await axios_1.default.get(`${API_URL}/alerts`);
                setAlerts(res.data);
            }
            catch (error) {
                console.error('Error fetching alerts:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'critical':
                return 'bg-red-100 text-red-800';
            case 'warning':
                return 'bg-yellow-100 text-yellow-800';
            case 'info':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };
    const getTypeIcon = (type) => {
        switch (type) {
            case 'low_stock':
                return '📦';
            case 'out_of_stock':
                return '🚨';
            case 'high_stock':
                return '📈';
            case 'dead_stock':
                return '💀';
            default:
                return '📌';
        }
    };
    return (<div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-blue-600">ShelfOS - Alerts</h1>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          {loading ? (<div className="text-center p-6">Loading...</div>) : alerts.length === 0 ? (<div className="bg-white rounded-lg p-6 text-center text-gray-600">
              No alerts found.
            </div>) : (alerts.map((alert) => (<div key={alert.id} className={`rounded-lg p-4 border-l-4 ${getSeverityColor(alert.severity)}`}>
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{getTypeIcon(alert.type)}</span>
                    <div>
                      <h3 className="font-semibold text-lg capitalize">{alert.type.replace('_', ' ')}</h3>
                      <p className="text-sm mt-1">{alert.message}</p>
                      <p className="text-xs mt-2 opacity-75">
                        {new Date(alert.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize`}>
                    {alert.status}
                  </span>
                </div>
              </div>)))}
        </div>
      </main>
    </div>);
}
