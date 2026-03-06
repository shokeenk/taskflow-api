import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api.js';

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', status: 'PENDING' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      const list = res.data?.data?.tasks || [];
      setTasks(list);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      if (editingId) {
        await updateTask(editingId, form);
        setSuccess('Task updated successfully.');
      } else {
        await createTask(form);
        setSuccess('Task created successfully.');
      }
      setForm({ title: '', description: '', status: 'PENDING' });
      setEditingId(null);
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    }
  };

  const handleEdit = (task) => {
    setEditingId(task._id);
    setForm({
      title: task.title,
      description: task.description || '',
      status: task.status || 'PENDING'
    });
  };

  const handleDelete = async (id) => {
    setError('');
    setSuccess('');
    try {
      await deleteTask(id);
      setSuccess('Task deleted successfully.');
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className="dashboard">
      <Navbar />
      <main className="dashboard-main">
        <section className="card">
          <h2>{editingId ? 'Edit Task' : 'Add Task'}</h2>
          <form onSubmit={handleSubmit} className="item-form">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
            />
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
            {success && <div className="success-text">{success}</div>}
            {error && <div className="error-text">{error}</div>}
            <div className="actions">
              <button type="submit">{editingId ? 'Update' : 'Create'}</button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setForm({ name: '', description: '' });
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>
        <section className="card">
          <h2>Your Tasks</h2>
          {tasks.length === 0 ? (
            <p>No tasks yet.</p>
          ) : (
            <ul className="item-list">
              {tasks.map((task) => (
                <li key={task._id} className="item-row">
                  <div>
                    <strong>{task.title}</strong>
                    {task.description && <p>{task.description}</p>}
                    <p>Status: {task.status}</p>
                  </div>
                  <div className="item-actions">
                    <button onClick={() => handleEdit(task)}>Edit</button>
                    <button onClick={() => handleDelete(task._id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;

