import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../store/cartSlice';

const CheckoutForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    shipping: {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      zipCode: '',
      country: '',
    },
    payment: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      nameOnCard: '',
    },
  });
  const [errors, setErrors] = useState({});

  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateShippingForm = () => {
    const newErrors = {};
    const { shipping } = formData;

    if (!shipping.firstName) newErrors.firstName = 'First name is required';
    if (!shipping.lastName) newErrors.lastName = 'Last name is required';
    if (!shipping.address) newErrors.address = 'Address is required';
    if (!shipping.city) newErrors.city = 'City is required';
    if (!shipping.zipCode) newErrors.zipCode = 'ZIP code is required';
    if (!shipping.country) newErrors.country = 'Country is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePaymentForm = () => {
    const newErrors = {};
    const { payment } = formData;

    if (!payment.cardNumber) newErrors.cardNumber = 'Card number is required';
    if (!payment.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    if (!payment.cvv) newErrors.cvv = 'CVV is required';
    if (!payment.nameOnCard) newErrors.nameOnCard = 'Name on card is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 1 && validateShippingForm()) {
      setStep(2);
    } else if (step === 2 && validatePaymentForm()) {
      try {
        // Process payment and create order
        // await createOrder({ ...formData, items: cart.items });
        dispatch(clearCart());
        navigate('/order-confirmation');
      } catch (error) {
        setErrors({ submit: 'Failed to process order. Please try again.' });
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>Shipping</div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>Payment</div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="shipping-form">
            {/* Shipping form fields */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                value={formData.shipping.firstName}
                onChange={(e) => setFormData({
                  ...formData,
                  shipping: { ...formData.shipping, firstName: e.target.value }
                })}
                className="p-2 border rounded"
              />
              {/* Add other shipping form fields */}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="payment-form">
            {/* Payment form fields */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Card Number"
                value={formData.payment.cardNumber}
                onChange={(e) => setFormData({
                  ...formData,
                  payment: { ...formData.payment, cardNumber: e.target.value }
                })}
                className="p-2 border rounded"
              />
              {/* Add other payment form fields */}
            </div>
          </div>
        )}

        {errors.submit && <div className="text-red-500 mt-4">{errors.submit}</div>}

        <div className="mt-6 flex justify-between">
          {step === 2 && (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="bg-gray-500 text-white px-6 py-2 rounded"
            >
              Back
            </button>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded"
          >
            {step === 1 ? 'Continue to Payment' : 'Place Order'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm; 