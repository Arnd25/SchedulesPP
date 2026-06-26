import { Group, Schedule } from '../models'
import { TIME_SLOTS } from '../constants/schedule.constants'
import { getScheduleForCell } from '../utils/schedule.utils'

interface Props {
    groups: Group[]
    daySchedules: Schedule[]
}

export default function ScheduleGrid({ groups, daySchedules }: Props) {
    return (
        <div className=" overflow-auto rounded-lg">
            <table className="w-full" >
                <thead className=''>
                    <tr className=''>
                        <th className="bg-primary text-white p-4 text-center font-bold min-w-5 border border-primary sticky left-0 z-10">
                            Время
                        </th>
                        {groups.map((group) => (
                            <th
                                key={group.id}
                                className="bg-primary text-white p-4 text-center font-bold border border-primary min-w-50">
                                <div className="text-base">{group.name}</div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {TIME_SLOTS.map((slot) => (
                        <tr key={slot.lessonNumber}>
                            <td className="bg-white p-4 text-center font-semibold text-black border border-primary">
                                {slot.time}
                            </td>
                            {groups.map((group) => {
                                const schedule = getScheduleForCell(
                                    daySchedules,
                                    slot.lessonNumber,
                                    group.id
                                )
                                return (
                                    <td
                                        key={`${slot.lessonNumber}-${group.id}`}
                                        className={`p-2 border border-primary  ${schedule ? 'bg-card' : 'bg-white'}`}>
                                        {schedule ? (
                                            <div className="space-y-2">
                                                <p className="font-bold text-xl text-gray-800">
                                                    {schedule.pair.discipline.name}
                                                </p>
                                                <p className="text-sm text-black capitalize">
                                                    Преподаватель:  <strong>{schedule.pair.teacher.name}</strong>
                                                </p>
                                                <p className="text-sm text-black">
                                                    Аудитория <strong>{schedule.pair.audience}</strong>
                                                </p>
                                            </div>
                                        ) : (
                                            <p className="text-center text-gray-500 text-sm italic">
                                                Занятий нет
                                            </p>
                                        )}
                                    </td>
                                )
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
