import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import { getProfile, updateProfile } from '../services/api';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    addresses: [],
    preferences: {
      newsletter: false,
      notifications: true
    }
  });

  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await getProfile();
      setProfile(response.data);
      setFormData(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateProfile(formData);
      setProfile(formData);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Profile</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-blue-500 hover:text-blue-700"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({
                    ...formData,
                    phoneNumber: e.target.value
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Preferences
                </label>
                <div className="mt-2 space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.preferences.newsletter}
                      onChange={(e) => setFormData({
                        ...formData,
                        preferences: {
                          ...formData.preferences,
                          newsletter: e.target.checked
                        }
                      })}
                      className="rounded border-gray-300 text-blue-600"
                    />
                    <span className="ml-2">Subscribe to newsletter</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.preferences.notifications}
                      onChange={(e) => setFormData({
                        ...formData,
                        preferences: {
                          ...formData.preferences,
                          notifications: e.target.checked
                        }
                      })}
                      className="rounded border-gray-300 text-blue-600"
                    />
                    <span className="ml-2">Enable notifications</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Contact Information</h3>
              <p className="text-gray-600">Email: {user.email}</p>
              <p className="text-gray-600">Phone: {profile.phoneNumber || 'Not provided'}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium">Addresses</h3>
              {profile.addresses.map((address, index) => (
                <div key={index} className="border rounded p-3 mt-2">
                  <p className="font-medium">{address.type}</p>
                  <p>{address.street}</p>
                  <p>{`${address.city}, ${address.state} ${address.zipCode}`}</p>
                  <p>{address.country}</p>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-lg font-medium">Preferences</h3>
              <p className="text-gray-600">
                Newsletter: {profile.preferences.newsletter ? 'Subscribed' : 'Not subscribed'}
              </p>
              <p className="text-gray-600">
                Notifications: {profile.preferences.notifications ? 'Enabled' : 'Disabled'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 