import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import './office_tables.css';

const API_URL = 'http://localhost:8085/api/offices';

function getErrorMessage(error, fallback) {
  const data = error.response?.data;
  return typeof data === 'string' ? data : data?.message || fallback;
}

function OfficeTables() {
  const [offices, setOffices] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [actionError, setActionError] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;

    async function loadOffices() {
      setLoading(true);
      setLoadError('');

      try {
        const response = await axios.get(`${API_URL}/all`);
        if (active) {
          setOffices(response.data);
        }
      } catch (error) {
        if (active) {
          setLoadError(getErrorMessage(error, 'Failed to load offices.'));
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadOffices();

    return () => {
      active = false;
    };
  }, [reloadKey]);

  const filteredOffices = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return offices;
    }

    return offices.filter(
      (office) =>
        office.name?.toLowerCase().includes(query) ||
        String(office.officeNumber).includes(query),
    );
  }, [offices, search]);

  async function handleDelete(office) {
    if (!window.confirm(`Delete office "${office.name}" (#${office.officeNumber})?`)) {
      return;
    }

    setDeletingId(office.id);
    setActionError('');

    try {
      await axios.delete(`${API_URL}/delete/${office.id}`);
      setOffices((currentOffices) =>
        currentOffices.filter((item) => item.id !== office.id),
      );
    } catch (error) {
      setActionError(getErrorMessage(error, 'Failed to delete office.'));
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <main className="office-tables-page">
      <h1>Offices</h1>
      <p>View and manage available offices.</p>

      <label className="office-search">
        <span>Search by office name or number</span>
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Enter an office name or number"
        />
      </label>

      {actionError && <p className="office-error" role="alert">{actionError}</p>}

      <div className="office-table-container">
        <table className="office-table">
          <thead>
            <tr>
              <th>Office Name</th>
              <th>Office Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3">Loading offices...</td>
              </tr>
            ) : loadError ? (
              <tr>
                <td colSpan="3">
                  <span className="office-error" role="alert">{loadError}</span>{' '}
                  <button type="button" onClick={() => setReloadKey((key) => key + 1)}>
                    Retry
                  </button>
                </td>
              </tr>
            ) : filteredOffices.length === 0 ? (
              <tr>
                <td colSpan="3">
                  {search ? 'No offices match your search.' : 'No offices available.'}
                </td>
              </tr>
            ) : (
              filteredOffices.map((office) => (
                <tr key={office.id}>
                  <td>{office.name}</td>
                  <td>{office.officeNumber}</td>
                  <td className="office-actions">
                    <button
                      type="button"
                      onClick={() => handleDelete(office)}
                      disabled={deletingId === office.id}
                    >
                      {deletingId === office.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {!loading && !loadError && (
        <p className="office-count">
          Showing {filteredOffices.length} of {offices.length} offices
        </p>
      )}
    </main>
  );
}

export default OfficeTables;
