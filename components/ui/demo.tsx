import MountainScene from "./mountain-scene"

export default function MountainSceneDemo() {
    return (
        <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
            <div className="space-y-2">
                <h2 className="text-lg font-semibold tracking-tight text-white">Topographic Visualization</h2>
                <p className="text-sm text-zinc-400">
                    Real-time WebGL rendering of budget terrain data.
                </p>
            </div>
            <div className="h-[500px] w-full shadow-2xl shadow-cyan-500/10 rounded-xl overflow-hidden">
                <MountainScene />
            </div>
        </div>
    )
}
