import { LosRemesSector } from "@/types/los-remes-sectors";
import { Carousel } from "antd";
import { getSectorRoutesCards } from "./helpers";

export type RoutesFinderProps = {
  sectors: LosRemesSector[];
};

export function RouteSearchResults({ sectors: sectorsRoutes }: RoutesFinderProps) {
  // TODO Possibly sort by grade ascendingly if the gradeRange property is set
  return (
    <>
      <Carousel dotPosition="bottom"
        style={{width: "100%", overflowX: "hidden"}}>
        {
          sectorsRoutes.map(sector => getSectorRoutesCards(sector))
        }
      </Carousel>
    </>
  );
}