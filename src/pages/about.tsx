import React, { useState } from 'react';
import { Button, Typography, Input, theme } from 'antd';
import { PageProps } from '@/types/pageProps';
import { GetStaticProps } from 'next';
import Link from 'next/link';

export function AboutPage() {
  const {
    token: { colorPrimaryText },
  } = theme.useToken();
  const [comments, setComments] = useState('');

  const onCommentsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComments(event.target.value);
  };

  return (
    <div style={{ padding: 16 }}>
      <Typography.Paragraph>
        <Link href="/" style={{ marginRight: 4, color: colorPrimaryText }}>Los Remes Reloaded</Link>
        fue creado como un proyecto personal para poder explorar las rutas de Los Remedios por grado de dificultad.
        Esto permitiría a cualquiera que vaya a la zona, poder elegir una ruta que se adapte a su nivel de experiencia.
      </Typography.Paragraph>
      <Typography.Paragraph>
        Como recomendación, es importante entender los grados que buscas escalar, ya que eso impacta mucho tu experiencia
        en un día de escalada normal, así como tu progreso a lo largo del tiempo en este deporte.
        En un día de escalada, te recomiendo escalar una ruta de un grado por debajo de tu máximo, de la que tengas el 100%
        de control. Eso te dará una sensación de confianza y seguridad, pues habrás encadenado la ruta sin problemas y eso te 
        valida como escalador. Después de eso, puedes intentar una ruta intermedia entre tu máximo y el grado que acabas de
        encadenar. Si la encadenas, será increible, pero si no, no pasa nada, será un buen reto que podrás encadenar en tu siguiente 
        sesión con mucha probabilidad, obteniendo más gratificación y confianza.
        Ya bien caliente, pruebas una ruta de tu máximo, y si llegas hasta arriba, sacando todos los movimientos, descansos, etc.
        ya es un gran avance, pues te dará una idea de lo que necesitas mejorar para poder encadenarla. Y sé que lo lograrás.
      </Typography.Paragraph>
      <Typography.Paragraph>
        Este es un buen modelo para estructurar tu sesión de escalada de los fines de semana, que logra mantenerte motivado(a) al
        construir autoconfianza con cada sesión, pues siempre logras algo nuevo, y te mantiene con hambre de más, pues siempre te 
        queda algo por encadenar, algo duro y en algún momento encadenarás esa cosa en tu máximo.

        Existen claro otros modelos, el chiste es que te diviertas, la pases bien y te mantengas motivado(a) para seguir escalando.
      </Typography.Paragraph>
      <Typography.Paragraph>
        Parte fundamental de esto es encontrar rutas dentro de estos grados, y eso es lo que este proyecto busca resolver 
        (Por lo menos en Los Remedios). Y tu puedes ayudarme a construir otros catalogos públicos de otras áreas de escalada, pienso que mi
        siguiente proyecto será el de Los Dinamos, pues es un lugar que me encanta y  que me siento motivado a desarrollar.
      </Typography.Paragraph>
      <Typography.Paragraph>
        De hecho, al entrar a esta página, ya me estas ayudando. Checa si algo del contenido de publicidad te hace match y le das click.
        Solo te pido que si te gusta la página, la compartas con tus amigos.
      </Typography.Paragraph>
      <Typography.Paragraph>
        Si quieres ayudar a construir el catálogo, mandame tus comentarios en esta caja:
      </Typography.Paragraph>
      <Input.TextArea rows={4} value={comments} onChange={onCommentsChange} />
      <Button style={{ marginTop: 8 }} type="primary">Enviar</Button>
    </div>
  );
}

export const getStaticProps = (() => {
  return {
    props: {
      name: "Acerca de",
      subtitle: "Los Remes Reloaded",
      drawerDisabled: true,
    },
  };
}) satisfies GetStaticProps<PageProps>;

export default AboutPage;