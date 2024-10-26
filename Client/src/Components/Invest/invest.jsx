import React from 'react';
import { Card, Button, Modal } from 'antd';
import { EnvironmentOutlined, DollarOutlined } from '@ant-design/icons';

const projects = [
  {
    name: 'Solar Farm - Green Valley',
    location: '2 km away',
    description: 'A community-driven solar project generating sustainable energy.',
    cost: 500,
    units: 'per share',
    highlighted: true
  },
  {
    name: 'Wind Turbines - Lakeview',
    location: '5 km away',
    description: 'A wind energy project offering great returns for nearby residents.',
    cost: 800,
    units: 'per share',
    highlighted: false
  },
  {
    name: 'Hydro Power - River Bend',
    location: '7 km away',
    description: 'Invest in clean, renewable hydro power with community benefits.',
    cost: 1000,
    units: 'per share',
    highlighted: false
  }
];

const InvestPage = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectedProject, setSelectedProject] = React.useState(null);

  const handleInvestClick = (project) => {
    setSelectedProject(project);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Invest in Renewable Projects Near You</h1>
        <p className="text-xl text-gray-600 mb-12">
          Discover renewable energy projects available for local subscription
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className={`relative ${
                project.highlighted ? 'border-2 border-blue-500 shadow-xl' : 'border border-gray-200'
              }`}
              title={project.name}
              extra={<span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">Nearby</span>}
            >
              <div className="flex items-center gap-2 mb-4">
                <EnvironmentOutlined className="text-green-500" />
                <span className="text-gray-600">{project.location}</span>
              </div>

              <p className="text-gray-600 mb-4">{project.description}</p>

              <div className="flex items-center justify-between">
                <span className="flex items-center text-2xl font-bold text-gray-900">
                  <DollarOutlined className="mr-1" />{project.cost}/{project.units}
                </span>
                <Button 
                  type="primary"
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={() => handleInvestClick(project)}
                >
                  Invest Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal for investment details */}
      {selectedProject && (
        <Modal 
          title={`Invest in ${selectedProject.name}`}
          visible={isModalVisible}
          onCancel={closeModal}
          footer={[
            <Button key="cancel" onClick={closeModal}>
              Cancel
            </Button>,
            <Button key="subscribe" type="primary">
              Confirm Investment
            </Button>
          ]}
        >
          <p className="text-lg text-gray-700 mb-4">{selectedProject.description}</p>
          <p className="text-gray-600">
            Location: <strong>{selectedProject.location}</strong>
          </p>
          <p className="text-gray-600">
            Cost: <strong>${selectedProject.cost} {selectedProject.units}</strong>
          </p>
        </Modal>
      )}
    </div>
  );
};

export default InvestPage;
