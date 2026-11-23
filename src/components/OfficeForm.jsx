import React, { useState } from 'react';
import axios from 'axios';
import ClinicButton from './ClinicButton';

const API_URL = 'http://localhost:8085';

const OfficeForm = () => {
  const [officeName, setOfficeName] = useState('');
  const [officeNumber, setOfficeNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await axios.post(`${API_URL}/api/offices/save`, {
        name: officeName,
        officeNumber: parseInt(officeNumber, 10),
      });

      console.log('Office saved:', response.data);
      setMessage({ type: 'success', text: 'Office saved successfully!' });

      setOfficeName('');
      setOfficeNumber('');
    } catch (error) {
      console.error('Error saving office:', error);
      const data = error.response?.data;
      const text =
        typeof data === 'string'
          ? data
          : data?.message || 'Failed to save office';
      setMessage({ type: 'error', text });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-5">Save Office</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="officeName" className="text-sm font-medium text-gray-700">
            Office Name:
          </label>
          <input
            id="officeName"
            type="text"
            value={officeName}
            onChange={(e) => setOfficeName(e.target.value)}
            placeholder="Enter office name"
            required
            className="px-3 py-2.5 border border-gray-300 rounded-md text-sm outline-none
                       focus:border-blue-600 focus:ring-3 focus:ring-blue-600/10 transition"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="officeNumber" className="text-sm font-medium text-gray-700">
            Office Number:
          </label>
          <input
            id="officeNumber"
            type="number"
            value={officeNumber}
            onChange={(e) => setOfficeNumber(e.target.value)}
            placeholder="Enter office number"
            required
            min={1}
            className="px-3 py-2.5 border border-gray-300 rounded-md text-sm outline-none
                       focus:border-blue-600 focus:ring-3 focus:ring-blue-600/10 transition"
          />
        </div>

        <ClinicButton type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Office'}
        </ClinicButton>

        {message.text && (
          <p
            className={`p-2.5 rounded-md text-sm ${
              message.type === 'success'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {message.text}
          </p>
        )}
      </form>
    </div>
  );
};

export default OfficeForm;