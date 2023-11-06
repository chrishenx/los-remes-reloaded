import { RoutesFinder, RoutesFinderProps, } from '@/components/RoutesFinder';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { PageProps } from '@/types/pageProps';
import { parseRoutesSearchParams } from '@/lib/climbing-utils';
import sectors from "@/lib/los-remes.json";

export function RoutesFinderPage({ sectors, gradeRange } : InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <RoutesFinder sectors={sectors} gradeRange={gradeRange} />
  );
}

export default RoutesFinderPage;

export const getServerSideProps = (async (context) => {
  // TODO Validate types or query params
  const { sectors: searchedSectors, gradeRange } = parseRoutesSearchParams(context.query);
  
  const pageName = gradeRange?.min.raw === gradeRange?.max.raw ? `Rutas de ${gradeRange?.min.raw}` : `Rutas entre ${gradeRange?.min.raw} y ${gradeRange?.max.raw}`;
  
  return {
    props: {
      name: pageName,
      sectors: searchedSectors.length === 0 ? sectors : searchedSectors,
      gradeRange,
    },
  };
}) satisfies GetServerSideProps<PageProps & RoutesFinderProps>;