import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosConfig';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/projects');
        setProjects(response.data.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        if (error.response?.status === 401) {
          navigate('/login');
        } else {
          setError(error.response?.data?.message || 'Failed to fetch projects');
        }
      } finally {
        setLoading(false);
      }
    };

    if (!token) {
      navigate('/login');
    } else {
      fetchProjects();
    }
  }, [token, navigate]);

  const handleInvest = async (projectId) => {
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post('/invest', {
        projectId,
        shares: 1
      });
      
      // Update local state to reflect the change
      setProjects(prevProjects => 
        prevProjects.map(project => 
          project._id === projectId 
            ? { ...project, availableShares: project.availableShares - 1 }
            : project
        )
      );
      
      alert(response.data.message || 'Investment successful!');
    } catch (error) {
      console.error('Error making investment:', error);
      alert(error.response?.data?.message || 'Investment failed');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Available Projects</h1>
        {user && <p className="text-gray-600">Logged in as: {user.email}</p>}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div 
            key={project._id} 
            className="border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-4">{project.name}</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Location:</span> {project.location}</p>
              <p><span className="font-medium">Total Capacity:</span> {project.totalCapacity} kW</p>
              <p><span className="font-medium">Available Shares:</span> {project.availableShares}</p>
              <p><span className="font-medium">Price per Share:</span> ₹{project.pricePerShare}</p>
            </div>
            <button
              onClick={() => handleInvest(project._id)}
              disabled={loading || project.availableShares < 1}
              className={`
                mt-4 w-full py-2 px-4 rounded
                ${loading || project.availableShares < 1
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                }
              `}
            >
              {loading ? 'Processing...' : 
               project.availableShares < 1 ? 'Sold Out' : 'Buy 1 Share'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;