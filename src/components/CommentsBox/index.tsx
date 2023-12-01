import { Button, Form, Input, Select, theme } from "antd";
import { useReCaptcha } from "next-recaptcha-v3";
import { useCallback, useEffect, useState } from "react";
import useFetch from "react-fetch-hook";
import { RawCommentsSubmision, RawCommentsSubmisionSchema, StoredComment, StoredCommentSchema } from "@/models/Comments";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { notification } from "antd";

export function CommentsBox() {
  const { executeRecaptcha } = useReCaptcha();
  const [ reCaptchaToken, setReCaptchaToken ] = useState<string | undefined>();
  const [ commentSubmission, setCommentSubmission ] = useState<RawCommentsSubmision | undefined>();

  const { token: { colorPrimaryText, colorErrorText } } = theme.useToken();
  const [ notificationInstance, contextHolder] = notification.useNotification();

  const { isLoading, data, error } = useFetch("/api/comments", {
    method: "POST",
    mode: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ reCaptchaToken, commentSubmission }),
    depends: [!!reCaptchaToken, !!commentSubmission]
  });

  useEffect(() => {
    if (data) {
      let createdComment: StoredComment | undefined;
      try {
        createdComment = StoredCommentSchema.parse(data);
      } catch (error) {
        console.error(error);
      }
      notificationInstance.open({
        message: "Gracias por tus comentarios",
        description: createdComment?.inquiryType === "losRemesReloaded" ? "Tu mensaje ha sido enviado, agradecemos tus comentarios." : "Tu mensaje ha sido enviado, nos pondremos en contacto contigo a la brevedad.",
        duration: 5,
        placement: "bottomRight",
        type: "success",
        icon: <SmileOutlined style={{ color: colorPrimaryText }} />,
      });
    }
  }, [
    data,
    notificationInstance,
    colorPrimaryText,
  ]);

  useEffect(() => {
    if (error) {
      console.error("Opening error notification: ", error);
      notificationInstance.open({
        message: "Hubo un error al enviar tu mensaje",
        description: "Por favor, intenta más tarde.",
        duration: 5,
        placement: "bottomRight",
        type: "error",
        icon: <FrownOutlined style={{ color: colorErrorText }} />,
      });
    }
  }, [
    error,
    notificationInstance,
    colorErrorText,
  ]);

  const handleFormFinish = useCallback(
    async (values: unknown) => {
      const rawCommentsSubmission = RawCommentsSubmisionSchema.parse(values);
      setCommentSubmission(rawCommentsSubmission);
      const reCaptchaToken = await executeRecaptcha("comments_box");
      setReCaptchaToken(reCaptchaToken);
    },
    [executeRecaptcha]
  );


  return (
    <Form title="Caja de comentarios" 
      layout="vertical" initialValues={{ "inquiryType": "losRemesReloaded" }}
      onFinish={handleFormFinish}
    >
      {contextHolder}
      <Form.Item<RawCommentsSubmision>  name="name"
        label="Tu nombre completo"
        rules={[{ required: true, type: "string", min: 5, message: "Por favor, ingresa tu nombre." }]}>
        <Input /* value={name} onChange={onNameChange} */ placeholder="* Tu nombre"></Input>
      </Form.Item>
      <Form.Item<RawCommentsSubmision> name="email"
        label="Email"
        rules={[{ required: true, type: "email", message: "Por favor, ingresa un correo electrónico válido." }]}>
        <Input /* value={name} onChange={onNameChange} */ placeholder="* Tu correo electrónico"></Input>
      </Form.Item>
      <Form.Item<RawCommentsSubmision> name="comments"
        label="Comentarios o consulta"
        rules={[{ required: true, type: "string", min: 20, max: 500, message: "Por favor, ingresa entre 20 y 500 carácteres" }]}>
        <Input.TextArea maxLength={500} name="comment" rows={4}
          placeholder="Hasta 500 carácteres" />
      </Form.Item>
      <Form.Item<RawCommentsSubmision> name="inquiryType"
        label="Tipo de consulta">
        <Select >
          <Select.Option value="losRemesReloaded">Los Remes Reloaded</Select.Option>
          <Select.Option value="businessRelated">Consultoria de software</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" size="large"
          disabled={isLoading}>Enviar</Button>
      </Form.Item>
    </Form>
  );
}