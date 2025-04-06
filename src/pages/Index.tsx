
import Header from "@/components/Header";
import MediaDownloader from "@/components/MediaDownloader";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
        <MediaDownloader />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
