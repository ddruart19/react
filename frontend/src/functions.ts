import moment from "moment"
import { useQuery } from "react-query";
import { fetchTasks, isLoggedIn } from "./APICall";
import { ITaskDB } from "./Interfaces";

export const showFullDate = (date : Date) => {
    return (moment(date)).format('DD MMMM YY');
}

export const showDate = (date : Date) => {
    return (moment(date)).format('DD-MM-YY');
}

export const showTime = (date : Date) => {
    return (moment(date)).format('HH:mm');
}

export const formatDate = (date : Date) => {
    return (moment(date)).format('yy-MM-DD');
}

export const useFetchAllTasks = () => {
    return useQuery<ITaskDB[], Error>('todoList', fetchTasks);
  }

export const isConnected = () => {
    return isLoggedIn
}