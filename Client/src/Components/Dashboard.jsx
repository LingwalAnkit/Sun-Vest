// Components/Dashboard/index.jsx
import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu, Typography, Row, Col, Card, Statistic, Table, Spin, Alert ,Button } from 'antd';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell 
} from 'recharts';
import {  
  ThunderboltOutlined,
  BarChartOutlined,
  ProjectOutlined
} from '@ant-design/icons';
import { getAuthToken } from '../utils/auth';

const { Content, Sider } = Layout;
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
  const [selectedMenu, setSelectedMenu] = useState('1');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(initialDashboardData);
  const navigate = useNavigate();

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

        setDashboardData({
          investments: investmentsRes.data || [],
          analytics: analyticsRes.data || {
            totalInvestment: 0,
            totalEnergy: 0,
            totalSavings: 0,
            carbonOffset: 0,
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
        <span style={{ 
          color: status === 'active' ? '#52c41a' : '#faad14',
          textTransform: 'capitalize'
        }}>
          {status}
        </span>
      ),
    }
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} theme="light">
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <Title level={4}>SunVest</Title>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedMenu]}
          onSelect={({ key }) => {
            setSelectedMenu(key);
            navigate(key);  // Redirect to the path associated with the menu item
          }}
          items={[
            {
              key: '1',
              icon: <BarChartOutlined />,
              label: 'Overview',
            },
            {
              key: '/projects',
              icon: <ProjectOutlined />,
              label: 'Projects',
            },
            {
              key: '3',
              icon: <ThunderboltOutlined />,
              label: 'Create Project',
            },
          ]}
        />
      </Sider>
      
      <Layout>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
          {error && (
            <Alert
              message="Error"
              description={error}
              type="error"
              showIcon
              style={{ marginBottom: 24 }}
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
                      data={dashboardData.investments}
                      dataKey="investmentAmount"
                      nameKey="project.name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {dashboardData.investments.map((entry, index) => (
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
        </Content>
      </Layout>
    </Layout>
  );
}