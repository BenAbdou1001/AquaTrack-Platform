import Image from "next/image";
import DashComp from "./components/dashboard/DashComp";
import { api } from "./data";

export default async function Home() {

  const response = await fetch(`${api}/api/sensors/filter`, { cache: 'no-store' });
  const data = await response.json()
  console.log(data)

  return (
    <div>
      <DashComp data={data}/>
    </div>
  );
}
