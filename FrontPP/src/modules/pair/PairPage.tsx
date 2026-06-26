import { api } from "@/config/http/server.http";
import { API_ROUTES } from "@/shared/routes/api.route";
import { AddGroupForm } from "./ui/form";
import PairList from "./ui/pairList";
import { Discipline, Group, Pair, Teacher } from "./models";

const PairPage = async () => {
    const disciplines = (await api.get(API_ROUTES.disciplines.ALL())).data
    const teachers = (await api.get(API_ROUTES.teacher.ALL())).data
    const groups = (await api.get(API_ROUTES.group.ALL())).data
    const pairs = (await api.get(API_ROUTES.pairs.ALL())).data


    return (
        <div className="w-full grid grid-cols-4 gap-2.5 h-full">
            <div className="col-span-3 min-w-40 gap-2.5 overflow-y-auto sidebar-scroll">
                <PairList pairs={pairs as Pair[]} />
            </div>
            <div className="col-span-1 sticky top-0 self-start h-full">
                <AddGroupForm group={groups as Group[]} disciplines={disciplines as Discipline[]} teacher={teachers as Teacher[]} />
            </div>
        </div>
    );
};

export default PairPage;