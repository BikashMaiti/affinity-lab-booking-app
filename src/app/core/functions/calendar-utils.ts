// ✅ Common Reusable Calendar Utilities for Angular + PrimeNG p-calendar
type DateInput = string | number | Date | null | undefined;
export class CalendarUtils {
    //onvert any input to valid Date
    static toDate(value: DateInput): Date | null {
        if (!value) return null;
        // Already a Date
        if (value instanceof Date && !isNaN(value.getTime())) {
            return value;
        }
        // String / number convert
        const responseDate = new Date(value);
        // Invalid date check
        return isNaN(responseDate.getTime()) ? null : responseDate;
    }

    //Convert string → Date safely with custom formats
    static parseDate(dateStr: string, format: 'dd-mm-yyyy' | 'yyyy-mm-dd' = 'yyyy-mm-dd'): Date | null {
        if (!dateStr) return null;
        let day, month, year;
        if (format === 'dd-mm-yyyy') {
            [day, month, year] = dateStr.split(/[-/]/).map(Number);
        } else {
            [year, month, day] = dateStr.split(/[-/]/).map(Number);
        }
        const responseDate = new Date(year, month - 1, day);
        return isNaN(responseDate.getTime()) ? null : responseDate;
    }

    //Format date → string
    static format(date: DateInput, format: 'dd-mm-yyyy' | 'yyyy-mm-dd' = 'dd-mm-yyyy'): string {
        const responseDate = this.toDate(date);
        if (!responseDate) return '';
        const dd = String(responseDate.getDate()).padStart(2, '0');
        const mm = String(responseDate.getMonth() + 1).padStart(2, '0');
        const yyyy = responseDate.getFullYear();
        return format === 'dd-mm-yyyy'
            ? `${dd}-${mm}-${yyyy}`
            : `${yyyy}-${mm}-${dd}`;
    }

    //Add days to date
    static addDays(date: DateInput, days: number): Date {
        const responseDate = this.toDate(date) || new Date();
        responseDate.setDate(responseDate.getDate() + days);
        return responseDate;
    }

    //Subtract days
    static subtractDays(date: DateInput, days: number): Date {
        return this.addDays(date, -days);
    }

    //Compare dates (ignoring time)
    static compare(date1: DateInput, date2: DateInput): number {
        const Date1 = this.toDate(date1);
        const Date2 = this.toDate(date2);
        if (!Date1 || !Date2) return 0;
        const responseDate1 = new Date(Date1.getFullYear(), Date1.getMonth(), Date1.getDate()).getTime();
        const responseDate2 = new Date(Date2.getFullYear(), Date2.getMonth(), Date2.getDate()).getTime();
        if (responseDate1 > responseDate2) return 1;
        if (responseDate1 < responseDate2) return -1;
        return 0;
    }

    //Check if date is between two dates
    static isBetween(date: DateInput, start: any, end: any): boolean {
        const _date = this.toDate(date);
        const _start = this.toDate(start);
        const _end = this.toDate(end);
        if (!_date || !_start || !_end) return false;
        return _date >= _start && _date <= _end;
    }

    //Disable weekends (PrimeNG p-calendar)
    static getWeekendDisabledDays(): number[] {
        return [0, 6]; // Sunday, Saturday
    }

    //Disable past dates
    static disablePastDates(): Date {
        return new Date(); // p-calendar -> [minDate]
    }

    //Disable future dates
    static disableFutureDates(): Date {
        return new Date(); // p-calendar -> [maxDate]
    }

    //Disable specific dates → p-calendar friendly
    static getDisabledDates(dates: (DateInput)[]): Date[] {
        return dates
            .map(d => this.toDate(d))
            .filter((d): d is Date => d !== null);
    }

    //Create year range dynamically (e.g., "1990:2030")
    static getYearRange(startYear: number, endYear: number): string {
        return `${startYear}:${endYear}`;
    }

    //Check valid date range (start <= end)
    static validateDateRange(start: any, end: any): boolean {
        const s = this.toDate(start);
        const e = this.toDate(end);

        if (!s || !e) return false;

        return s <= e;
    }

    //Get first day of month
    static getFirstDayOfMonth(year: number, month: number): Date {
        return new Date(year, month, 1);
    }

    //Get last day of month
    static getLastDayOfMonth(year: number, month: number): Date {
        return new Date(year, month + 1, 0);
    }
}
