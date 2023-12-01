import { Typography, theme } from "antd";
import { ReCaptchaProvider } from "next-recaptcha-v3";
import Link from "next/link";
import { CommentsBox } from "@/components/CommentsBox";

export type AboutProps = {
  containerStyles?: React.CSSProperties;
};

export function About({ containerStyles }: AboutProps) {
  const {
    token: { colorPrimaryText },
  } = theme.useToken();

  return (
    <ReCaptchaProvider language="es-419">
      <div style={containerStyles}>
        <Typography.Paragraph>
          <Link href="/"
            style={{ marginRight: 4, color: colorPrimaryText }}>Los Remes Reloaded</Link>
          fue creado como un proyecto personal para poder explorar las rutas de Los Remedios por grado de dificultad.
          Esto permitiría a cualquiera que vaya a la zona, poder elegir una ruta que se adapte a su nivel de experiencia.
        </Typography.Paragraph>
        <Typography.Paragraph>
          Como recomendación, es crucial comprender los grados que deseas escalar, ya que esto influye significativamente en tu
          experiencia durante un día normal de escalada, así como en tu progreso a lo largo del tiempo en este deporte. En un día
          de escalada, te sugiero escalar una ruta un grado por debajo de tu máximo, en la que tengas el 100% de control. Esto te
          brindará una sensación de confianza y seguridad, al haber completado la ruta sin problemas, reforzando tu autoconfianza
          como escalador. Después, intenta una ruta intermedia entre tu máximo y el grado que acabas de completar. Si la completas,
          será increíble; pero si no, no hay problema, será un buen desafío que probablemente podrás superar en tu próxima sesión,
          obteniendo así más gratificación y confianza. Ya bien preparado/a, prueba una ruta de tu nivel máximo y, si llegas hasta arriba,
          superando todos los movimientos y descansos, representará un gran avance, dándote una idea clara de lo que necesitas mejorar para
          completarla. Y estoy seguro/a de que lo lograrás.
        </Typography.Paragraph>
        <Typography.Paragraph>
          Este método es un excelente modelo para estructurar tus sesiones de escalada de fin de semana, manteniéndote motivado/a al 
          construir autoconfianza con cada sesión. Siempre logras algo nuevo y te mantiene con ganas de más, ya que siempre habrá algo
          por completar, algo desafiante que, eventualmente, lograrás en tu nivel máximo. Claro, existen otros modelos, pero lo importante
          es que te diviertas, lo pases bien y te mantengas motivado/a para seguir escalando.
        </Typography.Paragraph>
        <Typography.Paragraph>
          Una parte fundamental de esto es encontrar rutas dentro de estos grados, y eso es precisamente lo que este proyecto busca resolver, 
          al menos en Los Remedios. Y tú puedes ayudarme a construir otros catálogos públicos de diferentes áreas de escalada. Pienso que mi 
          siguiente proyecto será en Los Dinamos, un lugar que me encanta y por el cual me siento muy motivado/a a desarrollar.
        </Typography.Paragraph>
        <Typography.Paragraph>
          De hecho, al entrar a esta página, ya me estás ayudando. Checa si algo del contenido de publicidad te interesa y haz clic. Solo te pido
          que, si te gusta la página, la compartas con tus amigos.
        </Typography.Paragraph>
        <Typography.Paragraph>
          Si quieres ayudar a construir el catálogo, mándame tus comentarios en esta caja, tambien puedes mandarme una consulta para consultoria
          software a tu medida:
        </Typography.Paragraph>
        <CommentsBox />
        <small style={{ textAlign: "right", display: "inline-block" }}>
          This site is protected by reCAPTCHA and the Google&nbsp;
          <a href="https://policies.google.com/privacy">Privacy Policy</a> and&nbsp;
          <a href="https://policies.google.com/terms">Terms of Service</a> apply.
        </small>
      </div>
    </ReCaptchaProvider>
  );
}