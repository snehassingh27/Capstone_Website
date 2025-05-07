import { ProjectPilotsLogo } from "./ui/ProjectPilotsLogo";

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <ProjectPilotsLogo className="h-8 w-8" />
      <div>
        <h1 className="font-bold text-xl">PROJECT PILOTS</h1>
        <p className="text-xs text-gray-300">Where Innovation Takes Off.</p>
      </div>
    </div>
  );
}
