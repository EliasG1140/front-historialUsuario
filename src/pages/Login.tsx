import { login } from "@api";
import { useUserStore } from "@stores";
import { notify } from "@utils";
import { Button, Card, Form, Input } from "antd";
import { useNavigate } from "react-router";

export const Login = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  /* ---------------------------------- Form ---------------------------------- */
  const [form] = Form.useForm();

  /* --------------------------------- Handle --------------------------------- */
  const onSubmit = (values: any) => {
    login(values)
      .then((res) => {
        setUser(res);
        notify.success("Inicio de sesión exitoso", 3);
        navigate("/home");
      })
      .catch((err) => {
        const {
          response: {
            data: { detail },
          },
        } = err as any;
        notify.error(detail || "Error al iniciar sesión", 3);
      });
  };

  return (
    <Card>
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">Inicio de sesión</h1>
        </div>
        <Form.Item label="Username" name="username">
          <Input size="large" type="text" />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input size="large" type="password" />
        </Form.Item>
        <Form.Item label={null}>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="w-full"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
