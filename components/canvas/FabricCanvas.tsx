"use client";

import { useEffect, useRef } from "react";
import * as fabric from "fabric";
import { useEditorStore } from "@/store/editorStore";

export default function FabricCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (initializedRef.current) return; // ✅ prevents double init

    initializedRef.current = true;

    const canvas = new fabric.Canvas(canvasRef.current, {
      backgroundColor: "#ffffff",
      selection: true,
      preserveObjectStacking: true,
    });

    fabricRef.current = canvas;
    useEditorStore.getState().setCanvas(canvas);

    resizeCanvas(canvas);

    const onSelect = (e: fabric.TEvent) => {
      const selected = (e as any).selected?.[0] ?? null;
      useEditorStore.getState().setSelectedObject(selected);
    };
    
    canvas.on("selection:created", onSelect as any);
    canvas.on("selection:updated", onSelect as any);
    canvas.on("selection:cleared", (() => {
      useEditorStore.getState().setSelectedObject(null);
    }) as any);

    const handleResize = () => resizeCanvas(canvas);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      // ✅ DO NOT dispose during Fast Refresh
      canvas.off();
      canvas.clear();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
}

function resizeCanvas(canvas: fabric.Canvas) {
  const parent = canvas.getElement().parentElement;
  if (!parent) return;

  canvas.setDimensions({
    width: parent.clientWidth,
    height: parent.clientHeight,
  });

  canvas.renderAll();
}
