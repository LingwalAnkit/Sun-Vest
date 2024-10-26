import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography, Row, Col, Card, Statistic, Table, Spin, Alert, Button } from 'antd';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell 
} from 'recharts';
import { Sun, LayoutDashboard, FolderKanban, PlusCircle, LogOut } from 'lucide-react';
import { getAuthToken } from '../utils/auth';

const { Title } = Typography;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const API_BASE_URL = 'http://localhost:3000/api/solar';

const initialDashboardData = {
  investments: [],
  analytics: {
    totalInvestment: 0,
    totalEnergy: 0,
    totalSavings: 0,
    carbonOffset: 0,
    history: []
  },
  projects: [],
  energyHistory: []
};

export default function Dashboard() {
  const [selectedMenu, setSelectedMenu] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(initialDashboardData);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const fetchData = async (endpoint) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication failed');
        }
        const errorText = await response.text();
        throw new Error(`Request failed: ${errorText}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Expected JSON response, got ${contentType}`);
      }

      const data = await response.json();
      if (data.status === 'error') {
        throw new Error(data.message);
      }

      return data;
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [investmentsRes, analyticsRes, projectsRes] = await Promise.all([
          fetchData('/investments'),
          fetchData('/analytics'),
          fetchData('/projects')
        ]);

        const totalInvestment = analyticsRes.data.totalInvestment || 0;
        const gasolineInvestment = totalInvestment / 2;
        const solarInvestment = totalInvestment / 2;

        const gasolineEnergy = gasolineInvestment * 6;
        const solarEnergy = solarInvestment * 10;

        const totalEnergy = gasolineEnergy + solarEnergy;
        const totalSavings = totalEnergy * 0.10;

        const gasolineLiters = gasolineEnergy / 33.6;
        const gasolineCarbonOffset = gasolineLiters * 2.3;
        const solarCarbonOffset = solarEnergy * 0.9;

        const totalCarbonOffset = Math.round(gasolineCarbonOffset + solarCarbonOffset);

        // Consolidate investments by project
        const consolidatedInvestments = investmentsRes.data.reduce((acc, investment) => {
          const projectName = investment.project.name;
          const existingProject = acc.find(item => item.project.name === projectName);
          
          if (existingProject) {
            existingProject.investmentAmount += investment.investmentAmount;
            existingProject.shares += investment.shares;
          } else {
            acc.push({
              ...investment,
              shares: investment.shares,
              investmentAmount: investment.investmentAmount
            });
          }
          return acc;
        }, []);

        setDashboardData({
          investments: investmentsRes.data, // Keep original data for the table
          consolidatedInvestments, // Add consolidated data for the pie chart
          analytics: {
            totalInvestment,
            totalEnergy,
            totalSavings,
            carbonOffset: totalCarbonOffset,
            history: []
          },
          projects: projectsRes.data || [],
          energyHistory: analyticsRes.data?.history || []
        });
      } catch (error) {
        console.error('Dashboard data fetch error:', error);
        setError(error.message);
        
        if (error.message.includes('Authentication failed') || 
            error.message.includes('No authentication token found')) {
          window.location.href = '/login';
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const investmentColumns = [
    {
      title: 'Project Name',
      dataIndex: ['project', 'name'],
      key: 'name',
    },
    {
      title: 'Shares',
      dataIndex: 'shares',
      key: 'shares',
    },
    {
      title: 'Investment Amount',
      dataIndex: 'investmentAmount',
      key: 'amount',
      render: (value) => `$${value.toLocaleString()}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span className={status === 'active' ? 'text-green-600' : 'text-yellow-500'}>
          {status}
        </span>
      ),
    }
  ];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, value, name }) => {
    const RADIAN = Math.PI / 180;
    // Increase the radius to push labels further out
    const radius = outerRadius * 1.2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    // Calculate the line end points for the label connector
    const innerX = cx + (outerRadius * 0.95) * Math.cos(-midAngle * RADIAN);
    const innerY = cy + (outerRadius * 0.95) * Math.sin(-midAngle * RADIAN);
    
    // Calculate text anchor based on which quadrant the label is in
    const textAnchor = x > cx ? 'start' : 'end';
    
    // Format the percentage
    const percentageFormatted = `${(percent * 100).toFixed(0)}%`;
  
  
    return (
      <>
        {/* Draw connecting line */}
        <path
          d={`M ${innerX},${innerY} L ${x},${y}`}
          stroke="#666"
          fill="none"
          className="text-xs"
        />
        
        {/* Add label background for better readability */}
        <g>
          <text
            x={x}
            y={y}
            textAnchor={textAnchor}
            dominantBaseline="middle"
            className="text-xs fill-gray-600"
            style={{ fontWeight: 500 }}
          >
            {`${name} (${percentageFormatted})`}
          </text>
        </g>
      </>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Sun className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-semibold text-gray-800">SunVest</span>
          </div>
        </div>
        
        {/* Navigation Links */}
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            <a 
              href="/overview" 
              onClick={(e) => {
                e.preventDefault();
                navigate('/dashboard');
                setSelectedMenu('overview');
              }}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${
                selectedMenu === 'overview' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>Overview</span>
            </a>
            
            <a 
              href="/projects"
              onClick={(e) => {
                e.preventDefault();
                navigate('/projects');
                setSelectedMenu('projects');
              }}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${
                selectedMenu === 'projects' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FolderKanban className="h-5 w-5" />
              <span>Projects</span>
            </a>
            
            <a 
              href="/managment"
              onClick={(e) => {
                e.preventDefault();
                navigate('/managment');
                setSelectedMenu('create-project');
              }}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${
                selectedMenu === 'create-project' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <PlusCircle className="h-5 w-5" />
              <span>Create Project</span>
            </a>
          </div>
        </nav>
        
        {/* User Section */}
        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={() => navigate('/register')}
            className="flex items-center space-x-3 px-3 py-2 w-full text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {user && (
            <p className="mt-2 text-3xl mb-8 text-gray-600">
              Welcome back, {user.name}
            </p>
          )}
          {error && (
            <Alert
              message="Error"
              description={error}
              type="error"
              showIcon
              className="mb-6"
              action={
                <Button 
                  type="primary" 
                  onClick={() => window.location.reload()}
                >
                  Retry
                </Button>
              }
            />
          )}
          
          {!error && (
            <Row gutter={[24, 24]}>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="Total Investment"
                    value={dashboardData.analytics.totalInvestment}
                    prefix="$"
                    precision={2}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="Energy Generated"
                    value={dashboardData.analytics.totalEnergy}
                    suffix="kWh"
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="Financial Savings"
                    value={dashboardData.analytics.totalSavings}
                    prefix="$"
                    precision={2}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="Carbon Offset"
                    value={dashboardData.analytics.carbonOffset}
                    suffix="kg"
                  />
                </Card>
              </Col>

              {/* Energy Production Chart */}
              <Col span={16}>
                <Card title="Energy Production History">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dashboardData.energyHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="amount" 
                        stroke="#8884d8" 
                        name="Energy (kWh)" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>
              </Col>

              {/* Investment Distribution */}
              <Col span={8}>
                <Card title="Investment Distribution">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                    <Pie
  data={dashboardData.consolidatedInvestments}
  dataKey="investmentAmount"
  nameKey="project.name"
  cx="50%"
  cy="50%"
  outerRadius={60} // Reduced from 80 to give more space for labels
  fill="#8884d8"
  label={renderCustomizedLabel}
  labelLine={false} // Remove default label lines
  paddingAngle={2} // Add slight padding between segments
>
  {dashboardData.consolidatedInvestments.map((entry, index) => (
    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
  ))}
</Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>
              </Col>

              {/* Investments Table */}
              <Col span={24}>
                <Card title="Your Investments">
                  <Table
                    dataSource={dashboardData.investments}
                    columns={investmentColumns}
                    rowKey="_id"
                    pagination={{ pageSize: 5 }}
                  />
                </Card>
              </Col>
            </Row>
          )}
        </div>
      </div>
    </div>
  );
}