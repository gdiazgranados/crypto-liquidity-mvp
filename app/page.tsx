"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"

export default function Home() {
  const [lang, setLang] = useState<"EN" | "ES">("EN")
  const [usd, setUsd] = useState<number>(5000)
  const [rate, setRate] = useState<number>(17)
  const [loading, setLoading] = useState<boolean>(true)

  const feePct = 0.01

  useEffect(() => {
    async function loadRate() {
      try {
        const res = await fetch("https://open.er-api.com/v6/latest/USD")
        const data = await res.json()
        if (data?.rates?.MXN) {
          setRate(data.rates.MXN)
        }
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

  const copy = {
    EN: {
      badge: "MVP · Liquidity Rail for Pond0x",
      heroTitle: "Convert USDC / USDT / USD into MXN in minutes",
      heroSubtitle:
        "A visual MVP for a crypto liquidity desk built for the Pond0x community, designed to move stablecoins into Mexican pesos via SPEI.",
      primaryCta: "Request Quote",
      secondaryCta: "View Calculator",
      stat1: "Settlement target",
      stat2: "Estimated fees",
      stat3: "Bank rail",
      calcTitle: "Conversion Calculator",
      calcStatusLoading: "Loading live FX",
      calcStatusReady: "Live exchange rate",
      amountLabel: "Amount in USDC",
      rateLabel: "Exchange rate",
      grossLabel: "Gross conversion",
      feeLabel: "Estimated fee (1%)",
      netLabel: "Estimated MXN received",
      telegramBtn: "Request Quote on Telegram",
      calcDisclaimer:
        "Final quote depends on volume, network used, timing and settlement conditions. This MVP shows an estimated visual simulation.",
      valueEyebrow: "Value Proposition",
      valueTitle: "Simple for the user, useful for validating the business",
      valueText:
        "The goal is to present a lean but credible crypto liquidity service focused on reducing friction between stablecoins and Mexican pesos.",
      features: [
        "Fast settlement via SPEI",
        "USDC / USDT / USD → MXN conversion",
        "Personalized support for mid and large tickets",
        "Built as an MVP for freelancers, agencies and OTC desks",
      ],
      tiers: [
        {
          title: "$200–$2,000 USD",
          fee: "1.5%",
          note: "Ideal for freelancers and smaller payments",
        },
        {
          title: "$2,000–$10,000 USD",
          fee: "1.0%",
          note: "Designed for recurring users",
        },
        {
          title: ">$10,000 USD",
          fee: "0.7%",
          note: "OTC desk for larger tickets",
        },
      ],
      howEyebrow: "How it works",
      howTitle: "Three steps from crypto to MXN",
      howText:
        "This MVP explains the service clearly for users, partners and potential allies.",
      steps: [
        {
          step: "01",
          title: "Deposit USD, USDC or USDT",
          text: "The user sends funds and receives a quote valid for a limited time.",
        },
        {
          step: "02",
          title: "Conversion into MXN",
          text: "The desk settles using stablecoins and banking rails to reduce friction.",
        },
        {
          step: "03",
          title: "Receive MXN via SPEI",
          text: "The beneficiary receives Mexican pesos quickly and clearly.",
        },
      ],
      useCasesEyebrow: "Use Cases",
      useCasesTitle: "Who would use PondRail",
      useCases: [
        "Freelancers who get paid in USDC and need MXN fast",
        "Agencies or startups receiving payments from the U.S.",
        "Traders and OTC desks looking for liquidity in Mexico",
        "Recurring operations where time and spread matter",
      ],
      mvpEyebrow: "MVP Goal",
      mvpTitle: "Validate demand with a credible Web3-looking product",
      mvpCards: [
        { value: "$50k USD", label: "Monthly validation volume target" },
        { value: "5–10", label: "Recurring clients to prove demand" },
        { value: "< 20 min", label: "Settlement target per operation" },
        { value: "Lean OTC", label: "Small, simple and profitable operation" },
      ],
      contactEyebrow: "Contact",
      contactTitle: "Request a quote to convert USDC into MXN",
      contactText:
        "Built to present the concept to users, allies or potential partners. Visual, modern and ready to function as a real MVP.",
      telegram: "Telegram",
      email: "contacto@demo.com",
      footer:
        "Concept demo for a crypto → MXN liquidity service. Not a public offer or final financial product.",
    },
    ES: {
      badge: "MVP · Rail de Liquidez para Pond0x",
      heroTitle: "Convierte USDC / USDT / USD a MXN en minutos",
      heroSubtitle:
        "Un MVP visual de una mesa de liquidez crypto pensada para la comunidad Pond0x, diseñada para mover stablecoins a pesos mexicanos vía SPEI.",
      primaryCta: "Solicitar Cotización",
      secondaryCta: "Ver Calculadora",
      stat1: "Meta de liquidación",
      stat2: "Comisiones estimadas",
      stat3: "Rail bancario",
      calcTitle: "Calculadora de Conversión",
      calcStatusLoading: "Cargando FX en vivo",
      calcStatusReady: "Tipo de cambio en vivo",
      amountLabel: "Monto en USDC",
      rateLabel: "Tipo de cambio",
      grossLabel: "Conversión bruta",
      feeLabel: "Comisión estimada (1%)",
      netLabel: "MXN estimado recibido",
      telegramBtn: "Solicitar cotización en Telegram",
      calcDisclaimer:
        "La cotización final depende del volumen, la red usada, el momento y las condiciones de liquidación. Este MVP muestra una simulación visual estimada.",
      valueEyebrow: "Propuesta de Valor",
      valueTitle: "Simple para el usuario, útil para validar el negocio",
      valueText:
        "El objetivo es presentar un servicio lean pero creíble de liquidez crypto, enfocado en reducir la fricción entre stablecoins y pesos mexicanos.",
      features: [
        "Liquidación rápida vía SPEI",
        "Conversión USDC / USDT / USD → MXN",
        "Atención personalizada para tickets medianos y grandes",
        "Diseñado como MVP para freelancers, agencias y mesas OTC",
      ],
      tiers: [
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
          note: "Mesa OTC para tickets grandes",
        },
      ],
      howEyebrow: "Cómo funciona",
      howTitle: "Tres pasos de crypto a MXN",
      howText:
        "Este MVP explica el servicio de forma clara para usuarios, aliados y socios potenciales.",
      steps: [
        {
          step: "01",
          title: "Depositas USD, USDC o USDT",
          text: "El usuario envía fondos y recibe una cotización válida por tiempo limitado.",
        },
        {
          step: "02",
          title: "Conversión a MXN",
          text: "La mesa liquida usando stablecoins y rails bancarios para reducir fricción.",
        },
        {
          step: "03",
          title: "Recibes MXN vía SPEI",
          text: "El beneficiario recibe pesos mexicanos de forma rápida y clara.",
        },
      ],
      useCasesEyebrow: "Casos de Uso",
      useCasesTitle: "Quién usaría PondRail",
      useCases: [
        "Freelancers que cobran en USDC y necesitan MXN rápido",
        "Agencias o startups que reciben pagos desde EE. UU.",
        "Traders y mesas OTC que buscan liquidez en México",
        "Operaciones recurrentes donde importan el tiempo y el spread",
      ],
      mvpEyebrow: "Objetivo del MVP",
      mvpTitle: "Validar demanda con una imagen creíble y Web3",
      mvpCards: [
        { value: "$50k USD", label: "Meta de volumen mensual para validación" },
        { value: "5–10", label: "Clientes recurrentes para probar demanda" },
        { value: "< 20 min", label: "Meta de liquidación por operación" },
        { value: "OTC Lean", label: "Operación pequeña, simple y rentable" },
      ],
      contactEyebrow: "Contacto",
      contactTitle: "Solicita una cotización para convertir USDC a MXN",
      contactText:
        "Diseñado para presentar el concepto a usuarios, aliados o socios potenciales. Visual, moderno y listo para funcionar como MVP real.",
      telegram: "Telegram",
      email: "contacto@demo.com",
      footer:
        "Demo conceptual de un servicio de liquidez crypto → MXN. No constituye una oferta pública ni un producto financiero final.",
    },
  } as const

  const t = copy[lang]

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.16),transparent_28%),linear-gradient(to_bottom,rgba(15,23,42,0.95),rgba(2,6,23,1))]" />
        <div className="relative mx-auto max-w-7xl px-6 py-6 lg:px-10">
          <header className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="overflow-hidden rounded-full shadow-[0_0_40px_rgba(34,211,238,0.25)]">
                <Image
                  src="/logo.jpg"
                  alt="PondRail Logo"
                  width={68}
                  height={68}
                  className="rounded-full"
                />
              </div>
              <div>
                <div className="text-xl font-semibold tracking-wide">PondRail</div>
                <div className="text-sm text-slate-400">Powered by community liquidity</div>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1">
              <button
                onClick={() => setLang("EN")}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  lang === "EN"
                    ? "bg-cyan-400 text-slate-950"
                    : "text-slate-300 hover:bg-white/5"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("ES")}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  lang === "ES"
                    ? "bg-cyan-400 text-slate-950"
                    : "text-slate-300 hover:bg-white/5"
                }`}
              >
                ES
              </button>
            </div>
          </header>

          <div className="grid gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
            <div>
              <div className="mb-5 inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1.5 text-sm text-cyan-200">
                {t.badge}
              </div>

              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                {t.heroTitle}
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                {t.heroSubtitle}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://t.me/Guillermodiazg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02]"
                >
                  {t.primaryCta}
                </a>

                <a
                  href="#calculator"
                  className="rounded-2xl border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                >
                  {t.secondaryCta}
                </a>
              </div>

              <div className="mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <div className="text-2xl font-semibold text-cyan-300">10–20 min</div>
                  <div className="mt-2 text-sm text-slate-300">{t.stat1}</div>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <div className="text-2xl font-semibold text-emerald-300">0.7%–1.5%</div>
                  <div className="mt-2 text-sm text-slate-300">{t.stat2}</div>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <div className="text-2xl font-semibold text-violet-300">SPEI</div>
                  <div className="mt-2 text-sm text-slate-300">{t.stat3}</div>
                </div>
              </div>
            </div>

            <div
              id="calculator"
              className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur-md"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-400">PondRail</p>
                  <h2 className="text-2xl font-semibold">{t.calcTitle}</h2>
                </div>
                <div className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-medium text-emerald-300">
                  {loading ? t.calcStatusLoading : t.calcStatusReady}
                </div>
              </div>

              <div className="space-y-5 rounded-[24px] bg-slate-900/80 p-5">
                <div>
                  <label className="mb-2 block text-sm text-slate-400">{t.amountLabel}</label>
                  <input
                    type="number"
                    min="0"
                    value={usd}
                    onChange={(e) => setUsd(Number(e.target.value) || 0)}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-lg text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/40"
                    placeholder="5000"
                  />
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm">
                    <span className="text-slate-400">{t.rateLabel}</span>
                    <span className="font-medium">1 USD = {rate.toFixed(2)} MXN</span>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm">
                    <span className="text-slate-400">{t.grossLabel}</span>
                    <span className="font-medium">{grossMxn.toFixed(2)} MXN</span>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm">
                    <span className="text-slate-400">{t.feeLabel}</span>
                    <span className="font-medium text-amber-300">{feeMxn.toFixed(2)} MXN</span>
                  </div>
                </div>

                <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-5">
                  <div className="text-sm text-emerald-200">{t.netLabel}</div>
                  <div className="mt-2 text-3xl font-semibold text-emerald-300">
                    {finalMxn.toFixed(2)} MXN
                  </div>
                </div>

                <a
                  href="https://t.me/Guillermodiazg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl bg-white px-5 py-3 text-center text-sm font-semibold text-slate-950 transition hover:opacity-95"
                >
                  {t.telegramBtn}
                </a>
              </div>

              <p className="mt-4 text-xs leading-6 text-slate-400">{t.calcDisclaimer}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">
              {t.valueEyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">{t.valueTitle}</h2>
            <p className="mt-4 text-slate-300">{t.valueText}</p>

            <div className="mt-8 space-y-3">
              {t.features.map((feature) => (
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
            {t.tiers.map((tier) => (
              <div
                key={tier.title}
                className="rounded-[24px] border border-white/10 bg-slate-900/70 p-5"
              >
                <div className="text-sm text-slate-400">Range</div>
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
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-300">
              {t.howEyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">{t.howTitle}</h2>
            <p className="mt-4 text-slate-300">{t.howText}</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {t.steps.map((item) => (
              <div
                key={item.step}
                className="rounded-[28px] border border-white/10 bg-slate-950/70 p-6 shadow-lg shadow-black/10"
              >
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
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">
              {t.useCasesEyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold">{t.useCasesTitle}</h2>

            <div className="mt-6 grid gap-4">
              {t.useCases.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-7">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet-300">
              {t.mvpEyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold">{t.mvpTitle}</h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {t.mvpCards.map((card) => (
                <div
                  key={card.value + card.label}
                  className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"
                >
                  <div className="text-2xl font-semibold text-cyan-300">{card.value}</div>
                  <div className="mt-2 text-sm text-slate-300">{card.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-slate-900/80">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center lg:px-10">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">
            {t.contactEyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">{t.contactTitle}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">{t.contactText}</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://t.me/Guillermodiazg"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
            >
              {t.telegram}
            </a>
            <a
              href={`mailto:${t.email}`}
              className="rounded-2xl border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
            >
              {t.email}
            </a>
          </div>

          <p className="mt-6 text-xs leading-6 text-slate-500">{t.footer}</p>
        </div>
      </section>
    </main>
  )
}