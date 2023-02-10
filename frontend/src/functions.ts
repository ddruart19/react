import moment from "moment"

export const showFullDate = (date : Date) => {
    return (moment(date)).format('HH:mm DD-MM-YY');
}

export const showDate = (date : Date) => {
    return (moment(date)).format('DD-MM-YY');
}

export const showTime = (date : Date) => {
    return (moment(date)).format('HH:mm');
}

export const formatDate = (date : Date) => {
    return (moment(date)).format('yy-MM-dd');
}
