import { SearchIcon } from "@/components/icons/searchIcon";
import { Button } from "@/components/ui/button";
import { api } from "@/config/http/server.http";
import { API_ROUTES } from "@/shared/routes/api.route";
import { AddGroupForm } from "./ui/form";
import PairList from "./ui/pairList";

const Pair = async () => {
    const disciplines = (await api.get(API_ROUTES.disciplines.ALL())).data
    const teacher = (await api.get(API_ROUTES.teacher.ALL())).data
    const group = (await api.get(API_ROUTES.group.ALL())).data
    const pair = (await api.get(API_ROUTES.pairs.ALL())).data


    return (
        <div className="w-full grid grid-cols-4 gap-2.5 h-full">
            <div className="col-span-3 min-w-40 gap-2.5 overflow-y-auto sidebar-scroll">
                <PairList pairs={pair} />
            </div>
            <div className="col-span-1 sticky top-0 self-start h-full">
                <AddGroupForm group={group} disciplines={disciplines} teacher={teacher} />
            </div>
        </div>
    );
};

export default Pair;