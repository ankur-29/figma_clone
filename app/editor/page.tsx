"use client";
import { useEditorStore } from "@/store/editorStore";
import FabricCanvas from "@/components/canvas/FabricCanvas";
import Toolbar from "@/ui/Toolbar";
import PropertiesPanel from "@/components/panels/PropertiesPanel";

export default function EditorPage() {
    const selectedObject = useEditorStore((s) => s.selectedObject);
    console.log("Selected Object:", selectedObject);

    return (
      <div className="h-screen flex flex-col">
        {/* Header */}
        <header className="h-12 border-b px-4 flex items-center font-semibold">
          DesignKit
        </header>
        {/* Main Editor */}
        <div className="flex flex-1 overflow-hidden">
            {/* Layers */}
            <aside className="w-60 border-r p-2">
                Layers
            </aside>
            
            {/* Canvas Area */}
            <main className="flex-1 relative bg-gray-100">
                <FabricCanvas />
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
                    <Toolbar />
                </div>
            </main>
            
            {/* Properties */}
            {/* <aside className="w-72 border-l p-2">Properties</aside> */}
            <PropertiesPanel />
        </div>
      </div>
    );

}
