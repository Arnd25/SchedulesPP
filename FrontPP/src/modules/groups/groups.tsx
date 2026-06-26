import { SearchIcon } from "@/components/icons/searchIcon";
import { Button } from "@/components/ui/button";
import { api } from "@/config/http/server.http";
import { API_ROUTES } from "@/shared/routes/api.route";

import { XIcon } from "lucide-react";
import { AddGroupForm } from "./ui/AddGroupForm";
import { DeleteGroup } from "./actions/DeleteGroup";
import GroupList from "./ui/groupList";

const Group = async () => {
    const result = (await api.get(API_ROUTES.group.ALL())).data
    if (!result || !Array.isArray(result)) {
        return (
            <div className="">Нет данных</div>
        );
    }

    return (
        <div className="w-full grid grid-cols-4 gap-2.5 h-full">
            <div className="col-span-3 min-w-40 gap-2.5 overflow-y-auto sidebar-scroll">
                <GroupList groups={result}/>
            </div>
            <div className="col-span-1 sticky top-0 self-start h-full">
                <AddGroupForm />
            </div>
        </div>
    );
};

export default Group;