import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Sun, LayoutDashboard, FolderKanban, PlusCircle, LogOut, MapPin, Battery, CreditCard, Loader2 } from 'lucide-react';
import axiosInstance from '../utils/axiosConfig';
import { Layout, Menu } from 'antd';

const { Sider, Content } = Layout;

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

  const menuItems = [
    {
      key: 'overview',
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: 'Overview',
      onClick: () => navigate('/dashboard')
    },
    {
      key: 'projects',
      icon: <FolderKanban className="h-5 w-5" />,
      label: 'Projects',
      onClick: () => navigate('/projects')
    },
    {
      key: 'create',
      icon: <PlusCircle className="h-5 w-5" />,
      label: 'Create Project',
      onClick: () => navigate('/managment')
    }
  ];

  const content = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-[calc(100vh-2rem)]">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      );
    }

    return (
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Solar Projects</h1>
          {user && (
            <p className="mt-2 text-3xl text-gray-600">
              Welcome back, {user.name}
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div 
              key={project._id} 
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden"
            >
              <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-600 p-6">
                <Sun className="h-8 w-8 text-white opacity-75" />
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {project.name}
                </h2>
                
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{project.location}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Battery className="h-5 w-5 mr-2" />
                    <span>{project.totalCapacity} kW Capacity</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <CreditCard className="h-5 w-5 mr-2" />
                    <span>₹{project.pricePerShare} per share</span>
                  </div>
                </div>
                
                <div className="mt-4 mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Available Shares</span>
                    <span className="font-medium text-gray-900">{project.availableShares}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ 
                        width: `${(project.availableShares / (project.availableShares + 10)) * 100}%` 
                      }}
                    />
                  </div>
                </div>
                
                <button
                  onClick={() => handleInvest(project._id)}
                  disabled={loading || project.availableShares < 1}
                  className={`
                    w-full py-3 px-4 rounded-lg font-medium transition-all duration-200
                    ${loading || project.availableShares < 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow'
                    }
                  `}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Processing...
                    </span>
                  ) : project.availableShares < 1 ? 'Sold Out' : 'Invest Now'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Layout className="min-h-screen">
      <Sider
        width={280}
        className="bg-white border-r border-gray-200"
        theme="light"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Sun className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-semibold text-gray-800">SunVest</span>
          </div>
        </div>
        
        <Menu
          mode="inline"
          defaultSelectedKeys={['projects']}
          className="border-none"
          items={menuItems}
        />
        
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <button 
            onClick={() => navigate('/logout')}
            className="flex items-center space-x-3 px-3 py-2 w-full text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </Sider>
      
      <Content className="bg-gray-50 p-8">
        {content()}
      </Content>
    </Layout>
  );
};

export default ProjectList;