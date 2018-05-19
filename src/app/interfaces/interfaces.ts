/* Weahter */

export interface Coords {
    latitude: number,
    longitude: number
}

export interface Weather {
    current: any,
    week: any
}

export interface WeekWeatherObj {
    date: Date,
    temp: number,
    clouds: string
}

export interface City {
    name: string
}
