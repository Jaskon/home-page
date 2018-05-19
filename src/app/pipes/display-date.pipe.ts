import { Pipe, PipeTransform } from '@angular/core';


// For notifications (features comp)
@Pipe({
    name: 'displayDate'
})
export class DisplayDatePipe implements PipeTransform {

    transform(value: Date, args?: any): string {
        var dateStr = value.toLocaleString('ru', {month: 'long', day: 'numeric', weekday:'long', hour: '2-digit', minute: '2-digit'});
        return dateStr;
    }

}

// For weather (each day header)
@Pipe({
    name: 'displayDay'
})
export class DisplayDayPipe implements PipeTransform {

    transform(value: Date, args?: any): string {
        var dateStr = value.toLocaleString('ru', {month: 'long', day: 'numeric', weekday:'long'});
        return dateStr;
    }

}

// For weather
@Pipe({
    name: 'displayTime'
})
export class DisplayTimePipe implements PipeTransform {

    transform(value: Date, args?: any): string {
        var dateStr = value.toLocaleString('ru', {hour: '2-digit', minute: '2-digit'});
        return dateStr;
    }

}

// For header in-real-time datetime
@Pipe({
    name: 'displayDatetime'
})
export class DatetimePipe implements PipeTransform {

    transform(value: Date, args?: any): string {
        var dateStr = value.toLocaleString('ru', {month: 'long', day: 'numeric', weekday:'long', hour: '2-digit', minute: '2-digit', second: '2-digit'});
        return dateStr;
    }

}
