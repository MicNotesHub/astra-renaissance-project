import { useEffect, useRef, useState } from "react";
import { FileText } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";

// Configure worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

interface PdfThumbnailProps {
  fileUrl: string;
  className?: string;
}

export const PdfThumbnail = ({ fileUrl, className = "" }: PdfThumbnailProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const renderPage = async () => {
      try {
        const pdf = await pdfjsLib.getDocument(fileUrl).promise;
        if (cancelled) return;
        const page = await pdf.getPage(1);
        if (cancelled) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const containerWidth = canvas.parentElement?.clientWidth || 280;
        const viewport = page.getViewport({ scale: 1 });
        const scale = (containerWidth * 2) / viewport.width; // 2x for retina
        const scaledViewport = page.getViewport({ scale });

        canvas.width = scaledViewport.width;
        canvas.height = scaledViewport.height;
        canvas.style.width = `${scaledViewport.width / 2}px`;
        canvas.style.height = `${scaledViewport.height / 2}px`;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        await page.render({ canvasContext: ctx, viewport: scaledViewport }).promise;
        if (!cancelled) setLoading(false);
      } catch {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      }
    };

    renderPage();
    return () => { cancelled = true; };
  }, [fileUrl]);

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-muted/30 ${className}`}>
        <FileText className="w-12 h-12 text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-white ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20 animate-pulse">
          <FileText className="w-10 h-10 text-muted-foreground/50" />
        </div>
      )}
      <canvas ref={canvasRef} className="w-full object-cover" />
    </div>
  );
};
