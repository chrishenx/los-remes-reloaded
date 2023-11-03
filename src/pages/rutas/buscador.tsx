import { RoutesFinder, RoutesFinderProps, } from '@/components/RoutesFinder';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { PageProps } from '@/types/pageProps';
import { parseGrade } from '@/lib/climbing-utils';
import sectors from "@/lib/los-remes.json";

export function RoutesFinderPage({ sectors, gradeRange } : InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <RoutesFinder sectors={sectors} gradeRange={gradeRange} />
  );
}

export default RoutesFinderPage;

export const getServerSideProps = (async (context) => {
  // TODO Validate types or query params
  const sectorIds = new Set(context.query.sector_ids as string[]);

  const rawMinGrade = context.query.min_grade;
  const rawMaxGrade = context.query.max_grade;

  const minGrade = parseGrade(rawMinGrade as string);
  const maxGrade = parseGrade(rawMaxGrade as string);

  const pageName = minGrade === maxGrade ? `Rutas de ${rawMinGrade}` : `Rutas entre ${rawMinGrade} y ${rawMaxGrade}`;
  
  return {
    props: {
      name: pageName,
      sectors: sectors.filter(sector => sectorIds.has(sector.id)),
      gradeRange: {
        raw: `${rawMinGrade} a ${rawMaxGrade}`,
        min: minGrade,
        max: maxGrade
      }
    },
  };
}) satisfies GetServerSideProps<PageProps & RoutesFinderProps>;