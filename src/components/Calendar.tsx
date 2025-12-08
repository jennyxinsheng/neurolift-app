import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  ScrollView,
} from 'react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS } from '../utils/theme';

interface CalendarProps {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  markedDates?: { [dateString: string]: { completed?: boolean; scheduled?: boolean } };
  minDate?: Date;
  maxDate?: Date;
  style?: ViewStyle;
}

const DAYS_OF_WEEK = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onDateSelect,
  markedDates = {},
  minDate,
  maxDate,
  style,
}) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());

  const formatDateString = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay();
  };

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const days: (Date | null)[] = [];
    
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  }, [currentMonth]);

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date): boolean => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isDisabled = (date: Date): boolean => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goToPreviousMonth} style={styles.navButton}>
          <Text style={styles.navButtonText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.monthTitle}>
          {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </Text>
        <TouchableOpacity onPress={goToNextMonth} style={styles.navButton}>
          <Text style={styles.navButtonText}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.weekDays}>
        {DAYS_OF_WEEK.map((day, index) => (
          <View key={index} style={styles.weekDay}>
            <Text style={styles.weekDayText}>{day}</Text>
          </View>
        ))}
      </View>

      <View style={styles.daysGrid}>
        {calendarDays.map((date, index) => {
          if (!date) {
            return <View key={index} style={styles.dayCell} />;
          }

          const dateString = formatDateString(date);
          const marking = markedDates[dateString];
          const today = isToday(date);
          const selected = isSelected(date);
          const disabled = isDisabled(date);

          return (
            <TouchableOpacity
              key={index}
              style={styles.dayCell}
              onPress={() => !disabled && onDateSelect?.(date)}
              disabled={disabled}
            >
              <View
                style={[
                  styles.day,
                  today && styles.dayToday,
                  selected && styles.daySelected,
                  marking?.completed && styles.dayCompleted,
                  marking?.scheduled && !marking?.completed && styles.dayScheduled,
                ]}
              >
                <Text
                  style={[
                    styles.dayText,
                    today && styles.dayTextToday,
                    selected && styles.dayTextSelected,
                    marking?.completed && styles.dayTextCompleted,
                    disabled && styles.dayTextDisabled,
                  ]}
                >
                  {date.getDate()}
                </Text>
              </View>
              {marking?.scheduled && !marking?.completed && (
                <View style={styles.scheduledDot} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

interface WeekViewProps {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  markedDates?: { [dateString: string]: { completed?: boolean; scheduled?: boolean } };
  style?: ViewStyle;
}

export const WeekView: React.FC<WeekViewProps> = ({
  selectedDate = new Date(),
  onDateSelect,
  markedDates = {},
  style,
}) => {
  const getWeekDays = (): Date[] => {
    const start = new Date(selectedDate);
    const day = start.getDay();
    start.setDate(start.getDate() - day);
    
    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const formatDateString = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date): boolean => {
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const weekDays = getWeekDays();

  return (
    <View style={[styles.weekViewContainer, style]}>
      {weekDays.map((date, index) => {
        const dateString = formatDateString(date);
        const marking = markedDates[dateString];
        const today = isToday(date);
        const selected = isSelected(date);

        return (
          <TouchableOpacity
            key={index}
            style={styles.weekViewDay}
            onPress={() => onDateSelect?.(date)}
          >
            <Text style={styles.weekViewDayName}>
              {DAYS_OF_WEEK[date.getDay()]}
            </Text>
            <View
              style={[
                styles.weekViewDayNumber,
                today && styles.weekViewDayToday,
                selected && styles.weekViewDaySelected,
                marking?.completed && styles.weekViewDayCompleted,
              ]}
            >
              <Text
                style={[
                  styles.weekViewDayNumberText,
                  (today || selected || marking?.completed) &&
                    styles.weekViewDayNumberTextActive,
                ]}
              >
                {date.getDate()}
              </Text>
            </View>
            {marking?.scheduled && !marking?.completed && (
              <View style={styles.weekViewScheduledDot} />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  navButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 28,
    color: COLORS.black,
    fontWeight: FONT_WEIGHT.medium,
  },
  monthTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.black,
  },
  weekDays: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
  },
  weekDay: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.xs,
  },
  weekDayText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.gray500,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  day: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
  },
  dayToday: {
    borderWidth: 1,
    borderColor: COLORS.black,
  },
  daySelected: {
    backgroundColor: COLORS.black,
  },
  dayCompleted: {
    backgroundColor: COLORS.gray800,
  },
  dayScheduled: {
    backgroundColor: COLORS.gray100,
  },
  dayText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.black,
  },
  dayTextToday: {
    fontWeight: FONT_WEIGHT.semibold,
  },
  dayTextSelected: {
    color: COLORS.white,
    fontWeight: FONT_WEIGHT.semibold,
  },
  dayTextCompleted: {
    color: COLORS.white,
  },
  dayTextDisabled: {
    color: COLORS.gray300,
  },
  scheduledDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.black,
    marginTop: 2,
  },
  weekViewContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.sm,
  },
  weekViewDay: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  weekViewDayName: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray500,
    marginBottom: SPACING.xs,
  },
  weekViewDayNumber: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  weekViewDayToday: {
    borderWidth: 1,
    borderColor: COLORS.black,
  },
  weekViewDaySelected: {
    backgroundColor: COLORS.black,
  },
  weekViewDayCompleted: {
    backgroundColor: COLORS.gray800,
  },
  weekViewDayNumberText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.black,
  },
  weekViewDayNumberTextActive: {
    color: COLORS.white,
    fontWeight: FONT_WEIGHT.semibold,
  },
  weekViewScheduledDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.black,
    marginTop: 4,
  },
});
