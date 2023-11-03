import sectors from "@/lib/los-remes.json";
import { Button, Flex, Select, SelectProps, Slider, Typography, theme } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";

const grades = ["8", "9+", "10-", "10+", "11-", "11+", "12-", "12+", "13-", "13+", "14-"];

function gradeIndexToGrade(gradeIndex: number | undefined) {
  return gradeIndex !== undefined ? grades[gradeIndex] : null;
}

export function RoutesFinder() {
  const {
    token: { colorBgElevated },
  } = theme.useToken();

  const router = useRouter();

  const options: SelectProps['options'] = sectors.map(sector => ({ label: sector.name, value: sector.id }));
  const [selectedSectorIds, setSelectedSectorIds] = useState<string[]>([]);
  const [selectedGradeRange, setSelectedGradeRange] = useState<[number, number]>([0, grades.length - 1]);

  const mappedGradeRange = selectedGradeRange.map(gradeIndexToGrade);
  const isAllGradesSelected = selectedGradeRange[0] === 0 && selectedGradeRange[1] === grades.length - 1;

  const handleSectorSelectorChange = (value: string[]) => {
    setSelectedSectorIds(value);
  };

  const handleRouteSearch = () => {
    router.push({
      pathname: '/rutas/buscador',
      query: {
        sector_ids: selectedSectorIds,
        min_grade: mappedGradeRange[0],
        max_grade: mappedGradeRange[1]
      }
    });
  };

  return (
    <Flex vertical style={{ padding: 8, background: colorBgElevated }} gap={12}>
      <Typography.Text type="secondary">Buscar rutas</Typography.Text>
      <Select
        mode="multiple"
        allowClear
        size="large"
        style={{ width: '100%' }}
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
        <Slider
          min={0}
          max={grades.length - 1}
          range
          defaultValue={[0, grades.length - 1]}
          value={selectedGradeRange}
          onChange={(value: number[]) => setSelectedGradeRange(value as [number, number])}
          tooltip={{ formatter: gradeIndexToGrade }}
          style={{ overflow: "visible" }}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <Button type="primary" onClick={handleRouteSearch}>Buscar</Button>
      </div>
    </Flex>
  );
}