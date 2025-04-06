
import React from "react";

const Header = () => {
  return (
    <header className="py-6">
      <div className="container mx-auto flex justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-custom bg-clip-text text-transparent">
            Media Grabber Pal
          </h1>
          <p className="mt-2 text-muted-foreground">
            Descarga fácilmente videos y audio de redes sociales
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
