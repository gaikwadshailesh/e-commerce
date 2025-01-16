import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrders } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await getOrders();
      setOrders(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Order History</h2>
      
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order._id} className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-600">Order #{order._id}</p>
                <p className="text-sm text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold">${order.totalAmount.toFixed(2)}</p>
                <p className={`text-sm ${
                  order.status === 'delivered' ? 'text-green-600' :
                  order.status === 'cancelled' ? 'text-red-600' :
                  'text-blue-600'
                }`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Items</h3>
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <div className="flex items-center">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="ml-4">
                      <Link
                        to={`/products/${item.product._id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            {order.trackingNumber && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm">
                  Tracking Number: <span className="font-medium">{order.trackingNumber}</span>
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory; 