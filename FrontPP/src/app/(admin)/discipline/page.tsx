import { api } from "@/config/http/server.http";
import Disciplines from "@/modules/disciplines";
import { API_ROUTES } from "@/shared/routes/api.route";

interface Discipline {
    id: string;
    name: string;
}

export default async function Home() {
  const result = (await api.get(API_ROUTES.disciplines.ALL())).data as Discipline[]
  return (
    <Disciplines disciplines={result} />
  );
}
