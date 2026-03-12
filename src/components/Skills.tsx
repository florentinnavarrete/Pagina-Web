import React from 'react';

interface CompetencyPillar {
  title: string;
  summary: string;
  highlights: string[];
  outcomes: string[];
}

const Skills: React.FC = () => {
  const competencyPillars: CompetencyPillar[] = [
    {
      title: 'Operación HR End-to-End',
      summary: 'Gestionamos el ciclo completo de RR.HH. con procesos claros, estables y escalables en SAP.',
      highlights: ['SAP HCM / ECP y SuccessFactors', 'Nómina Española y compensación', 'Integración con procesos internos'],
      outcomes: ['Menos incidencias operativas', 'Mayor continuidad del servicio'],
    },
    {
      title: 'Seguridad, Riesgo y Cumplimiento',
      summary: 'Aplicamos un marco de control que protege datos, reduce riesgo y facilita auditorías.',
      highlights: ['Cumplimiento legal y Seguridad Social', 'Accesos y segregación de funciones', 'Trazabilidad y reporting auditable'],
      outcomes: ['Menor exposición a sanciones', 'Mayor confianza en auditoría y compliance'],
    },
    {
      title: 'Transformación y Escalabilidad',
      summary: 'Convertimos iniciativas de mejora en proyectos ejecutables con impacto real en negocio.',
      highlights: ['Project & Change Management', 'Blueprint, testing y despliegue', 'Formación y soporte post-live'],
      outcomes: ['Adopción más rápida del cambio', 'Escalabilidad con menor coste operativo'],
    },
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-oksap-light">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-oksap-navy mb-4">
            Nuestras Competencias
          </h2>
          <div className="w-24 h-1 bg-oksap-silver mx-auto mb-4 rounded-full"></div>
          <p className="text-oksap-accent text-lg max-w-2xl mx-auto">
            Capacidades estructuradas por impacto empresarial, continuidad operativa y seguridad
          </p>
        </div>

        {/* Competency Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {competencyPillars.map((pillar) => (
            <div
              key={pillar.title}
              className="bg-oksap-primary/15 rounded-xl p-8 border border-oksap-navy/20 hover:border-oksap-navy shadow-md hover:shadow-xl transition-all hover:scale-105 border-l-4 border-l-oksap-silver"
            >
              <h3 className="text-2xl font-bold text-oksap-navy mb-4 flex items-center gap-3">
                <span className="w-1.5 h-10 bg-oksap-silver rounded-full"></span>
                {pillar.title}
              </h3>

              <p className="text-sm text-oksap-accent mb-6 leading-relaxed">{pillar.summary}</p>

              <div className="mb-6">
                <p className="text-xs uppercase tracking-wide text-oksap-navy font-bold mb-3">Qué cubrimos</p>
                <ul className="space-y-2">
                  {pillar.highlights.map((highlight) => (
                    <li key={highlight} className="text-sm text-oksap-navy flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-oksap-silver"></span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-oksap-primary">
                <p className="text-xs uppercase tracking-wide text-oksap-navy font-bold mb-3">Resultado</p>
                <ul className="space-y-2">
                  {pillar.outcomes.map((outcome) => (
                    <li key={outcome} className="text-sm text-oksap-accent flex items-start gap-2 leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-oksap-navy"></span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

