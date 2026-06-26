import { API_ROUTES } from "@/shared/routes/api.route";
import { api } from "@/config/http/server.http";
import { Discipline, Teacher } from "./models";
import TeacherList from "./ui/TeacherList";


const TeacherPage = async () => {
    const [teachersResult, disciplinesResult] = await Promise.all([
        api.get(API_ROUTES.teacher.ALL()),
        api.get(API_ROUTES.disciplines.ALL()),
    ]);

    const teachers = teachersResult.data as Teacher[];
    const disciplines = disciplinesResult.data as Discipline[];

    return (
        <div className="w-full gap-2.5 h-full">
            <div className="col-span-3 min-w-40 gap-2.5 overflow-y-auto h-full sidebar-scroll">
                <div className="flex flex-col h-full gap-2.5">
                    <TeacherList teachers={teachers} disciplines={disciplines} />
                </div>
            </div>
        </div>
    );
};

export default TeacherPage;