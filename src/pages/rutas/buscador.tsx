import { RouteSearchResults, RoutesFinderProps, } from '@/components/RouteSearchResults';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { PageProps } from '@/types/pageProps';
import { findSectorRoutes, parseRoutesSearchParams } from '@/lib/climbing-utils';
import sectors from "@/lib/los-remes.json";

export function RoutesFinderPage({ sectorsRoutes } : InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <RouteSearchResults sectorsRoutes={sectorsRoutes} />
  );
}

export default RoutesFinderPage;

export const getServerSideProps = (async (context) => {
  // TODO Validate types or query params
  const { sectors: searchedSectors, gradeRange } = parseRoutesSearchParams(context.query);
  const filteredSectors = searchedSectors.map(sector => (
    {...sector, routes: findSectorRoutes({ sector, gradeRange }) }
  ));

  const sectorsToUse = filteredSectors.length === 0 ? sectors : filteredSectors;

  const routesCount = sectorsToUse.reduce((acc, sector) => acc + sector.routes.length, 0);
  
  const pageName = gradeRange?.min.raw === gradeRange?.max.raw ? `${routesCount} rutas de ${gradeRange?.min.raw}` : `${routesCount} rutas entre ${gradeRange?.min.raw} y ${gradeRange?.max.raw}`;
  
  return {
    props: {
      name: pageName,
      sectorsRoutes: sectorsToUse,
    },
  };
}) satisfies GetServerSideProps<PageProps & RoutesFinderProps>;