"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = exports.Button = void 0;
const Button = ({ children, ...props }) => (<button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" {...props}>
    {children}
  </button>);
exports.Button = Button;
const Card = ({ children, ...props }) => (<div className="bg-white rounded-lg shadow p-6" {...props}>
    {children}
  </div>);
exports.Card = Card;
