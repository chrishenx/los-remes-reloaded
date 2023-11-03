import { ClimbingGradeRange, LosRemesSector } from "@/types/los-remes-sectors";
import { Carousel } from "antd";
import { findSectorRoutes } from "./SectorRoutesFinder";

export type RoutesFinderProps = {
  sectors: LosRemesSector[];
  gradeRange?: ClimbingGradeRange;
};

export function RoutesFinder({ sectors, gradeRange }: RoutesFinderProps) {
  // TODO Possibly sort by grade ascendingly if the gradeRange property is set
  return (
    <>
      <Carousel dotPosition="bottom">
        {
          sectors.map(sector => findSectorRoutes({ sector, gradeRange }))
        }
      </Carousel>
    </>
  );
}