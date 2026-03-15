"use client"

import { useEffect, useMemo, useState } from "react"

export default function Home() {
  const [usd, setUsd] = useState(5000)
  const [rate, setRate] = useState(17)
  const [loading, setLoading] = useState(true)

  const feePct = 0.01

  useEffect(() => {
    async function loadRate() {
      try {
        const res = await fetch("https://open.er-api.com/v6/latest/USD")
        const data = await res.json()
        if (data?.rates?.MXN) setRate(data.rates.MXN)
      } catch (error) {
        console.error("Error loading exchange rate:", error)
      } finally {
        setLoading(false)
      }
    }

    loadRate()
  }, [])

  const { grossMxn, feeMxn, finalMxn } = useMemo(() => {
    const gross = usd * rate
    const fee = gross * feePct
    const final = gross - fee
    return {
      grossMxn: gross,
      feeMxn: fee,
      finalMxn: final,
    }
  }, [usd, rate])

  const tiers = [
    {
      title: "$200–$2,000 USD",
      fee: "1.5%",
      note: "Ideal para freelancers y pagos pequeños",
    },
    {
      title: "$2,000–$10,000 USD",
      fee: "1.0%",
      note: "Pensado para clientes recurrentes",
    },
    {
      title: ">$10,000 USD",
      fee: "0.7%",
      note: "Mesa OTC para tickets mayores",
    },
  ]

  const features = [
    "Liquidación rápida vía SPEI",
    "Conversión USDC / USDT / USD → MXN",
    "Atención personalizada para tickets medianos y grandes",
    "MVP listo para validar con freelancers, agencias y OTC desks",
  ]

  const steps = [
    {
      step: "01",
      title: "Depositas USD, USDC o USDT",
      text: "El cliente envía fondos y recibe una cotización válida por tiempo limitado.",
    },
    {
      step: "02",
      title: "Se procesa la conversión a MXN",
      text: "El sistema liquida usando stablecoins y rails bancarios para reducir fricción.",
    },
    {
      step: "03",
      title: "Recibes MXN por SPEI",
      text: "El beneficiario recibe pesos mexicanos de forma rápida y clara.",
    },
  ]

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.16),transparent_28%),linear-gradient(to_bottom,rgba(15,23,42,0.95),rgba(2,6,23,1))]" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="mb-5 inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1.5 text-sm text-cyan-200">
                MVP · Crypto Liquidity Rail USA ↔ México
              </div>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Convierte <span className="text-cyan-300">USDC / USDT / USD</span> a <span className="text-emerald-300">MXN</span> en minutos.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Un MVP visual para mostrar un servicio de liquidación crypto → pesos mexicanos vía SPEI,
                enfocado en operaciones rápidas, simples y con soporte personalizado.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://t.me/Guillermodiazg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02]"
                >
                  Solicitar cotización
                </a>
                <a
                  href="#calculator"
                  className="rounded-2xl border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                >
                  Ver calculadora
                </a>
              </div>

              <div className="mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <div className="text-2xl font-semibold text-cyan-300">10–20 min</div>
                  <div className="mt-2 text-sm text-slate-300">Tiempo objetivo de liquidación</div>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <div className="text-2xl font-semibold text-emerald-300">0.7%–1.5%</div>
                  <div className="mt-2 text-sm text-slate-300">Rango de comisiones</div>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <div className="text-2xl font-semibold text-violet-300">SPEI</div>
                  <div className="mt-2 text-sm text-slate-300">Liquidación bancaria en MXN</div>
                </div>
              </div>
            </div>

            <div
              id="calculator"
              className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur-md"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-400">Calculadora MVP</p>
                  <h2 className="text-2xl font-semibold">USDC → MXN</h2>
                </div>
                <div className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-medium text-emerald-300">
                  {loading ? "Cargando tipo de cambio" : "Tipo de cambio en vivo"}
                </div>
              </div>

              <div className="space-y-5 rounded-[24px] bg-slate-900/80 p-5">
                <div>
                  <label className="mb-2 block text-sm text-slate-400">Monto en USDC</label>
                  <input
                    type="number"
                    min="0"
                    value={usd}
                    onChange={(e) => setUsd(Number(e.target.value) || 0)}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-lg text-white outline-none ring-0 transition placeholder:text-slate-500 focus:border-cyan-400/40"
                    placeholder="5000"
                  />
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm">
                    <span className="text-slate-400">Tipo de cambio</span>
                    <span className="font-medium">1 USD = {rate.toFixed(2)} MXN</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm">
                    <span className="text-slate-400">Conversión bruta</span>
                    <span className="font-medium">{grossMxn.toFixed(2)} MXN</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm">
                    <span className="text-slate-400">Fee estimado (1%)</span>
                    <span className="font-medium text-amber-300">{feeMxn.toFixed(2)} MXN</span>
                  </div>
                </div>

                <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-5">
                  <div className="text-sm text-emerald-200">Monto neto estimado</div>
                  <div className="mt-2 text-3xl font-semibold text-emerald-300">{finalMxn.toFixed(2)} MXN</div>
                </div>

                <a
                  href="https://t.me/GuillermoDiazg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl bg-white px-5 py-3 text-center text-sm font-semibold text-slate-950 transition hover:opacity-95"
                >
                  Request Quote on Telegram
                </a>
              </div>

              <p className="mt-4 text-xs leading-6 text-slate-400">
                La cotización final depende del volumen, la red usada y el momento de la operación. Este MVP muestra una estimación visual para validar el concepto.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">Propuesta de valor</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Simple para el usuario, útil para validar el negocio</h2>
            <p className="mt-4 text-slate-300">
              El objetivo es presentar una mesa de liquidez pequeña pero rentable, enfocada en resolver la fricción entre stablecoins y pesos mexicanos.
            </p>
            <div className="mt-8 space-y-3">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300"
                >
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-300" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {tiers.map((tier) => (
              <div key={tier.title} className="rounded-[24px] border border-white/10 bg-slate-900/70 p-5">
                <div className="text-sm text-slate-400">Rango</div>
                <div className="mt-2 text-lg font-semibold">{tier.title}</div>
                <div className="mt-5 text-3xl font-semibold text-cyan-300">{tier.fee}</div>
                <div className="mt-2 text-sm leading-6 text-slate-300">{tier.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-300">Cómo funciona</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Tres pasos para convertir crypto a MXN</h2>
            <p className="mt-4 text-slate-300">
              El MVP muestra un flujo claro, moderno y entendible para clientes, socios o aliados potenciales.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {steps.map((item) => (
              <div key={item.step} className="rounded-[28px] border border-white/10 bg-slate-950/70 p-6 shadow-lg shadow-black/10">
                <div className="mb-5 inline-flex rounded-2xl bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-emerald-500/10 p-7">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">Casos de uso</p>
            <h2 className="mt-3 text-3xl font-semibold">Quién usaría este servicio</h2>
            <div className="mt-6 grid gap-4">
              {[
                "Freelancers que cobran en USDC y necesitan MXN rápido",
                "Agencias o startups que reciben pagos desde EE. UU.",
                "Traders y OTC desks que buscan liquidez en México",
                "Operaciones recurrentes donde el tiempo y el spread importan",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-7">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet-300">Objetivo del MVP</p>
            <h2 className="mt-3 text-3xl font-semibold">Validar demanda con una imagen moderna y confiable</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                <div className="text-2xl font-semibold text-cyan-300">$50k USD</div>
                <div className="mt-2 text-sm text-slate-300">Volumen objetivo mensual para validación</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                <div className="text-2xl font-semibold text-emerald-300">5–10</div>
                <div className="mt-2 text-sm text-slate-300">Clientes recurrentes para probar el modelo</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                <div className="text-2xl font-semibold text-violet-300">&lt; 20 min</div>
                <div className="mt-2 text-sm text-slate-300">Tiempo meta de liquidación por operación</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                <div className="text-2xl font-semibold text-amber-300">OTC Lean</div>
                <div className="mt-2 text-sm text-slate-300">Operación pequeña, simple y rentable</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-slate-900/80">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center lg:px-10">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">Contacto</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Solicita una cotización para convertir USDC a MXN</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Ideal para presentar el concepto a clientes, aliados o socios potenciales. Visual, moderno y listo para usar como MVP real.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://t.me/Guillermodiazg"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
            >
              Telegram
            </a>
            <a
              href="mailto:contacto@demo.com"
              className="rounded-2xl border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
            >
              contacto@demo.com
            </a>
          </div>
          <p className="mt-6 text-xs leading-6 text-slate-500">
            Demo conceptual para mostrar un servicio de liquidación crypto → MXN. No constituye oferta pública ni producto financiero final.
          </p>
        </div>
      </section>
    </main>
  )
}