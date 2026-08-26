import Tiempo from "@/features/home/components/LineaTiempo";
import Portada from "@/features/home/components/Portada";
import Proyectos from "@/features/home/components/Proyectos";
import SobreMi from "@/features/home/components/SobreMi";
import Stack from "@/features/home/components/Stack";


export default function Home() {
  return (
    <div className="">
     <div>
      <Portada/>
     </div>
     <div>
      <SobreMi/>
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
