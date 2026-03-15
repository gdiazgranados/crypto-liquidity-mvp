export default function CryptoLiquidityMVP() {
  const tiers = [
    { range: "$200–$2,000 USD", fee: "1.5%", note: "Ideal para freelancers y pagos pequeños" },
    { range: "$2,000–$10,000 USD", fee: "1.0%", note: "Para clientes recurrentes" },
    { range: ">$10,000 USD", fee: "0.7%", note: "Mesa OTC para tickets más grandes" },
  ];

  const steps = [
    {
      title: "1. Depositas USD, USDC o USDT",
      desc: "El cliente envía fondos a la cuenta operativa y recibe una cotización válida por tiempo limitado.",
    },
    {
      title: "2. Conversión rápida a MXN",
      desc: "El sistema procesa la liquidación usando rails crypto + SPEI para reducir tiempos y fricción.",
    },
    {
      title: "3. Entrega por SPEI o efectivo",
      desc: "El beneficiario recibe pesos mexicanos en su cuenta o mediante retiro apoyado por operadores.",
    },
  ];

  const useCases = [
    "Freelancers que cobran en USDC y necesitan MXN",
    "Agencias o startups que reciben pagos desde EE. UU.",
    "Traders y OTC desks que necesitan liquidez rápida en México",
    "Pagos urgentes a proveedores o beneficiarios no bancarizados",
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.16),transparent_25%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-sm text-cyan-200">
                MVP · Crypto Liquidity Rail USA ↔ México
              </div>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Convierte <span className="text-cyan-300">USDC / USDT / USD</span> a <span className="text-emerald-300">MXN</span> en minutos.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Un servicio simple para liquidar stablecoins a pesos mexicanos vía SPEI, con soporte para clientes individuales,
                freelancers, empresas pequeñas y operaciones OTC.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#contacto"
                  className="rounded-2xl bg-cyan-400 px-6 py-3 text-sm font-medium text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02]"
                >
                  Solicitar cotización
                </a>
                <a
                  href="#como-funciona"
                  className="rounded-2xl border border-white/15 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/5"
                >
                  Ver cómo funciona
                </a>
              </div>
              <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <div className="text-2xl font-semibold text-cyan-300">10–20 min</div>
                  <div className="mt-1 text-sm text-slate-300">Tiempo objetivo de liquidación</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <div className="text-2xl font-semibold text-emerald-300">0.7%–1.5%</div>
                  <div className="mt-1 text-sm text-slate-300">Rango de comisiones</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <div className="text-2xl font-semibold text-violet-300">SPEI + ATM</div>
                  <div className="mt-1 text-sm text-slate-300">Entrega bancaria o efectivo</div>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-900/20 backdrop-blur-md">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Ejemplo de liquidación</p>
                  <h2 className="text-xl font-semibold">5,000 USDC → MXN</h2>
                </div>
                <div className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-medium text-emerald-300">
                  Tiempo real
                </div>
              </div>
              <div className="space-y-4 rounded-2xl bg-slate-900/70 p-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 text-sm">
                  <span className="text-slate-400">Monto recibido</span>
                  <span className="font-medium">5,000 USDC</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3 text-sm">
                  <span className="text-slate-400">Tipo de cambio estimado</span>
                  <span className="font-medium">1 USD = 17.00 MXN</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3 text-sm">
                  <span className="text-slate-400">Conversión bruta</span>
                  <span className="font-medium">85,000 MXN</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3 text-sm">
                  <span className="text-slate-400">Fee estimado</span>
                  <span className="font-medium text-amber-300">1.0% = 850 MXN</span>
                </div>
                <div className="flex items-center justify-between text-base">
                  <span className="text-slate-300">Monto neto estimado</span>
                  <span className="text-xl font-semibold text-emerald-300">84,150 MXN</span>
                </div>
              </div>
              <p className="mt-4 text-xs leading-5 text-slate-400">
                La cotización final depende del volumen, la red usada y el momento de la operación. Este ejemplo es solo demostrativo para el MVP.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">Cómo funciona</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Un flujo simple, rápido y entendible</h2>
          <p className="mt-4 text-slate-300">
            El MVP está pensado como una mesa de liquidez pequeña y rentable: pocas operaciones, tickets claros y liquidación rápida.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {steps.map((step) => (
            <div key={step.title} className="rounded-[24px] border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/10">
              <div className="mb-4 h-10 w-10 rounded-2xl bg-cyan-400/15 text-center text-lg font-semibold leading-10 text-cyan-300">
                {step.title.split('.')[0]}
              </div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-300">Propuesta de valor</p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Diseñado para gente que ya vive entre crypto y dinero real</h2>
              <p className="mt-4 text-slate-300">
                Este concepto reduce la fricción entre stablecoins y pesos mexicanos, sin obligar al usuario a pasar por exchanges complejos o procesos lentos.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-slate-300">
                <li>• Liquidación rápida a cuenta mexicana vía SPEI</li>
                <li>• Opción de entrega en efectivo por operadores para usuarios no bancarizados</li>
                <li>• Atención personalizada para tickets medianos y grandes</li>
                <li>• Enfoque inicial en freelancers, agencias y OTC desks</li>
              </ul>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {tiers.map((tier) => (
                <div key={tier.range} className="rounded-[24px] border border-white/10 bg-slate-900/70 p-5">
                  <div className="text-sm text-slate-400">Rango</div>
                  <div className="mt-2 text-lg font-semibold">{tier.range}</div>
                  <div className="mt-4 text-3xl font-semibold text-cyan-300">{tier.fee}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-300">{tier.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-7">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet-300">Casos de uso</p>
            <h2 className="mt-3 text-3xl font-semibold">Quién usaría este servicio</h2>
            <div className="mt-6 space-y-4">
              {useCases.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-slate-900/70 p-4 text-sm text-slate-300">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-emerald-500/10 p-7">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">MVP de confianza</p>
            <h2 className="mt-3 text-3xl font-semibold">Lo que este MVP quiere validar</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="text-2xl font-semibold text-cyan-300">$50k USD</div>
                <div className="mt-2 text-sm text-slate-300">Volumen objetivo de validación mensual</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="text-2xl font-semibold text-emerald-300">5–10</div>
                <div className="mt-2 text-sm text-slate-300">Clientes recurrentes para probar el modelo</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="text-2xl font-semibold text-violet-300">&lt; 20 min</div>
                <div className="mt-2 text-sm text-slate-300">Tiempo meta de liquidación por operación</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="text-2xl font-semibold text-amber-300">Bajo riesgo</div>
                <div className="mt-2 text-sm text-slate-300">Operación sencilla, pocos clientes y tickets claros</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="border-t border-white/10 bg-slate-900/70">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center lg:px-10">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">Contacto</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Solicita una cotización para convertir USDC a MXN</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Este MVP está enfocado en operaciones simples y recurrentes. Ideal para validar demanda con freelancers, agencias y clientes OTC que necesiten liquidez rápida en México.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href="mailto:contacto@demo.com" className="rounded-2xl bg-cyan-400 px-6 py-3 text-sm font-medium text-slate-950 transition hover:scale-[1.02]">
              contacto@demo.com
            </a>
            <a href="https://t.me/demo" className="rounded-2xl border border-white/15 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/5">
              Telegram
            </a>
          </div>
          <p className="mt-6 text-xs leading-6 text-slate-500">
            Demo conceptual para presentar la propuesta de valor de un servicio de liquidación crypto → MXN. No constituye oferta pública ni producto financiero final.
          </p>
        </div>
      </section>
    </div>
  );
}
