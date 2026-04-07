import { useRouter } from "next/router"

export default function ClientProjectsPage() {

    const router = useRouter();

    function loadProject(){
        router.push('/clients/max/123');
    }

    return (
        <div>
            <h1>Client Projects Page</h1>
            <button onClick={loadProject}>Load Project A</button>
        </div>
    )
}