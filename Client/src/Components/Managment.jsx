import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosConfig';
import { Card, Form, Input, InputNumber, Select, Button, Alert, Row, Col, Typography } from 'antd';
import { Loader2 } from 'lucide-react';

const { Title } = Typography;

const SolarProjectManagement = () => {
  const [form] = Form.useForm();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get('/projects');
      setProjects(response.data.data || []);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err.response?.data?.message || 'Failed to fetch projects');
      if (err.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  // Create new project
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      setError(null);
      
      // Ensure numerical values are properly formatted
      const formattedValues = {
        ...values,
        totalCapacity: Number(values.totalCapacity),
        totalShares: Number(values.totalShares),
        availableShares: Number(values.availableShares),
        pricePerShare: Number(values.pricePerShare.toString().replace(/[$,]/g, '')),
        expectedReturn: Number(values.expectedReturn.toString().replace('%', ''))
      };

      const response = await axiosInstance.post('/projects', formattedValues);
      
      if (response.data.status === 'success') {
        form.resetFields();
        fetchProjects();
      }
    } catch (err) {
      console.error('Error creating project:', err);
      setError(err.response?.data?.message || 'Failed to create project');
      if (err.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchProjects();
  }, [token, navigate]);

  // Form validation rules
  const validateAvailableShares = (_, value) => {
    const totalShares = form.getFieldValue('totalShares');
    if (value > totalShares) {
      return Promise.reject('Available shares cannot exceed total shares');
    }
    return Promise.resolve();
  };

  return (
    <div className="p-6">
      {error && (
        <Alert 
          type="error" 
          message={error} 
          className="mb-6"
          closable
          onClose={() => setError(null)}
        />
      )}

      <Card className="mb-6">
        <Title level={2}>Create New Solar Project</Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Project Name"
                rules={[{ required: true, message: 'Please input project name!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="location"
                label="Location"
                rules={[{ required: true, message: 'Please input location!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="totalCapacity"
                label="Total Capacity (kW)"
                rules={[{ required: true, message: 'Please input total capacity!' }]}
              >
                <InputNumber min={0} className="w-full" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="totalShares"
                label="Total Shares"
                rules={[{ required: true, message: 'Please input total shares!' }]}
              >
                <InputNumber min={1} className="w-full" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="availableShares"
                label="Available Shares"
                rules={[
                  { required: true, message: 'Please input available shares!' },
                  { validator: validateAvailableShares }
                ]}
              >
                <InputNumber min={0} className="w-full" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="pricePerShare"
                label="Price per Share ($)"
                rules={[{ required: true, message: 'Please input price per share!' }]}
              >
                <InputNumber
                  min={0}
                  className="w-full"
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="expectedReturn"
                label="Expected Return (%)"
                rules={[{ required: true, message: 'Please input expected return!' }]}
              >
                <InputNumber
                  min={0}
                  max={100}
                  className="w-full"
                  formatter={value => `${value}%`}
                  parser={value => value.replace('%', '')}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
                initialValue="planned"
              >
                <Select>
                  <Select.Option value="planned">Planned</Select.Option>
                  <Select.Option value="construction">Construction</Select.Option>
                  <Select.Option value="active">Active</Select.Option>
                  <Select.Option value="maintenance">Maintenance</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full"
            >
              Create Project
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Row gutter={[16, 16]}>
        {projects.map(project => (
          <Col key={project._id} xs={24} sm={12} lg={8}>
            <Card title={project.name}>
              <p><strong>Location:</strong> {project.location}</p>
              <p><strong>Capacity:</strong> {project.totalCapacity}kW</p>
              <p><strong>Shares:</strong> {project.availableShares}/{project.totalShares}</p>
              <p><strong>Price/Share:</strong> ${project.pricePerShare.toLocaleString()}</p>
              <p><strong>Expected Return:</strong> {project.expectedReturn}%</p>
              <p><strong>Status:</strong> {project.status}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SolarProjectManagement;