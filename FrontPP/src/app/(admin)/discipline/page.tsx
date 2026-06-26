import { api } from "@/config/http/server.http";
import Disciplines from "@/modules/disciplines";
import { API_ROUTES } from "@/shared/routes/api.route";

export default async function Home() {
  const result = (await api.get(API_ROUTES.disciplines.ALL())).data
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Disciplines disciplines={result} />
    </div>
  );
}
