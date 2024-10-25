import { Card, Flex, Typography, Form, Input, Button , Alert} from "antd";
import { Link } from "react-router-dom"; 
import loginpic from "../assets/login.png"

import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authAction';
import { useNavigate } from 'react-router-dom';
import { clearMessages } from '../features/auth/authSlice';
import { useEffect } from 'react';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, successMessage } = useSelector((state) => state.auth);

  useEffect(() => {
    return () => {
      dispatch(clearMessages());
    };
  }, [dispatch]);

  const handelLogin = async (values) => {
    try {
      await dispatch(login(values));
      
      // Navigate after a delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000); // 2 second delay

    } catch (err) {
      console.error('Login failed:', err);
    }
  }; 
    return(   
    <div className="min-h-screen bg-[#cbdbff] flex items-center justify-center p-4">
      <Card className="w-full max-w-[900px] rounded-3xl border border-gray-300 shadow-lg">
        <Flex gap="large">
            <Flex flex={1}>
                <img src={loginpic} className="w-full bg-blue-200 rounded-3xl"></img>
            </Flex>
            <Flex vertical flex={1} className="slogan justify-center">
                <Typography.Title level={3} strong>
                    Sign-In Account
                </Typography.Title>
                <Typography.Text type="secondary" strong className="mb-4" >
                  Your Share in a Greener Future.
                </Typography.Text>
                <Form layout="vertical" onFinish={handelLogin} autoComplete="off">
                    <Form.Item
                        label="Email"
                        name="email"
                        className="mb-4 text-left"
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
                        className="mb-8 text-left"
                        rules={[
                        {
                            required: true,
                            message: "Please input your Password",
                        },
                        {
                            type: "password",
                            message: "The input is not valid",
                        },
                        ]}
                    >
                        <Input.Password size="large" placeholder="Enter Your Password" />
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

            <Form.Item className="text-center">
              <Button
                htmlType="submit"
                size="large"
                className=" w-96 bg-blue-500 rounded-xl"
                loading={loading}
              >
                Sign-In
              </Button>
            </Form.Item>
                    <Form.Item className="text-center">
                        <Link to="/register">
                        <Button size="large" className="w-96 bg-blue-500 rounded-xl">
                            Create Account
                        </Button>
                        </Link>
                    </Form.Item>
                </Form>
            </Flex>
        </Flex>
      </Card>
    </div>
    )
}