  import { useRouter } from "next/router";

  export default function Home() {
    const router = useRouter();
    return (
      <section className="w-Home">
        <div className="container">
          <h1>Página no encontrada</h1>
          <button onClick={() => router.push("/")}>Regresar al Inicio</button>
        </div>
      </section>
    );
  }
