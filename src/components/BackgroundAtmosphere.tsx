import React from 'react';

const BackgroundAtmosphere: React.FC = () => {
  return (
    <div className="background-atmosphere" aria-hidden="true">
      {/* Base oscura para crear una atmósfera inmersiva tipo Tiwis */}
      <div className="background-atmosphere__base" />

      {/* Blobs de color (rosa/azul) con movimiento sutil para no distraer */}
      <div className="background-atmosphere__blob background-atmosphere__blob--pink" />
      <div className="background-atmosphere__blob background-atmosphere__blob--blue" />
      <div className="background-atmosphere__blob background-atmosphere__blob--violet" />

      {/* Capa suave para unificar el look entre secciones */}
      <div className="background-atmosphere__veil" />
    </div>
  );
};

export default BackgroundAtmosphere;
