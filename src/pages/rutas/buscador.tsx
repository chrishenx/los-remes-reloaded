import { RouteSearchResults, RoutesFinderProps } from "@/components/RouteSearchResults";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { PageProps } from "@/types/pageProps";
import { findSectorRoutes, parseRoutesSearchParams, getAllSectors } from "@/lib/climbing-utils";
import { ParsedUrlQuery } from "querystring";


export function RoutesFinderPage({ sectors } : InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <RouteSearchResults sectors={sectors} />
  );
}

export default RoutesFinderPage;

export const getServerSideProps = (async (context) => {
  const { gradeRange, routesCount, sectors } = parseAndFilterRoutesSearchParams(context.query);
  const pageName = gradeRange?.min.raw === gradeRange?.max.raw ? `${routesCount} rutas de ${gradeRange?.min.raw}` : `${routesCount} rutas entre ${gradeRange?.min.raw} y ${gradeRange?.max.raw}`;

  return {
    props: {
      name: pageName,
      sectors,
    },
  };
}) satisfies GetServerSideProps<PageProps & RoutesFinderProps>;

function parseAndFilterRoutesSearchParams(query: ParsedUrlQuery) {
  const { sectors: searchedSectors, gradeRange } = parseRoutesSearchParams(query);
  const filteredSectors = searchedSectors.map(sector => (
    {...sector, routes: findSectorRoutes({ sector, gradeRange }) }
  ));

  const sectorsToUse = filteredSectors.length === 0 ? getAllSectors() : filteredSectors;

  const routesCount = sectorsToUse.reduce((acc, sector) => acc + sector.routes.length, 0);

  return {
    gradeRange,
    sectors: sectorsToUse,
    routesCount,
  };
}
