"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"

export default function Home() {
  const [lang, setLang] = useState<"EN" | "ES">("EN")
  const [amount, setAmount] = useState<number>(5000)
  const [rate, setRate] = useState<number>(17)
  const [loading, setLoading] = useState<boolean>(true)
  const [asset, setAsset] = useState<"USDC" | "USDT" | "USD">("USDC")
  const [settlement, setSettlement] = useState<"SPEI" | "Cash" | "Operator">("SPEI")

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

  const feeConfig = useMemo(() => {
    let baseFeePct = 0.015

    if (amount >= 2000 && amount < 10000) baseFeePct = 0.01
    if (amount >= 10000) baseFeePct = 0.007

    const networkFeeMxn = asset === "USDT" ? 18 : asset === "USD" ? 0 : 8
    const settlementFeeMxn = settlement === "SPEI" ? 12 : settlement === "Cash" ? 75 : 120

    return { baseFeePct, networkFeeMxn, settlementFeeMxn }
  }, [amount, asset, settlement])

  const quote = useMemo(() => {
    const grossMxn = amount * rate
    const spreadFeeMxn = grossMxn * feeConfig.baseFeePct
    const totalFeesMxn = spreadFeeMxn + feeConfig.networkFeeMxn + feeConfig.settlementFeeMxn
    const finalMxn = Math.max(grossMxn - totalFeesMxn, 0)

    return {
      grossMxn,
      spreadFeeMxn,
      networkFeeMxn: feeConfig.networkFeeMxn,
      settlementFeeMxn: feeConfig.settlementFeeMxn,
      totalFeesMxn,
      finalMxn,
    }
  }, [amount, rate, feeConfig])

  const content = {
    EN: {
      navCalculator: "Calculator",
      navHow: "How it works",
      navFaq: "FAQ",
      navContact: "Contact",

      badge: "MVP · Liquidity Rail for Pond0x",
      heroTitle: "Convert stablecoins into MXN in minutes",
      heroSubtitle:
        "A community-first liquidity MVP for Pond0x users who need a faster path from USDC, USDT or USD into Mexican pesos via SPEI.",
      primaryCta: "Get Pond0x Quote",
      secondaryCta: "View Calculator",
      stat1: "Settlement target",
      stat2: "Estimated fees",
      stat3: "Focused corridor",

      exclusiveBadge: "Pond0x Exclusive MVP",
      exclusiveTitle: "Built for the Pond0x community",
      exclusiveText:
        "PondRail is a visual MVP designed for Pond0x users who want a cleaner, faster and more community-native path into Mexican pesos.",
      exclusiveStat1: "Demo liquidity capacity",
      exclusiveStat2: "Illustrative monthly operations",
      exclusiveStat3: "US ↔ MX corridor",

      pondUsersEyebrow: "Pond0x Community",
      pondUsersTitle: "Why Pond0x users choose PondRail",
      pondUsersCards: [
        {
          icon: "⚡",
          title: "Fast Liquidity",
          text: "Move stablecoins into Mexican pesos quickly without traditional banking friction.",
        },
        {
          icon: "🌎",
          title: "US → Mexico Corridor",
          text: "Designed for cross-border flows between U.S. crypto liquidity and MXN rails.",
        },
        {
          icon: "🐷",
          title: "Built for Pond0x",
          text: "Focused on the Pond0x ecosystem and its growing crypto-native community.",
        },
      ],

      calcTitle: "Conversion Calculator",
      calcStatusLoading: "Loading live FX",
      calcStatusReady: "Live exchange rate",
      amountLabel: "Amount",
      assetLabel: "Asset",
      settlementLabel: "Settlement",
      rateLabel: "Exchange rate",
      grossLabel: "Gross conversion",
      spreadLabel: "Spread / desk fee",
      networkLabel: "Network fee",
      settlementCostLabel: "Settlement cost",
      totalFeeLabel: "Total estimated fees",
      netLabel: "Estimated MXN received",
      telegramBtn: "Request Quote on Telegram",
      calcDisclaimer:
        "Final quote depends on timing, amount, network and settlement method. This MVP displays an estimated simulation only.",

      trustEyebrow: "Trust Layer",
      trustTitle: "Lean OTC-style structure, not a bloated exchange",
      trustText:
        "The concept is positioned as a community-first liquidity desk focused on speed, clarity and controlled settlement for recurring crypto-native users.",
      trustCards: [
        "Selective clients, not mass retail",
        "Focused on stablecoin → MXN conversion",
        "Designed for fast SPEI settlement",
        "Built as a lean OTC workflow",
      ],

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

      tiersTitle: "Pricing Tiers",
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
          title: "PondRail prices the conversion",
          text: "The desk estimates spread, network cost and settlement method in one clean quote.",
        },
        {
          step: "03",
          title: "Receive MXN",
          text: "Funds can be delivered through SPEI or future operator-assisted settlement flows.",
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

      otcEyebrow: "Liquidity Desk",
      otcTitle: "OTC liquidity for Pond0x users",
      otcText:
        "PondRail operates as a lean OTC-style liquidity desk designed to help Pond0x users move stablecoins into Mexican pesos efficiently.",
      otcCards: ["🔒 Secure settlement", "⚡ Fast SPEI delivery", "🌎 Cross-border liquidity"],

      faqEyebrow: "FAQ",
      faqTitle: "Questions users will probably ask first",
      faqs: [
        {
          q: "How fast is settlement?",
          a: "The MVP targets fast settlement, with SPEI as the main delivery rail for MXN.",
        },
        {
          q: "Which assets are supported?",
          a: "The current concept supports USD, USDC and USDT as entry assets.",
        },
        {
          q: "Who is this for?",
          a: "Mainly Pond0x users, freelancers, agencies, traders and recurring crypto-native users who need MXN liquidity.",
        },
        {
          q: "Is this a public exchange?",
          a: "No. The positioning is closer to a lean, community-first OTC liquidity workflow.",
        },
      ],

      contactEyebrow: "Contact",
      contactTitle: "Request a quote to convert stablecoins into MXN",
      contactText:
        "Built to present the concept to users, allies or potential partners. Visual, modern and ready to function as a real MVP.",
      telegram: "Telegram",
      email: "contacto@demo.com",
      floatingCta: "Talk on Telegram",
      footer:
        "Concept demo for a crypto → MXN liquidity service. Not a public offer or final financial product.",
    },

    ES: {
      navCalculator: "Calculadora",
      navHow: "Cómo funciona",
      navFaq: "FAQ",
      navContact: "Contacto",

      badge: "MVP · Rail de Liquidez para Pond0x",
      heroTitle: "Convierte stablecoins a MXN en minutos",
      heroSubtitle:
        "Un MVP de liquidez enfocado en la comunidad Pond0x para mover USDC, USDT o USD a pesos mexicanos vía SPEI.",
      primaryCta: "Solicitar Cotización Pond0x",
      secondaryCta: "Ver Calculadora",
      stat1: "Meta de liquidación",
      stat2: "Comisiones estimadas",
      stat3: "Corredor enfocado",

      exclusiveBadge: "MVP Exclusivo Pond0x",
      exclusiveTitle: "Construido para la comunidad Pond0x",
      exclusiveText:
        "PondRail es un MVP visual diseñado para usuarios de Pond0x que quieren una vía más rápida, limpia y nativa para convertir stablecoins a pesos mexicanos.",
      exclusiveStat1: "Capacidad demo de liquidez",
      exclusiveStat2: "Operaciones mensuales ilustrativas",
      exclusiveStat3: "Corredor EE. UU. ↔ MX",

      pondUsersEyebrow: "Comunidad Pond0x",
      pondUsersTitle: "Por qué los usuarios de Pond0x elegirían PondRail",
      pondUsersCards: [
        {
          icon: "⚡",
          title: "Liquidez Rápida",
          text: "Mueve stablecoins a pesos mexicanos rápidamente sin la fricción bancaria tradicional.",
        },
        {
          icon: "🌎",
          title: "Corredor EE. UU. → México",
          text: "Diseñado para flujos transfronterizos entre liquidez crypto en EE. UU. y rails en MXN.",
        },
        {
          icon: "🐷",
          title: "Construido para Pond0x",
          text: "Enfocado en el ecosistema Pond0x y su creciente comunidad crypto-native.",
        },
      ],

      calcTitle: "Calculadora de Conversión",
      calcStatusLoading: "Cargando FX en vivo",
      calcStatusReady: "Tipo de cambio en vivo",
      amountLabel: "Monto",
      assetLabel: "Activo",
      settlementLabel: "Liquidación",
      rateLabel: "Tipo de cambio",
      grossLabel: "Conversión bruta",
      spreadLabel: "Spread / comisión de mesa",
      networkLabel: "Comisión de red",
      settlementCostLabel: "Costo de liquidación",
      totalFeeLabel: "Comisiones totales estimadas",
      netLabel: "MXN estimado recibido",
      telegramBtn: "Solicitar cotización en Telegram",
      calcDisclaimer:
        "La cotización final depende del momento, monto, red y método de liquidación. Este MVP muestra solo una simulación estimada.",

      trustEyebrow: "Capa de Confianza",
      trustTitle: "Estructura lean estilo OTC, no un exchange inflado",
      trustText:
        "El concepto se posiciona como una mesa de liquidez community-first enfocada en velocidad, claridad y liquidación controlada para usuarios crypto-native recurrentes.",
      trustCards: [
        "Clientes selectivos, no retail masivo",
        "Enfoque en conversión stablecoin → MXN",
        "Diseñado para liquidación rápida vía SPEI",
        "Construido como workflow OTC ligero",
      ],

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

      tiersTitle: "Niveles de Precio",
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
          title: "PondRail calcula la conversión",
          text: "La mesa estima spread, costo de red y método de liquidación en una sola cotización clara.",
        },
        {
          step: "03",
          title: "Recibes MXN",
          text: "Los fondos pueden entregarse por SPEI o en futuros flujos asistidos por operadores.",
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

      otcEyebrow: "Mesa de Liquidez",
      otcTitle: "Liquidez OTC para usuarios de Pond0x",
      otcText:
        "PondRail opera como una mesa de liquidez estilo OTC, diseñada para ayudar a usuarios de Pond0x a mover stablecoins a pesos mexicanos de forma eficiente.",
      otcCards: ["🔒 Liquidación segura", "⚡ Entrega rápida vía SPEI", "🌎 Liquidez transfronteriza"],

      faqEyebrow: "FAQ",
      faqTitle: "Preguntas que un usuario haría primero",
      faqs: [
        {
          q: "¿Qué tan rápida es la liquidación?",
          a: "El MVP está pensado para liquidación rápida, usando SPEI como principal rail de entrega en MXN.",
        },
        {
          q: "¿Qué activos se soportan?",
          a: "El concepto actual soporta USD, USDC y USDT como activos de entrada.",
        },
        {
          q: "¿Para quién está pensado?",
          a: "Principalmente para usuarios de Pond0x, freelancers, agencias, traders y usuarios crypto-native con necesidad recurrente de liquidez en MXN.",
        },
        {
          q: "¿Es un exchange público?",
          a: "No. El posicionamiento se parece más a un workflow lean de liquidez estilo OTC y community-first.",
        },
      ],

      contactEyebrow: "Contacto",
      contactTitle: "Solicita una cotización para convertir stablecoins a MXN",
      contactText:
        "Diseñado para presentar el concepto a usuarios, aliados o socios potenciales. Visual, moderno y listo para funcionar como MVP real.",
      telegram: "Telegram",
      email: "contacto@demo.com",
      floatingCta: "Hablar en Telegram",
      footer:
        "Demo conceptual de un servicio de liquidez crypto → MXN. No constituye una oferta pública ni un producto financiero final.",
    },
  } as const

  const t = content[lang]

  return (
    <main className="min-h-screen text-white bg-gradient-to-br from-slate-950 via-black to-slate-900">
     <div className="border-b border-cyan-400/10 bg-cyan-400/5">
  <div className="mx-auto max-w-7xl px-6 py-2">
    <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 md:justify-between">
      <div className="flex items-center gap-2">
        <span className="text-cyan-300 font-medium">USD/MXN</span>
        <span>{rate.toFixed(2)}</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-emerald-300 font-medium">USDC</span>
        <span>Supported</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-violet-300 font-medium">USDT</span>
        <span>Supported</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-amber-300 font-medium">Settlement</span>
        <span>{settlement}</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-cyan-300 font-medium">Desk Mode</span>
        <span>Pond0x Exclusive Access</span>
      </div>
    </div>
  </div>
</div>
      <header className="sticky top-0 z-50 backdrop-blur bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.jpg" alt="PondRail" width={40} height={40} className="rounded-full" />
            <div className="font-semibold">PondRail</div>
          </div>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-6 text-sm text-slate-300">
              <a href="#calculator" className="hover:text-white">
                {t.navCalculator}
              </a>
              <a href="#how" className="hover:text-white">
                {t.navHow}
              </a>
              <a href="#faq" className="hover:text-white">
                {t.navFaq}
              </a>
              <a href="#contact" className="hover:text-white">
                {t.navContact}
              </a>
            </nav>

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
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.16),transparent_28%),linear-gradient(to_bottom,rgba(15,23,42,0.95),rgba(2,6,23,1))]" />

        <div className="relative mx-auto max-w-7xl px-6 py-6 lg:px-10">
               <div className="grid gap-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
  <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
    <div className="text-sm text-slate-400">Liquidity Routed</div>
    <div className="mt-2 text-2xl font-semibold text-cyan-300">$240k+</div>
    <div className="mt-1 text-xs text-slate-500">Illustrative monthly capacity</div>
  </div>

  <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
    <div className="text-sm text-slate-400">Avg Settlement</div>
    <div className="mt-2 text-2xl font-semibold text-emerald-300">10–20 min</div>
    <div className="mt-1 text-xs text-slate-500">Target for SPEI delivery</div>
  </div>

  <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
    <div className="text-sm text-slate-400">Supported Assets</div>
    <div className="mt-2 text-2xl font-semibold text-violet-300">USD / USDC / USDT</div>
    <div className="mt-1 text-xs text-slate-500">Stablecoin-first settlement</div>
  </div>

  <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
    <div className="text-sm text-slate-400">Active Corridor</div>
    <div className="mt-2 text-2xl font-semibold text-amber-300">US ↔ MX</div>
    <div className="mt-1 text-xs text-slate-500">Pond0x-focused liquidity rail</div>
  </div>
</div>
          <div className="grid gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
            <div>
              <div className="mb-5 inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1.5 text-sm text-cyan-200">
                {t.badge}
              </div>

              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                {t.heroTitle}
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{t.heroSubtitle}</p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://t.me/Guillermodiazg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:scale-105 hover:shadow-cyan-400/40"
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
                  <div className="text-2xl font-semibold text-violet-300">US ↔ MX</div>
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
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-slate-400">{t.amountLabel}</label>
                    <input
                      type="number"
                      min="0"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value) || 0)}
                      className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-lg text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/40"
                      placeholder="5000"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-400">{t.assetLabel}</label>
                    <select
                      value={asset}
                      onChange={(e) => setAsset(e.target.value as "USDC" | "USDT" | "USD")}
                      className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none"
                    >
                      <option value="USDC">USDC</option>
                      <option value="USDT">USDT</option>
                      <option value="USD">USD</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-400">{t.settlementLabel}</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: "SPEI", label: "SPEI" },
                      { value: "Cash", label: "Cash" },
                      { value: "Operator", label: "Operator" },
                    ].map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => setSettlement(item.value as "SPEI" | "Cash" | "Operator")}
                        className={`rounded-2xl border px-4 py-3 text-sm transition ${
                          settlement === item.value
                            ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                            : "border-white/10 bg-white/[0.03] text-slate-300"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm">
                    <span className="text-slate-400">{t.rateLabel}</span>
                    <span className="font-medium">1 USD = {rate.toFixed(2)} MXN</span>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm">
                    <span className="text-slate-400">{t.grossLabel}</span>
                    <span className="font-medium">{quote.grossMxn.toFixed(2)} MXN</span>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm">
                    <span className="text-slate-400">{t.spreadLabel}</span>
                    <span className="font-medium text-amber-300">{quote.spreadFeeMxn.toFixed(2)} MXN</span>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm">
                    <span className="text-slate-400">{t.networkLabel}</span>
                    <span className="font-medium text-amber-300">{quote.networkFeeMxn.toFixed(2)} MXN</span>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm">
                    <span className="text-slate-400">{t.settlementCostLabel}</span>
                    <span className="font-medium text-amber-300">{quote.settlementFeeMxn.toFixed(2)} MXN</span>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm">
                    <span className="text-slate-400">{t.totalFeeLabel}</span>
                    <span className="font-medium text-amber-300">{quote.totalFeesMxn.toFixed(2)} MXN</span>
                  </div>
                </div>

                <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-5">
                  <div className="text-sm text-emerald-200">{t.netLabel}</div>
                  <div className="mt-2 text-3xl font-semibold text-emerald-300">
                    {quote.finalMxn.toFixed(2)} MXN
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

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="rounded-[32px] border border-cyan-400/15 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-emerald-500/10 p-8 text-center shadow-xl shadow-cyan-950/20">
          <div className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1.5 text-sm font-medium text-cyan-300">
            {t.exclusiveBadge}
          </div>

          <h2 className="text-3xl font-semibold sm:text-4xl">{t.exclusiveTitle}</h2>

          <p className="mx-auto mt-4 max-w-3xl text-slate-300">{t.exclusiveText}</p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
              <div className="text-3xl font-semibold text-cyan-300">$240k+</div>
              <div className="mt-2 text-sm text-slate-300">{t.exclusiveStat1}</div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
              <div className="text-3xl font-semibold text-emerald-300">42</div>
              <div className="mt-2 text-sm text-slate-300">{t.exclusiveStat2}</div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
              <div className="text-3xl font-semibold text-violet-300">US ↔ MX</div>
              <div className="mt-2 text-sm text-slate-300">{t.exclusiveStat3}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="text-center mb-12">
          <p className="text-cyan-300 text-sm mb-3">{t.pondUsersEyebrow}</p>
          <h2 className="text-3xl font-bold">{t.pondUsersTitle}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {t.pondUsersCards.map((card) => (
            <div
              key={card.title}
              className="bg-slate-900/70 border border-white/10 p-8 rounded-2xl hover:scale-105 transition"
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="font-semibold mb-2">{card.title}</h3>
              <p className="text-sm opacity-70">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-7">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">{t.trustEyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold">{t.trustTitle}</h2>
          <p className="mt-4 max-w-3xl text-slate-300">{t.trustText}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.trustCards.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 text-sm text-slate-300">
                {item}
              </div>
            ))}
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

          <div>
            <div className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">
              {t.tiersTitle}
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
        </div>
      </section>

      <section id="how" className="border-y border-white/10 bg-white/[0.03]">
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

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 text-center">
        <p className="text-cyan-400 text-sm mb-4">{t.otcEyebrow}</p>
        <h2 className="text-3xl font-bold mb-6">{t.otcTitle}</h2>
        <p className="max-w-2xl mx-auto text-slate-300 mb-10">{t.otcText}</p>

        <div className="grid md:grid-cols-3 gap-6">
          {t.otcCards.map((card) => (
            <div key={card} className="bg-slate-900 border border-white/10 p-6 rounded-xl">
              {card}
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-5xl px-6 py-20 lg:px-10">
          <div className="text-center mb-12">
            <p className="text-cyan-300 text-sm mb-3">{t.faqEyebrow}</p>
            <h2 className="text-3xl font-bold">{t.faqTitle}</h2>
          </div>

          <div className="grid gap-4">
            {t.faqs.map((item) => (
              <div key={item.q} className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
                <h3 className="text-lg font-semibold">{item.q}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
  <div className="text-center mb-14">
    <p className="text-cyan-300 text-sm mb-3 uppercase tracking-widest">
      Roadmap
    </p>
    <h2 className="text-3xl font-bold">
      Building the Mexico Crypto Liquidity Rail
    </h2>
    <p className="text-slate-300 mt-4 max-w-2xl mx-auto">
      PondRail begins as a lean MVP focused on Pond0x users and evolves
      toward a full cross-border liquidity infrastructure between crypto
      markets and Mexican pesos.
    </p>
  </div>

  <div className="grid md:grid-cols-4 gap-6">

    <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
      <div className="text-cyan-300 font-semibold mb-2">Phase 1</div>
      <h3 className="font-bold mb-3">MVP Launch</h3>
      <p className="text-sm text-slate-300">
        Landing page, calculator, community onboarding and validation of
        demand within the Pond0x ecosystem.
      </p>
    </div>

    <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
      <div className="text-cyan-300 font-semibold mb-2">Phase 2</div>
      <h3 className="font-bold mb-3">Recurring Liquidity</h3>
      <p className="text-sm text-slate-300">
        Build recurring operations with freelancers, agencies and OTC
        traders needing stablecoin → MXN settlement.
      </p>
    </div>

    <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
      <div className="text-cyan-300 font-semibold mb-2">Phase 3</div>
      <h3 className="font-bold mb-3">MXN Corridor</h3>
      <p className="text-sm text-slate-300">
        Expand the liquidity rail between US crypto markets and Mexican
        banking rails through SPEI.
      </p>
    </div>

    <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
      <div className="text-cyan-300 font-semibold mb-2">Phase 4</div>
      <h3 className="font-bold mb-3">Operator Settlement</h3>
      <p className="text-sm text-slate-300">
        Enable larger OTC settlement flows and operator-assisted
        liquidity for higher volume clients.
      </p>
    </div>

  </div>
</section>
      <section id="contact" className="border-t border-white/10 bg-slate-900/80">
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

      <a
        href="https://t.me/Guillermodiazg"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:scale-105"
      >
        {t.floatingCta}
      </a>
    </main>
  )
}