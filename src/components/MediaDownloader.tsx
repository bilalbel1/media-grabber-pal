
import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";
import { Download, Video } from "lucide-react";

type MediaFormat = "video" | "audio";
type Platform = "instagram" | "tiktok" | "telegram" | null;

const MediaDownloader = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [platform, setPlatform] = useState<Platform>(null);
  const [format, setFormat] = useState<MediaFormat>("video");
  
  const detectPlatform = (inputUrl: string): Platform => {
    if (inputUrl.includes("instagram.com")) return "instagram";
    if (inputUrl.includes("tiktok.com")) return "tiktok";
    if (inputUrl.includes("t.me") || inputUrl.includes("telegram")) return "telegram";
    return null;
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputUrl = e.target.value;
    setUrl(inputUrl);
    
    if (inputUrl.length > 5) {
      const detectedPlatform = detectPlatform(inputUrl);
      setPlatform(detectedPlatform);
    } else {
      setPlatform(null);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast.error("Por favor ingresa un enlace de video");
      return;
    }
    
    if (!platform) {
      toast.error("URL no soportada. Por favor ingresa un enlace de Instagram, TikTok o Telegram");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real application, here we would call an API to process the download
      // For now, we'll simulate the download process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success(`¡Descarga completada! ${format === "video" ? "Video" : "Audio"} descargado correctamente`);
      // In a real implementation, we would redirect to the download link or trigger the download
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Error al descargar. Por favor intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const getPlatformColor = (): string => {
    switch (platform) {
      case "instagram": return "bg-gradient-to-r from-purple-500 to-pink-500";
      case "tiktok": return "bg-gradient-to-r from-black to-gray-800";
      case "telegram": return "bg-gradient-to-r from-blue-500 to-cyan-500";
      default: return "bg-gradient-custom";
    }
  };

  const getPlatformName = (): string => {
    switch (platform) {
      case "instagram": return "Instagram";
      case "tiktok": return "TikTok";
      case "telegram": return "Telegram";
      default: return "media";
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="border shadow-lg">
        <CardHeader className={`text-white ${getPlatformColor()}`}>
          <CardTitle className="flex items-center justify-center gap-2 text-xl font-bold">
            <Video className="h-6 w-6" /> 
            {platform ? `Descargar ${getPlatformName()}` : "Media Grabber Pal"}
          </CardTitle>
          <CardDescription className="text-white/80">
            Descarga videos y audio de Instagram, TikTok y Telegram
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="url">URL del video</Label>
                <Input 
                  id="url" 
                  placeholder="https://www.instagram.com/reel/..." 
                  value={url}
                  onChange={handleUrlChange}
                  className="focus-visible:ring-brand-purple"
                />
              </div>
              
              <Tabs defaultValue="video" className="w-full" onValueChange={(value) => setFormat(value as MediaFormat)}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="video">Video</TabsTrigger>
                  <TabsTrigger value="audio">Audio</TabsTrigger>
                </TabsList>
                <TabsContent value="video" className="mt-2">
                  <p className="text-sm text-muted-foreground">Descarga el video completo con la mejor calidad disponible.</p>
                </TabsContent>
                <TabsContent value="audio" className="mt-2">
                  <p className="text-sm text-muted-foreground">Extrae solo el audio del video en formato MP3.</p>
                </TabsContent>
              </Tabs>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full bg-gradient-custom hover:opacity-90 transition-opacity" 
            onClick={handleSubmit}
            disabled={isLoading || !url.trim()}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent"></span>
                Procesando...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Descargar {format === "video" ? "Video" : "Audio"}
              </span>
            )}
          </Button>
        </CardFooter>
      </Card>
      
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>Compatible con Instagram, TikTok y Telegram</p>
        <div className="flex justify-center space-x-4 mt-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
          <div className="h-8 w-8 rounded-full bg-black"></div>
          <div className="h-8 w-8 rounded-full bg-blue-500"></div>
        </div>
      </div>
    </div>
  );
};

export default MediaDownloader;
