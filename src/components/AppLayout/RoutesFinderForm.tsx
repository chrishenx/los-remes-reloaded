import { parseRoutesSearchParams } from "@/lib/climbing-utils";
import sectors from "@/lib/los-remes.json";
import { Button, Flex, Select, SelectProps, Slider, Typography, theme } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const gradesCatalog = ["8",
  "9+",
  "10-",
  "10+",
  "11-",
  "11+",
  "12-",
  "12+",
  "13-",
  "13+",
  "14-"];
const defaultGradeMinIndex = 0;
const defaultGradeMaxIndex = gradesCatalog.length - 1;

// TODO Handle grades with letters using the refactored class ClimbingGrade from src/lib/climbing-utils.tsx
function gradeToGradeIndex(grade: string, defaultValue: number) {
  const foundIndex = gradesCatalog.indexOf(grade);
  return foundIndex >= 0 ? foundIndex : defaultValue;
}

function gradeIndexToGrade(gradeIndex: number | undefined) {
  return gradeIndex !== undefined ? gradesCatalog[gradeIndex] : null;
}

export type RoutesFinderProps = {
  onSearchClicked?: () => void;
};

export function RoutesFinderForm({ onSearchClicked }: RoutesFinderProps) {
  const {
    token: { colorBgElevated },
  } = theme.useToken();

  const router = useRouter();

  const options: SelectProps["options"] = sectors.map(sector => ({ label: sector.name, value: sector.id }));
  const [selectedSectorIds, setSelectedSectorIds] = useState<string[]>([]);
  const [selectedGradeRange, setSelectedGradeRange] = useState<[number, number]>([defaultGradeMinIndex, defaultGradeMaxIndex]);

  useEffect(() => {
    const parsedSearchParams = parseRoutesSearchParams(router.query);
    const sectorIds = parsedSearchParams.sectors.map(sector => sector.id);
    const gradeRangeMinIndex = parsedSearchParams.gradeRange?.min ? 
      gradeToGradeIndex(parsedSearchParams.gradeRange.min.raw, defaultGradeMinIndex) : 
      defaultGradeMinIndex;
    const gradeRangeMaxIndex = parsedSearchParams.gradeRange?.max ? 
      gradeToGradeIndex(parsedSearchParams.gradeRange.max.raw, defaultGradeMaxIndex) : 
      defaultGradeMaxIndex;

    setSelectedSectorIds(sectorIds);
    setSelectedGradeRange([gradeRangeMinIndex, gradeRangeMaxIndex]);
    
  }, [router.query,
    router.query.sector_ids,
    router.query.min_grade,
    router.query.max_grade]);

  const mappedGradeRange = selectedGradeRange.map(gradeIndexToGrade);
  const isAllGradesSelected = selectedGradeRange[0] === 0 && selectedGradeRange[1] === gradesCatalog.length - 1;

  const handleSectorSelectorChange = (value: string[]) => {
    setSelectedSectorIds(value);
  };

  const handleRouteSearch = () => {
    router.push({
      pathname: "/rutas/buscador",
      query: {
        sector_ids: selectedSectorIds,
        min_grade: mappedGradeRange[0],
        max_grade: mappedGradeRange[1]
      }
    });
    onSearchClicked?.();
  };

  return (
    <Flex vertical
      style={{ padding: 8, background: colorBgElevated }}
      gap={12}>
      <Typography.Text type="secondary">Buscar rutas en</Typography.Text>
      <Select
        mode="multiple"
        allowClear
        size="large"
        style={{ width: "100%" }}
        placeholder="Todos los sectores"
        options={options}
        value={selectedSectorIds}
        onChange={handleSectorSelectorChange}
        maxTagTextLength={5}
        maxTagCount={4}
      />
      <div>
        <Typography.Text>
          {
            isAllGradesSelected ? 
              "Todos los grados" :
              <>Grado entre <strong>5.{mappedGradeRange[0]}</strong> y <strong>5.{mappedGradeRange[1]}</strong></>
          }
        </Typography.Text>
        <div style={{ paddingLeft: 20, paddingRight: 10 }}>
          <Slider
            min={0}
            max={gradesCatalog.length - 1}
            range
            defaultValue={[0, gradesCatalog.length - 1]}
            value={selectedGradeRange}
            onChange={(value: number[]) => setSelectedGradeRange(value as [number, number])}
            tooltip={{ formatter: gradeIndexToGrade }}
          />
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Button type="primary"
          onClick={handleRouteSearch}>Buscar</Button>
      </div>
    </Flex>
  );
}