import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Polygon, Circle, Line, Text as SvgText, G } from 'react-native-svg';
import { COLORS } from '../utils/theme';

interface RadarChartProps {
  data: {
    label: string;
    value: number; // 0-100
  }[];
  size?: number;
  fillColor?: string;
  strokeColor?: string;
  backgroundColor?: string;
}

export default function RadarChart({
  data,
  size = 200,
  fillColor = COLORS.black,
  strokeColor = COLORS.gray400,
  backgroundColor = COLORS.gray100,
}: RadarChartProps) {
  const center = size / 2;
  const radius = size * 0.35;
  const angleStep = (2 * Math.PI) / data.length;

  // Calculate points for the data polygon
  const dataPoints = data.map((item, index) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = (item.value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  });

  const dataPointsString = dataPoints
    .map((point) => `${point.x},${point.y}`)
    .join(' ');

  // Generate grid levels (background polygons)
  const gridLevels = [20, 40, 60, 80, 100];
  const gridPolygons = gridLevels.map((level) => {
    const r = (level / 100) * radius;
    const points = data.map((_, index) => {
      const angle = index * angleStep - Math.PI / 2;
      return {
        x: center + r * Math.cos(angle),
        y: center + r * Math.sin(angle),
      };
    });
    return points.map((p) => `${p.x},${p.y}`).join(' ');
  });

  // Generate axis lines
  const axisLines = data.map((_, index) => {
    const angle = index * angleStep - Math.PI / 2;
    return {
      x1: center,
      y1: center,
      x2: center + radius * Math.cos(angle),
      y2: center + radius * Math.sin(angle),
    };
  });

  // Generate label positions
  const labels = data.map((item, index) => {
    const angle = index * angleStep - Math.PI / 2;
    const labelRadius = radius + 25;
    return {
      x: center + labelRadius * Math.cos(angle),
      y: center + labelRadius * Math.sin(angle),
      text: item.label,
      value: item.value,
    };
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <G>
          {/* Grid polygons */}
          {gridPolygons.map((polygon, index) => (
            <Polygon
              key={`grid-${index}`}
              points={polygon}
              fill="none"
              stroke={COLORS.gray300}
              strokeWidth="1"
              strokeOpacity={0.3}
            />
          ))}

          {/* Axis lines */}
          {axisLines.map((line, index) => (
            <Line
              key={`axis-${index}`}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={COLORS.gray300}
              strokeWidth="1"
              strokeOpacity={0.3}
            />
          ))}

          {/* Data polygon */}
          <Polygon
            points={dataPointsString}
            fill={fillColor}
            fillOpacity={0.2}
            stroke={fillColor}
            strokeWidth="2"
          />

          {/* Data points */}
          {dataPoints.map((point, index) => (
            <Circle
              key={`point-${index}`}
              cx={point.x}
              cy={point.y}
              r="4"
              fill={fillColor}
            />
          ))}

          {/* Labels */}
          {labels.map((label, index) => (
            <G key={`label-${index}`}>
              <SvgText
                x={label.x}
                y={label.y - 8}
                fontSize="11"
                fontWeight="500"
                fill={COLORS.gray700}
                textAnchor="middle"
              >
                {label.text}
              </SvgText>
              <SvgText
                x={label.x}
                y={label.y + 6}
                fontSize="10"
                fill={COLORS.gray500}
                textAnchor="middle"
              >
                {label.value}%
              </SvgText>
            </G>
          ))}
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});