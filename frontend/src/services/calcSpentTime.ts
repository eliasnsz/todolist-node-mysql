import moment from "moment";

export function calcSpentTime(created_at: string) {

  const timeSpentInMs = moment(moment()).diff(moment(created_at))
  const secsSpent = Math.floor(timeSpentInMs / 1000)
  const minSpent = Math.floor(timeSpentInMs / 1000 / 60)
  const hoursSpent = Math.floor(timeSpentInMs / 1000 / (60 ** 2))
  const daySpent = Math.floor(timeSpentInMs / 1000 / (60 ** 2) / 24)
  
  if (secsSpent < 60) return `${secsSpent} segundos`
  if (minSpent < 60) return `${minSpent} minutos`
  if (hoursSpent < 24) return `${hoursSpent} horas`
  return `${daySpent} dias`
  
}