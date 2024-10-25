import { Card, Flex, Typography, Form, Input, Button, Alert } from "antd";
import { Link } from "react-router-dom";
import registerImage from "../assets/registerImage.png"
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../features/auth/authAction';
import { useNavigate } from 'react-router-dom';
import { clearMessages } from '../features/auth/authSlice';
import { useEffect } from 'react';

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, successMessage, setError } = useSelector((state) => state.auth);

  useEffect(() => {
    return () => {
      dispatch(clearMessages());
    };
  }, [dispatch]);

  const handelRegister = async (values) => {
    try {
      if (values.password !== values.passwordConfirm) {
        dispatch(setError("Passwords do not match"));
        return;
      }
      await dispatch(register(values));
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#cbdbff] flex items-center justify-center p-4">
      <Card className="w-full max-w-[900px] rounded-3xl border border-gray-300 shadow-lg">
        <Flex gap="large" className="flex-col md:flex-row">
          <Flex vertical flex={1} className="justify-center">
            <Typography.Title level={3} strong className="slogan">
              Create an Account
            </Typography.Title>
            <Typography.Text type="secondary" strong className="slogan mb-4">
              Empowering Communities, One Sunbeam at a Time.
            </Typography.Text>
            <Form layout="vertical" onFinish={handelRegister} autoComplete="off">
              <Form.Item
                label="Full Name"
                name="name"
                className="mb-2"
                rules={[
                  {
                    required: true,
                    message: "Please input your Full Name",
                  },
                ]}
              >
                <Input size="large" placeholder="Enter Your Full Name" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                className="mb-2"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email",
                  },
                  {
                    type: "email",
                    message: "The input is not valid",
                  },
                ]}
              >
                <Input size="large" placeholder="Enter Your Email" />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                className="mb-2"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password",
                  },
                  {
                    min: 6,
                    message: "Password must be at least 6 characters long",
                  }
                ]}
              >
                <Input.Password size="large" placeholder="Enter Your Password" />
              </Form.Item>

              <Form.Item
                label="Confirm Password"
                name="passwordConfirm"
                className="mb-8"
                dependencies={['password']}
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Passwords do not match'));
                    },
                  }),
                ]}
              >
                <Input.Password size="large" placeholder="Re-Enter Your Password" />
              </Form.Item>

              {error && (
                <Alert
                  message="Error"
                  description={error}
                  type="error"
                  showIcon
                  closable
                  className="mb-4"
                  onClose={() => dispatch(clearMessages())}
                />
              )}

              {successMessage && (
                <Alert
                  message="Success"
                  description={successMessage}
                  type="success"
                  showIcon
                  className="mb-4"
                />
              )}

              <Form.Item>
                <Button
                  htmlType="submit"
                  size="large"
                  className="w-full bg-blue-500 rounded-xl"
                  loading={loading}
                >
                  Create Account
                </Button>
              </Form.Item>
              <Form.Item>
                <Link to="/login">
                  <Button size="large" className="w-full bg-blue-500 rounded-xl">
                    Sign-In
                  </Button>
                </Link>
              </Form.Item>
            </Form>
          </Flex>
          <Flex flex={1} className="hidden md:flex">
            <img src={registerImage} alt="Register illustration" className="w-full h-full object-cover bg-blue-200 rounded-3xl" />
          </Flex>
        </Flex>
      </Card>
    </div>
  );
}