import React from 'react'
import { Pair } from '../models'

interface PairCardProps {
    data: Pair;
}


export function PairCard({ data }: PairCardProps) {
  return (
    <div className="bg-card p-2 px-5 rounded-lg">
      <h3 className="font-semibold text-2xl">{data.discipline.name}</h3>
      <div className="flex flex-col gap-1 text-sm text-gray-600">
        <p>{data.teacher.name}</p>
        <p>{data.group.name}</p>
        <p>Аудитория: {data.audience}</p>
        <p>Осталось часов: {data.remaingHours} из {data.hours}</p>
      </div>
    </div>
  );
}
