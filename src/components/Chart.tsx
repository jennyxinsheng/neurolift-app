import React from 'react';
import { View, Text, StyleSheet, ViewStyle, Dimensions } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS } from '../utils/theme';
import { DomainKey, DOMAINS } from '../utils/theme';

interface BarChartProps {
  data: { label: string; value: number; maxValue?: number }[];
  height?: number;
  showValues?: boolean;
  style?: ViewStyle;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  height = 150,
  showValues = true,
  style,
}) => {
  const maxValue = Math.max(...data.map((d) => d.maxValue || d.value));

  return (
    <View style={[styles.barChartContainer, style]}>
      <View style={[styles.barsContainer, { height }]}>
        {data.map((item, index) => {
          const barHeight = maxValue > 0 ? (item.value / maxValue) * height : 0;
          return (
            <View key={index} style={styles.barWrapper}>
              <View style={[styles.bar, { height }]}>
                <View style={[styles.barFill, { height: barHeight }]} />
              </View>
              {showValues && (
                <Text style={styles.barValue}>{item.value}</Text>
              )}
              <Text style={styles.barLabel} numberOfLines={1}>
                {item.label}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

interface PieChartData {
  value: number;
  label: string;
}

interface PieChartProps {
  data: PieChartData[];
  size?: number;
  showLegend?: boolean;
  style?: ViewStyle;
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
  size = 160,
  showLegend = true,
  style,
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const grayShades = [
    COLORS.black,
    COLORS.gray700,
    COLORS.gray500,
    COLORS.gray400,
    COLORS.gray300,
  ];

  let cumulativePercent = 0;
  const segments = data.map((item, index) => {
    const percent = total > 0 ? (item.value / total) * 100 : 0;
    const startAngle = cumulativePercent * 3.6;
    cumulativePercent += percent;
    return {
      ...item,
      percent,
      startAngle,
      color: grayShades[index % grayShades.length],
    };
  });

  return (
    <View style={[styles.pieContainer, style]}>
      <View style={[styles.pie, { width: size, height: size }]}>
        <View style={[styles.pieInner, { width: size * 0.6, height: size * 0.6 }]} />
      </View>
      {showLegend && (
        <View style={styles.legend}>
          {segments.map((segment, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: segment.color }]} />
              <Text style={styles.legendLabel} numberOfLines={1}>
                {segment.label}
              </Text>
              <Text style={styles.legendValue}>{Math.round(segment.percent)}%</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

interface DomainChartProps {
  data: Partial<Record<DomainKey, number>>;
  size?: number;
  style?: ViewStyle;
}

export const DomainChart: React.FC<DomainChartProps> = ({
  data,
  size = 200,
  style,
}) => {
  const domainKeys = Object.keys(DOMAINS) as DomainKey[];
  const maxValue = Math.max(...Object.values(data).map(v => v || 0), 1);
  const center = size / 2;
  const maxRadius = (size - 40) / 2;

  return (
    <View style={[styles.domainChartContainer, { width: size, height: size }, style]}>
      {[0.25, 0.5, 0.75, 1].map((scale, index) => (
        <View
          key={index}
          style={[
            styles.radarCircle,
            {
              width: maxRadius * 2 * scale,
              height: maxRadius * 2 * scale,
              borderRadius: maxRadius * scale,
              left: center - maxRadius * scale,
              top: center - maxRadius * scale,
            },
          ]}
        />
      ))}
      
      {domainKeys.map((key, index) => {
        const angle = (index / domainKeys.length) * 2 * Math.PI - Math.PI / 2;
        const value = data[key] || 0;
        const radius = (value / maxValue) * maxRadius;
        const x = center + Math.cos(angle) * radius - 4;
        const y = center + Math.sin(angle) * radius - 4;
        const labelX = center + Math.cos(angle) * (maxRadius + 20);
        const labelY = center + Math.sin(angle) * (maxRadius + 20);

        return (
          <React.Fragment key={key}>
            <View style={[styles.domainPoint, { left: x, top: y }]} />
            <Text
              style={[
                styles.domainLabel,
                {
                  left: labelX - 30,
                  top: labelY - 8,
                  textAlign: 'center',
                },
              ]}
              numberOfLines={2}
            >
              {DOMAINS[key].split(' ')[0]}
            </Text>
          </React.Fragment>
        );
      })}
    </View>
  );
};

interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  trend?: 'up' | 'down' | 'neutral';
  style?: ViewStyle;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subValue,
  trend,
  style,
}) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return '↑';
      case 'down':
        return '↓';
      default:
        return '';
    }
  };

  return (
    <View style={[styles.statCard, style]}>
      <Text style={styles.statLabel}>{label}</Text>
      <View style={styles.statValueRow}>
        <Text style={styles.statValue}>{value}</Text>
        {trend && (
          <Text style={[styles.statTrend, trend === 'up' && styles.trendUp]}>
            {getTrendIcon()}
          </Text>
        )}
      </View>
      {subValue && <Text style={styles.statSubValue}>{subValue}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  barChartContainer: {
    width: '100%',
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
  barWrapper: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: SPACING.xs,
  },
  bar: {
    width: '100%',
    maxWidth: 40,
    backgroundColor: COLORS.gray100,
    borderRadius: BORDER_RADIUS.sm,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  barFill: {
    width: '100%',
    backgroundColor: COLORS.black,
    borderRadius: BORDER_RADIUS.sm,
  },
  barValue: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.black,
    marginTop: SPACING.xs,
  },
  barLabel: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray500,
    marginTop: 2,
    textAlign: 'center',
  },
  pieContainer: {
    alignItems: 'center',
  },
  pie: {
    backgroundColor: COLORS.gray200,
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pieInner: {
    backgroundColor: COLORS.white,
    borderRadius: 1000,
    position: 'absolute',
  },
  legend: {
    marginTop: SPACING.md,
    width: '100%',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: SPACING.sm,
  },
  legendLabel: {
    flex: 1,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray600,
  },
  legendValue: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.black,
  },
  domainChartContainer: {
    position: 'relative',
  },
  radarCircle: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderStyle: 'dashed',
  },
  domainPoint: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.black,
  },
  domainLabel: {
    position: 'absolute',
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray600,
    width: 60,
  },
  statCard: {
    backgroundColor: COLORS.gray100,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
  },
  statLabel: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
    marginBottom: SPACING.xs,
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  statValue: {
    fontSize: FONT_SIZE.xxxl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.black,
  },
  statTrend: {
    fontSize: FONT_SIZE.lg,
    marginLeft: SPACING.xs,
    color: COLORS.gray500,
  },
  trendUp: {
    color: COLORS.black,
  },
  statSubValue: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
    marginTop: SPACING.xs,
  },
});
