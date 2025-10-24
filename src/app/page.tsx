import Tiempo from "@/features/home/components/LineaTiempo";
import Portada from "@/features/home/components/Portada";
import Proyectos from "@/features/home/components/Proyectos";
import Stack from "@/features/home/components/Stack";


export default function Home() {
  return (
    <div className="">
     <div>
      <Portada/>
     </div>
     <div>
      <Stack/>
     </div>
     <div>
      <Tiempo/>
     </div>
     <div>
      <Proyectos/>
     </div>
    </div>
  );
}
